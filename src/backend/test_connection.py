import os
import time
from pathlib import Path
from dotenv import load_dotenv
from pinecone import Pinecone
from langchain_huggingface import HuggingFaceEndpointEmbeddings
from langchain_pinecone import PineconeVectorStore
from langchain.docstore.document import Document

# --- 1. SETUP ENV (No config.py needed) ---
# Look for .env in current folder OR parent folder
env_path = Path(__file__).parent / ".env"
load_dotenv(env_path)

PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")
HUGGINGFACE_API_KEY = os.getenv("HUGGINGFACE_API_KEY")
INDEX_NAME = "rag-chatbot"

print("\n--- 🚀 STARTING STANDALONE DIAGNOSTIC ---")
print(f"📂 Loading .env from: {env_path}")

if not PINECONE_API_KEY:
    print("❌ ERROR: PINECONE_API_KEY is missing from .env")
    exit()
if not HUGGINGFACE_API_KEY:
    print("❌ ERROR: HUGGINGFACE_API_KEY is missing from .env")
    exit()

# --- 2. TEST PINECONE ---
print(f"\n1️⃣  Checking Pinecone Index: {INDEX_NAME}...")
try:
    pc = Pinecone(api_key=PINECONE_API_KEY)
    index = pc.Index(INDEX_NAME)
    stats = index.describe_index_stats()
    print(f"   ✅ Connected! Current Vector Count: {stats['total_vector_count']}")
except Exception as e:
    print(f"   ❌ PINECONE FAILURE: {e}")
    exit()

# --- 3. TEST EMBEDDINGS ---
print("\n2️⃣  Testing Hugging Face Embeddings...")
try:
    embeddings = HuggingFaceEndpointEmbeddings(
        model="sentence-transformers/all-MiniLM-L6-v2",
        huggingfacehub_api_token=HUGGINGFACE_API_KEY
    )
    # Test embedding a single word
    print("   ...generating test vector...")
    test_vector = embeddings.embed_query("test")
    print("   ✅ Embeddings API is working!")
except Exception as e:
    print(f"   ❌ EMBEDDING FAILURE: {e}")
    print("   👉 CAUSE: Your HuggingFace API Key is invalid or the model is loading.")
    exit()

# --- 4. ATTEMPT UPLOAD ---
print("\n3️⃣  Attempting to upload a test document...")
try:
    doc = Document(page_content="Debug test content.", metadata={"source": "debug_script"})
    
    PineconeVectorStore.from_documents(
        documents=[doc], 
        embedding=embeddings, 
        index_name=INDEX_NAME 
    )
    print("   ✅ Upload function finished without crashing.")
except Exception as e:
    print(f"   ❌ UPLOAD CRASHED: {e}")
    import traceback
    traceback.print_exc()
    exit()

# --- 5. VERIFY ---
print("\n4️⃣  Waiting for Pinecone to update...")
for i in range(10):
    time.sleep(2)
    stats = index.describe_index_stats()
    count = stats['total_vector_count']
    print(f"   Check {i+1}: Count = {count}")
    if count > 0:
        print("\n✅ SUCCESS! The pipeline is fixed.")
        break
else:
    print("\n⚠️ WARNING: Upload finished, but count is still 0.")

print("--- DIAGNOSTIC COMPLETE ---")