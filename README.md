# RAG-Based Technical Support Chatbot

A full-stack AI application designed to streamline technical support workflows. This project leverages **Retrieval-Augmented Generation (RAG)** to analyze incident reports and provide instant, context-aware solutions based on a custom knowledge base of technical manuals and logs.

## 🚀 Features

- **RAG Architecture:** Retrieves precise context from uploaded documents to ground LLM responses, reducing hallucinations.
- **Knowledge Base Management:** Support for uploading and indexing multiple file formats (`.pdf`, `.docx`, `.txt`, `.json`) into a vector database.
- **Persistent Vector Store:** Uses **ChromaDB** to save embeddings locally, ensuring the knowledge base survives server restarts.
- **Interactive Frontend:** Clean, responsive UI built with **React** and **Tailwind CSS** for managing uploads and querying incidents.
- **Robust Backend:** High-performance REST API built with **FastAPI** to handle file processing and LLM chains.

## 🛠️ Tech Stack

- **Frontend:** React (Vite), TypeScript, Tailwind CSS
- **Backend:** Python, FastAPI
- **AI/ML:** LangChain, OpenAI GPT-4o, OpenAI Embeddings
- **Database:** ChromaDB (Vector Store)
- **Tools:** `pypdf` (PDF processing), `python-docx`

---

## ⚙️ Getting Started

### Prerequisites

- Node.js (v18+)
- Python (v3.9+)
- OpenAI API Key

### 1. Backend Setup

Navigate to the backend directory and set up the environment.

1.  **Navigate to the backend folder:**

    ```bash
    cd src/backend
    ```

2.  **Create and activate a virtual environment:**

    ```bash
    python -m venv .venv
    # Windows:
    .venv\Scripts\activate
    # Mac/Linux:
    source .venv/bin/activate
    ```

3.  **Install dependencies:**

    ```bash
    pip install "fastapi[standard]" pypdf python-docx langchain-openai langchain-community chromadb python-dotenv
    ```

4.  **Configure Environment Variables:**
    Create a `.env` file in `src/backend/` and add your API key:
    ```env
    OPENAI_API_KEY=sk-your-key-here
    ```

### 2. Frontend Setup

Open a new terminal at the root of the project.

1.  **Install dependencies:**
    ```bash
    npm install
    ```

---

## 🏃‍♂️ Running the Application

### Start the Backend Server

You have a few options to start the FastAPI server. Make sure you are in the `src/backend` directory.

**Option 1 (Recommended if venv is active):**

```bash
uvicorn app:app --reload
```

**Option 2 (RDirect path to venv python):**

```bash
./.venv/bin/python -m uvicorn app:app --reload
```

**Option 3 (Specify Path: If running from the project root:):**

```bash
uvicorn src.backend.app:app --reload
```

### Start the Frontend

```bash
npm run dev
```

## 📖 How to Use

1.  **Build the Knowledge Base:**

    - Navigate to the **Knowledge Base** page: /upload-docs
    - Upload your technical documents (PDFs, manuals, logs).
    - The backend will chunk, embed, and store these in ChromaDB.

2.  **Analyze Incidents:**
    - Go to the **Incident Analysis** page: /incident-input
    - Type a description of a technical issue (e.g., _"VPN login failure after MFA update"_).
    - The system will retrieve the most relevant sections from your uploaded docs and generate a solution.

## 📂 Project Structure

```text
fullstack-rag-app/
├── src/
│   ├── backend/
│   │   ├── app.py           # Main FastAPI entry point
│   │   ├── rag_logic.py     # LangChain & ChromaDB logic (Indexing/Retrieval)
│   │   ├── extract_file.py  # File parsing (PDF/DOCX/JSON)
│   │   └── chroma_db/       # Persistent vector storage
│   ├── components/          # Reusable React components
│   └── pages/               # Application views
└── package.json

```
