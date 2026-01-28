import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
// import {ProgressBar} from '../components/ProgressBar';
import { SearchIcon } from "lucide-react";
import CommonErrorMessage from "../components/CommonErrorMessage";

export const IncidentInput: React.FC = () => {
  const navigate = useNavigate();
  const [incident, setIncident] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<boolean>(false);
  // const [progress, setProgress] = useState(0);
  const handleAnalyze = async () => {
    // Simulate progress
    // const interval = setInterval(() => {
    //   setProgress(prev => {
    //     if (prev >= 100) {
    //       clearInterval(interval);
    //       navigate('/retrieval-results');
    //       return 100;
    //     }
    //     return prev + 10;
    //   });
    // }, 300);
    if (!incident.trim() || incident.length <= 5) {
      setError(true);
      return;
    }
    setIsAnalyzing(true);
    const response = await fetch("http://127.0.0.1:8000/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ incident }),
    });

    const data = await response.json();
    console.log("LLM Response:", data.response);
    navigate("/retrieval-results", { state: { llmResponse: data.response } });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setIncident(e.target.value);
    if (error) setError(false);
  };
  return (
    <div className="min-h-screen w-full bg-secondary flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-poppins font-semibold text-textDark mb-6">
          Describe the Incident
        </h1>
        <div className="mb-8">
          <label
            htmlFor="incident"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Incident Description
          </label>
          <div className="relative">
            <textarea
              id="incident"
              value={incident}
              onChange={handleInputChange}
              className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:ring-accent focus:border-accent font-inter"
              placeholder="Example: VPN login failure after MFA update"
            />
            <SearchIcon className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
          </div>

          <CommonErrorMessage
            error={error}
            message="Please enter a valid incident description."
          />
        </div>

        {isAnalyzing ? (
          <div className="space-y-6">
            {/*<ProgressBar progress={progress} label="Retrieving relevant documents" animated/>*/}
            <p className="text-center text-gray-600">
              Searching knowledge base for similar incidents...
            </p>
          </div>
        ) : (
          <div className="flex justify-center">
            <Button onClick={handleAnalyze} className="w-full max-w-sm">
              Run Analysis
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
