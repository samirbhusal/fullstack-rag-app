from langchain.chains import RetrievalQA
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_text_splitters import CharacterTextSplitter
from langchain_community.vectorstores import Chroma
import os

CHROMA_PATH = "./chroma_db"

def add_to_knowledge_base(texts_list, api_key):
    if not texts_list:
        return "Error: No readable text found in uploaded files."
    
    # Split into chunks
    text_splitter = CharacterTextSplitter(
            chunk_size=1000,
            chunk_overlap=200
        )
    texts = text_splitter.create_documents(texts_list)

    # Embeddings
    embeddings = OpenAIEmbeddings(
            api_key=api_key,
            model="text-embedding-3-small",
            organization=None
        )
    
    db = Chroma.from_documents(
        documents=texts, 
        embedding=embeddings, 
        persist_directory=CHROMA_PATH
    )
    print(f"Saved {len(texts)} chunks to {CHROMA_PATH}")

def query_knowledge_base(query_text, api_key):
    """
    Loads the saved database from disk and answers the question.
    """
    # 1. Initialize Embeddings (Must match what was used for saving)
    embeddings = OpenAIEmbeddings(
        api_key=api_key,
        model="text-embedding-3-small"
    )

    # 2. Load the existing database
    if not os.path.exists(CHROMA_PATH):
        return "Error: Knowledge Base not found. Please upload documents first."

    db = Chroma(persist_directory=CHROMA_PATH, embedding_function=embeddings)

    # 3. Setup the LLM
    llm = ChatOpenAI(
        api_key=api_key,
        model="gpt-4o-mini",
        temperature=0
    )

    # 4. Create the Chain
    qa = RetrievalQA.from_chain_type(
        llm=llm,
        chain_type="stuff",
        retriever=db.as_retriever(search_kwargs={"k": 3})
    )

    # 5. Ask
    response = qa.invoke(query_text)
    return response["result"]


# def generate_response(uploaded_file, openai_api_key, query_text):
#     documents = []

#     if uploaded_file:
#         # Extract text from each file
#         for file in uploaded_file:
#             text = extract_text_from_file(file)
#             if text.strip():
#                 documents.append(text)

#         if not documents:
#             return "Error: No readable text found in uploaded files."

#         # Split into chunks
#         text_splitter = CharacterTextSplitter(
#             chunk_size=1000,
#             chunk_overlap=200
#         )
#         texts = text_splitter.create_documents(documents)

#         # Embeddings
#         embeddings = OpenAIEmbeddings(
#             api_key=openai_api_key,
#             model="text-embedding-3-small",
#             organization=None
#         )

#         # Vector store
#         db = Chroma.from_documents(texts, embeddings)

#         # Retriever
#         retriever = db.as_retriever(search_kwargs={"k": 3})

#         # LLM
#         llm = ChatOpenAI(
#             api_key=openai_api_key,
#             model="gpt-4o-mini",
#             max_tokens=512,
#             temperature=0
#         )

#         # QA chain
#         qa = RetrievalQA.from_chain_type(
#             llm=llm,
#             chain_type="stuff",
#             retriever=retriever,
#             return_source_documents=False  # prevents huge prompt payloads
#         )

#         return qa.invoke(query_text)

#     return None