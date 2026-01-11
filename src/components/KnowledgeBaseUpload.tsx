import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UploadCloud, ArrowLeft, FileText, CheckCircle } from "lucide-react";
import { Button } from "../components/Button";

export const KnowledgeBaseUpload: React.FC = () => {
  const navigate = useNavigate();
  const [uploading, setUploading] = useState<Boolean>(false);
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const handleUpload = async () => {
    if (files.length === 0) return;
    setUploading(true);

    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    try {
      const response = await fetch("http://127.0.0.1:8000/upload-docs", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Knowledge Base Updated Successfully!");
        setFiles([]); // Clear list
      } else {
        alert("Upload failed.");
      }
    } catch (error) {
      console.error(error);
      alert("Error connecting to backend.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-secondary p-8 flex flex-col items-center">
      <div className="w-full max-w-3xl">
        <Button
          variant="outline"
          onClick={() => navigate("/")}
          className="mb-6 flex items-center gap-2"
        >
          <ArrowLeft size={16} /> Back to Dashboard
        </Button>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-poppins font-semibold text-textDark mb-2">
            Knowledge Base Management
          </h1>
          <p className="text-gray-600 mb-8">
            Upload technical manuals, policy PDFs, or incident logs here. The
            RAG chatbot will ingest these to answer future queries.
          </p>

          {/* Upload Zone */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors">
            <input
              type="file"
              id="kb-upload"
              multiple
              onChange={handleFileChange}
              className="hidden"
              accept=".pdf,.txt,.docx,.json"
            />
            <label
              htmlFor="kb-upload"
              className="cursor-pointer flex flex-col items-center"
            >
              <UploadCloud className="h-16 w-16 text-accent mb-4" />
              <span className="text-xl font-medium text-gray-700">
                Click to upload documents
              </span>
              <span className="text-sm text-gray-500 mt-2">
                Supports PDF, DOCX, TXT, JSON
              </span>
            </label>
          </div>

          {/* File List */}
          {files.length > 0 && (
            <div className="mt-8 space-y-3">
              <h3 className="font-semibold text-gray-700">Selected Files:</h3>
              {files.map((f, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded shadow-sm"
                >
                  <FileText size={20} className="text-accent" />
                  <span className="flex-1 text-sm">{f.name}</span>
                  <CheckCircle size={16} className="text-green-500" />
                </div>
              ))}

              <Button
                onClick={handleUpload}
                className="w-full mt-4"
                disabled={uploading}
              >
                {uploading
                  ? "Ingesting Documents..."
                  : "Confirm Upload to Knowledge Base"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
