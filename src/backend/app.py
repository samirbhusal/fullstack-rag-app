from fastapi import FastAPI, Request, UploadFile, File, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from extract_file import extract_text_from_file
from rag_logic import query_knowledge_base, add_to_knowledge_base
import os
import traceback # Helps us see the error if it crashes

# Load environment variables (Groq, Pinecone, HuggingFace)
load_dotenv()

app = FastAPI()

# Allow frontend requests (CORS)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"], 
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
    Endpoint to populate the Pinecone vector store.
    """
    extracted_texts = []
    
    try:
        for file in files:
            # Extract text using your existing helper
            text = extract_text_from_file(file)
            if text.strip():
                extracted_texts.append(text)
        
        if extracted_texts:
            # We don't need to pass an API key anymore (it's handled in rag_logic via .env)
            add_to_knowledge_base(extracted_texts)
            return {"message": f"Successfully processed and saved {len(files)} documents."}
        else:
            return {"message": "No readable text found in files."}

    except Exception as e:
        # Print the real error to the terminal so we can debug
        print(f"ERROR in /upload-docs: {e}")
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/analyze")
async def analyze_incident(payload: dict = Body(...)):
    """
    Endpoint to query the RAG system.
    """
    incident = payload.get("incident")
    if not incident:
        raise HTTPException(status_code=400, detail="No incident description provided")
    
    try:
        # We don't need to pass an API key here either
        answer = query_knowledge_base(incident)
        return {"response": answer}

    except Exception as e:
        # Print the real error to the terminal
        print(f"ERROR in /analyze: {e}")
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))