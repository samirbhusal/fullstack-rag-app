import os
import time
from pinecone import Pinecone, ServerlessSpec
from dotenv import load_dotenv
from pathlib import Path
from langchain_classic.chains import RetrievalQA
from langchain_groq import ChatGroq
from langchain_huggingface import HuggingFaceEndpointEmbeddings
from langchain_pinecone import PineconeVectorStore
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_core.prompts import PromptTemplate

load_dotenv()

# Configuration
INDEX_NAME = "rag-chatbot"
EMBEDDING_DIMENSIONS = 384

PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")

def get_pinecone_client():
    return Pinecone(api_key=PINECONE_API_KEY)


if not PINECONE_API_KEY:
    print("❌ ERROR: PINECONE_API_KEY is missing from environment!")
else:
    print("✅ PINECONE_API_KEY found.")

embeddings = HuggingFaceEndpointEmbeddings(
    model="sentence-transformers/all-MiniLM-L6-v2",
    huggingfacehub_api_token=os.getenv("HUGGINGFACE_API_KEY")
)

custom_prompt_template = """
You are a helpful AI assistant. Answer the question based on the context below.

Context:
{context}

Question: 
{question}

Instructions:
1. If the answer is found in the Context above, answer clearly and concisely.
2. If the Context does NOT contain the answer, strictly follow this format:
   - First, say: "⚠️ I couldn't find specific information about this in your uploaded documents."
   - Then, say: "However, based on my general knowledge, here is what I know:"
   - Finally, provide a helpful answer based on your own training.

Answer:
"""

PROMPT = PromptTemplate(
    template=custom_prompt_template, 
    input_variables=["context", "question"]
)

def ensure_index_exists():
    """
    Checks if the Pinecone index exists. If not, creates it.
    Returns True if ready, False if something failed.
    """
    pc = get_pinecone_client()
    existing_indexes = [i.name for i in pc.list_indexes()]
    
    if INDEX_NAME not in existing_indexes:
        print(f"⚠️ Index '{INDEX_NAME}' not found. Creating it now...")
        try:
            pc.create_index(
                name=INDEX_NAME,
                dimension=EMBEDDING_DIMENSIONS,
                metric="cosine",
                spec=ServerlessSpec(cloud="aws", region="us-east-1")
            )
            print("⏳ Waiting for index to initialize...")
            time.sleep(10)
            print("✅ Index created successfully!")
        except Exception as e:
            print(f"❌ Failed to create index: {e}")
            return False
    return True

def add_to_knowledge_base(texts_list, api_key=None):
    if not texts_list:
        print("❌ Error: No text found in the input.")
        return "⚠️ Error: No readable text found."

    try:
        ensure_index_exists()
    except Exception as e:
        print(f"❌ Database Creation Failed: {e}")
        return f"❌ Database Error: {e}"

    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200, separators=["\n\n", "\n", " ", ""])
    docs = text_splitter.create_documents(texts_list)
    print(f"📄 Prepared {len(docs)} chunks for upload.")
    
    # --- DEBUGGING: Print a snippet of the text to ensure it's not empty ---
    print(f"   (Snippet: {docs[0].page_content[:100]}...)") 

    try:
        # 1. Upload to Pinecone
        print("🚀 Sending to Pinecone...")
        PineconeVectorStore.from_documents(
            documents=docs, 
            embedding=embeddings, 
            index_name=INDEX_NAME
        )
        print("✅ Upload command accepted.")
        
        # 2. Verification Loop
        print("⏳ Verification: Waiting for Pinecone to index data...")
        pc = Pinecone(api_key=PINECONE_API_KEY)
        index = pc.Index(INDEX_NAME)
        
        for attempt in range(15):  # Increased wait time slightly
            stats = index.describe_index_stats()
            count = stats['total_vector_count']
            if count > 0:
                print(f"✅ Data verified! Vector count is now: {count}")
                return f"✅ Success: {len(docs)} chunks indexed and ready."
            time.sleep(2)
            
        print("⚠️ Time-out waiting for Pinecone.")
        return "⚠️ Upload processed, but Pinecone is slow to update. Please wait 30s before searching."

    except Exception as e:
        # --- CRITICAL: PRINT THE ERROR TO TERMINAL ---
        print(f"\n❌❌❌ UPLOAD FAILED ❌❌❌")
        print(f"Error Details: {str(e)}")
        import traceback
        traceback.print_exc()
        return f"❌ Upload Error: {str(e)}"

def query_knowledge_base(query_text, api_key=None):

    pc = get_pinecone_client()
    existing_indexes = [i.name for i in pc.list_indexes()]

    if INDEX_NAME not in existing_indexes:
        return "⚠️ Knowledge Base not found. Please upload a document to create it."

    # 2. Now we know it exists, we can safely connect
    index = pc.Index(INDEX_NAME)

    try:
        stats = index.describe_index_stats()
        if stats['total_vector_count'] == 0:
            return "⚠️ The Knowledge Base is empty. Please upload a document to get started."
    except Exception:
            # If we can't even get stats, the index probably doesn't exist yet
            return "⚠️ Knowledge Base not found. Please upload a document first."
    
    try:
        vectorstore = PineconeVectorStore.from_existing_index(
            index_name=INDEX_NAME,
            embedding=embeddings,
            text_key="text"
        )
    except Exception as e:
        return "⚠️ Connection Error: Could not connect to Pinecone."

    llm = ChatGroq(
        model="llama-3.3-70b-versatile",
        temperature=0,
        api_key=os.getenv("GROQ_API_KEY")
    )

    qa = RetrievalQA.from_chain_type(
        llm=llm,
        chain_type="stuff",
        return_source_documents=True,
        retriever=vectorstore.as_retriever(search_kwargs={"k": 3}),
        chain_type_kwargs={"prompt": PROMPT}
    )

    try:
        response = qa.invoke(query_text)
        return response["result"]
    except Exception as e:
        print(f"Query Error: {e}")
        return "⚠️ The Knowledge Base is empty or not found. Please upload a document first."


    