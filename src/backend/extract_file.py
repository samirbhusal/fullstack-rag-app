import pypdf
import docx


def extract_text_from_file(file):

    filename = getattr(file, "filename", getattr(file, "name", "")).lower()

    try: 
        if filename.endswith(".txt"):
            content = file.file.read() if hasattr(file, "file") else file.read()
            return content.decode("utf-8", errors="ignore")
        
        elif filename.endswith(".json"):
            content = file.file.read() if hasattr(file, "file") else file.read()
            data = json.loads(content)
            # Convert JSON object to a string for the LLM
            return json.dumps(data, indent=2)

        elif filename.endswith(".pdf"):
            pdf_stream = file.file if hasattr(file, "file") else file
            
            reader = pypdf.PdfReader(pdf_stream)
            text = ""
            for page in reader.pages:
                text += page.extract_text() or ""
            return text

        elif filename.endswith(".docx"):
            doc_stream = file.file if hasattr(file, "file") else file
            doc = docx.Document(doc_stream)
            return "\n".join([p.text for p in doc.paragraphs])

    except Exception as e:
        print(f"Error processing {filename}: {str(e)}")
        return ""

    return ""
