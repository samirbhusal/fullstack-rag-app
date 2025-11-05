import React from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { ConfidenceBar } from '../components/ConfidenceBar';
import { FileTextIcon, FileIcon, BookOpenIcon } from 'lucide-react';
export const RetrievalResults: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const llmResponse = location.state?.llmResponse;
  const documents = [{
    id: 1,
    title: 'MFA Configuration Guide',
    confidence: 92,
    source: 'IT Knowledge Base',
    snippet: 'VPN login failures commonly occur after MFA updates due to token synchronization issues. Reset the MFA token and ensure the VPN client is updated to the latest version.',
    icon: FileTextIcon,
    viewDoc: "View Document →",
    lastUpldateInfo: "Last updated: 2023-11-05"
  }, {
    id: 2,
    title: 'Incident #4872 - VPN Authentication Failure',
    confidence: 87,
    source: 'Past Incidents',
    snippet: 'Multiple users reported VPN connection issues following the MFA system upgrade. Root cause was identified as a certificate mismatch between the VPN server and the MFA provider.',
    icon: BookOpenIcon,
    viewDoc: "View Document →",
    lastUpldateInfo: "Last updated: 2023-10-25"
  }, {
    id: 3,
    title: 'Network Access Troubleshooting',
    confidence: 78,
    source: 'Technical Documentation',
    snippet: 'When users cannot authenticate to VPN services after security updates, verify the time synchronization between the authentication server and client devices.',
    icon: FileIcon,
    viewDoc: "View Document →",
    lastUpldateInfo: "Last updated: 2023-09-30"
  }];
  return <div className="min-h-screen w-full bg-secondary py-12 px-4">
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-poppins font-semibold text-textDark mb-2">
        Retrieved Documents
      </h1>
        {/* 👇 Optional section to show the AI summary */}
        {llmResponse && (
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h2 className="text-2xl font-semibold mb-2 text-accent">
              AI Summary
            </h2>
            <p className="text-gray-700 whitespace-pre-line">{llmResponse}</p>
          </div>
        )}
      <p className="text-gray-600 mb-8">
        Found {documents.length} relevant documents for "VPN login failure
        after MFA update"
      </p>
      <div className="space-y-6 mb-8">
        {documents.map(doc => <Card key={doc.id} className="border-l-4 border-accent">
          <div className="flex">
            <div className="mr-4 mt-1">
              <doc.icon className="h-6 w-6 text-accent" />
            </div>
            <div className="flex-1">
                <h3 className="text-xl font-poppins font-medium mb-2">
                  {doc.title}
                </h3>


              <p className="text-sm text-gray-500 mb-3">
                Source: {doc.source}
              </p>
              <p className="text-gray-700 mb-4">{doc.snippet}</p>
              <ConfidenceBar percentage={doc.confidence} />
               <div className="flex justify-between items-center mt-4">
                <p className='text-gray-500'>{doc.lastUpldateInfo}</p>
                <button className="text-accent hover:font-bold flex items-center">
                <p className="text-sm text-gray-500 mb-3">{doc.viewDoc}</p>
                </button>
              </div>
            </div>
          </div>
        </Card>)}
      </div>
      <div className="flex justify-center">
        <Button onClick={() => navigate('/ai-summary')} className="px-8">
          Generate Resolution Summary
        </Button>
      </div>
    </div>
  </div>;
};