import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Modal } from '../components/Modal';
import { InfoIcon, ArrowRightIcon, DatabaseIcon, BrainIcon, CheckCircleIcon } from 'lucide-react';
export const AiSummary: React.FC = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const resolutionSteps = [{
    id: 1,
    step: 'Reset MFA token synchronization',
    detail: 'Navigate to the MFA management console and reset the token synchronization for affected users.',
    source: '[1] MFA Configuration Guide'
  }, {
    id: 2,
    step: 'Update VPN client to latest version',
    detail: 'Ensure all users have updated their VPN client software to version 4.2.1 or higher which includes compatibility fixes for the new MFA system.',
    source: '[1] MFA Configuration Guide'
  }, {
    id: 3,
    step: 'Verify certificate matching between VPN and MFA',
    detail: 'Check that the security certificates on the VPN server match those registered with the MFA provider to prevent authentication failures.',
    source: '[2] Incident #4872'
  }, {
    id: 4,
    step: 'Check time synchronization',
    detail: 'Ensure that the authentication server and client devices have synchronized time settings, as time drift can cause MFA token validation failures.',
    source: '[3] Network Access Troubleshooting'
  }];
  const citations = [{
    id: 1,
    title: 'MFA Configuration Guide',
    relevantText: 'VPN login failures commonly occur after MFA updates due to token synchronization issues. Reset the MFA token and ensure the VPN client is updated to the latest version.'
  }, {
    id: 2,
    title: 'Incident #4872 - VPN Authentication Failure',
    relevantText: 'Multiple users reported VPN connection issues following the MFA system upgrade. Root cause was identified as a certificate mismatch between the VPN server and the MFA provider.'
  }, {
    id: 3,
    title: 'Network Access Troubleshooting',
    relevantText: 'When users cannot authenticate to VPN services after security updates, verify the time synchronization between the authentication server and client devices.'
  }];
  return <div className="min-h-screen w-full bg-secondary py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-poppins font-semibold text-textDark">
            AI Resolution Summary
          </h1>
          <Button variant="secondary" onClick={() => setShowModal(true)} className="flex items-center gap-2">
            <InfoIcon className="h-4 w-4" />
            <span>Explainability</span>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Resolution Steps */}
          <div>
            <h2 className="text-xl font-poppins font-medium mb-4">
              Resolution Steps
            </h2>
            <div className="space-y-4">
              {resolutionSteps.map(step => <Card key={step.id} className="border-l-4 border-accent">
                  <h3 className="text-lg font-poppins font-medium mb-2 flex items-center">
                    <CheckCircleIcon className="h-5 w-5 text-accent mr-2" />
                    {step.step}
                  </h3>
                  <p className="text-gray-700 mb-2">{step.detail}</p>
                  <p className="text-sm text-gray-500">{step.source}</p>
                </Card>)}
            </div>
          </div>
          {/* Citations */}
          <div>
            <h2 className="text-xl font-poppins font-medium mb-4">Citations</h2>
            <div className="space-y-4">
              {citations.map(citation => <Card key={citation.id}>
                  <h3 className="text-lg font-poppins font-medium mb-2">
                    [{citation.id}] {citation.title}
                  </h3>
                  <p className="text-gray-700 italic">
                    "{citation.relevantText}"
                  </p>
                </Card>)}
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-10">
          <Button onClick={() => navigate('/impact-dashboard')} className="px-8 flex items-center gap-2">
            <span>View Impact Dashboard</span>
            <ArrowRightIcon className="h-4 w-4" />
          </Button>
        </div>
        {/* Explainability Modal */}
        <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="How RAG Works">
          <div className="space-y-6">
            <p className="text-gray-700">
              The RAG Incident Assistant uses Retrieval-Augmented Generation to
              provide accurate, traceable solutions:
            </p>
            <div className="flex justify-center py-4">
              <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-primary bg-opacity-10 p-4 rounded-full mb-2">
                    <DatabaseIcon className="h-8 w-8 text-primary" />
                  </div>
                  <p className="font-medium">Knowledge Retrieval</p>
                  <p className="text-sm text-gray-500">
                    Searches documents for relevant information
                  </p>
                </div>
                <ArrowRightIcon className="h-6 w-6 text-gray-400 rotate-90 md:rotate-0" />
                <div className="flex flex-col items-center text-center">
                  <div className="bg-accent bg-opacity-10 p-4 rounded-full mb-2">
                    <BrainIcon className="h-8 w-8 text-accent" />
                  </div>
                  <p className="font-medium">AI Analysis</p>
                  <p className="text-sm text-gray-500">
                    Processes and synthesizes information
                  </p>
                </div>
                <ArrowRightIcon className="h-6 w-6 text-gray-400 rotate-90 md:rotate-0" />
                <div className="flex flex-col items-center text-center">
                  <div className="bg-alert bg-opacity-10 p-4 rounded-full mb-2">
                    <CheckCircleIcon className="h-8 w-8 text-alert" />
                  </div>
                  <p className="font-medium">Solution Generation</p>
                  <p className="text-sm text-gray-500">
                    Creates actionable steps with citations
                  </p>
                </div>
              </div>
            </div>
            <p className="text-gray-700">
              This approach ensures that all recommendations are grounded in
              your organization's existing knowledge, with full traceability to
              source documents.
            </p>
          </div>
        </Modal>
      </div>
    </div>;
};