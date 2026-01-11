import os
from fastapi import FastAPI, Request, UploadFile, File, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from dotenv import load_dotenv
from extract_file import extract_text_from_file
from rag_logic import query_knowledge_base, add_to_knowledge_base

app = FastAPI()

load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")

# Allow frontend requests (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or React URL: ["http://localhost:5173"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def health_check():
    return {"status": "Backend is running"}

@app.post("/upload-docs")
async def upload_knowledge_base(files: list[UploadFile] = File(...)):
    """
    Endpoint to populate the vector store.
    """

    if not api_key:
        raise HTTPException(status_code=500, detail="OpenAI API Key missing.")
    

    extracted_texts = []
    for file in files:
        # Your extract_text_from_file already handles txt, pdf, docx
        text = extract_text_from_file(file)
        if text.strip():
            extracted_texts.append(text)
    
    if extracted_texts:
        # SAVE to the persistent DB
        add_to_knowledge_base(extracted_texts, api_key)
        return {"message": f"Successfully processed and saved {len(files)} documents."}
    else:
        return {"message": "No readable text found in files."}

@app.post("/analyze")
async def analyze_incident(payload: dict = Body(...)):
    # data = await request.json()
    # incident = data.get("incident", "")

    # llm = ChatOpenAI(api_key=api_key, model="gpt-4o-mini")

    # prompt = ChatPromptTemplate.from_messages([
    #     ("system", "You are a world-class customer support engineer and you only retrieve the information required from the file ."),
    #     ("human", incident)
    # ])

    # output_parser = StrOutputParser()
    # chain = prompt | llm | output_parser

    # response = chain.invoke({"input": incident})
    # return {"response": response}

    incident = payload.get("incident")
    if not incident:
        raise HTTPException(status_code=400, detail="No incident description provided")
    
    answer = query_knowledge_base(incident, api_key)
    return {"response": answer}
