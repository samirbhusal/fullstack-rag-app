import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Button";
import { ServerIcon, DatabaseIcon, NetworkIcon } from "lucide-react";
export const Home: React.FC = () => {
  const navigate = useNavigate();
  const handleStart = () => {
    navigate("/incident-input");
  };

  const toLoginPage = () => {
    navigate("/login");
  };
  return (
    <div className="min-h-screen w-full bg-primary flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-8 right-8">
        <Button
          onClick={toLoginPage}
          variant="secondary"
          className="text-lg px-10 py-4"
        >
          Login
        </Button>
      </div>

      <div className="absolute top-10 left-10 opacity-10">
        <ServerIcon className="h-32 w-32 text-textLight" />
      </div>

      <div className="absolute bottom-10 right-10 opacity-10">
        <DatabaseIcon className="h-24 w-24 text-textLight" />
      </div>
      <div className="absolute top-1/3 right-1/4 opacity-10">
        <NetworkIcon className="h-20 w-20 text-textLight" />
      </div>
      {/* Main content */}
      <div className="text-center z-10 max-w-3xl">
        <h1 className="text-5xl md:text-6xl font-poppins font-bold text-textLight mb-2">
          RAG Incident Assistant
        </h1>
        <p className="text-lg text-textLight/40 mb-6">
          Your AI-powered copilot for IT incident resolution
        </p>
        <p className="text-xl text-textLight/90 mb-12 max-w-2xl mx-auto">
          Resolve incidents faster with retrieval intelligence
        </p>
        <Button onClick={handleStart} className="text-lg px-10 py-4">
          Launch Assistant
        </Button>
      </div>
      {/* Bottom info */}
      <div className="absolute bottom-8 text-textLight/70 text-sm">
        Powered by Retrieval-Augmented Generation Technology
      </div>
    </div>
  );
};
