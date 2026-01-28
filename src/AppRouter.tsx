import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { IncidentInput } from "./pages/IncidentInput";
import { RetrievalResults } from "./pages/RetrievalResults";
import { AiSummary } from "./pages/AiSummary";
import { ImpactDashboard } from "./pages/ImpactDashboard";
import { KnowledgeBaseUpload } from "./components/KnowledgeBaseUpload";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import Login from "./pages/Login";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/incident-input" element={<IncidentInput />} />
        <Route path="/retrieval-results" element={<RetrievalResults />} />
        <Route path="/ai-summary" element={<AiSummary />} />
        <Route path="/impact-dashboard" element={<ImpactDashboard />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/upload-docs" element={<KnowledgeBaseUpload />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
