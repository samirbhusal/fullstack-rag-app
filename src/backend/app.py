import os
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from dotenv import load_dotenv

app = FastAPI()

load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")

# Allow frontend requests (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or your React URL: ["http://localhost:5173"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"status": "Backend is running"}


@app.post("/analyze")
async def analyze_incident(request: Request):
    data = await request.json()
    incident = data.get("incident", "")

    llm = ChatOpenAI(api_key=api_key, model="gpt-4o-mini")

    prompt = ChatPromptTemplate.from_messages([
        ("system", "You are a world-class RAG chatbot developer for customer support."),
        ("human", incident)
    ])

    output_parser = StrOutputParser()
    chain = prompt | llm | output_parser

    response = chain.invoke({"input": incident})
    return {"response": response}
