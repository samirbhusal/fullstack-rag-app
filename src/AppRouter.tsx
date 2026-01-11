import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { IncidentInput } from "./pages/IncidentInput";
import { RetrievalResults } from "./pages/RetrievalResults";
import { AiSummary } from "./pages/AiSummary";
import { ImpactDashboard } from "./pages/ImpactDashboard";
import { KnowledgeBaseUpload } from "./components/KnowledgeBaseUpload";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/incident-input" element={<IncidentInput />} />
        <Route path="/retrieval-results" element={<RetrievalResults />} />
        <Route path="/ai-summary" element={<AiSummary />} />
        <Route path="/impact-dashboard" element={<ImpactDashboard />} />
        <Route path="/upload-docs" element={<KnowledgeBaseUpload />} />
      </Routes>
    </BrowserRouter>
  );
}
