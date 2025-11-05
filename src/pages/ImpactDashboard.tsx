import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { MetricTile } from '../components/MetricTile';
import { Card } from '../components/Card';
import { ClockIcon, DollarSignIcon, BrainIcon, UsersIcon, HomeIcon } from 'lucide-react';
export const ImpactDashboard: React.FC = () => {
  const navigate = useNavigate();
  return <div className="min-h-screen w-full bg-secondary py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-poppins font-semibold text-textDark">
            RAG Impact Dashboard
          </h1>
          <Button variant="secondary" onClick={() => navigate('/')} className="flex items-center gap-2">
            <HomeIcon className="h-4 w-4" />
            <span>Back to Home</span>
          </Button>
        </div>
        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <MetricTile title="MTTR Reduction" value="42%" description="Mean time to resolution" icon={ClockIcon} color="bg-accent" />
          <MetricTile title="Cost Savings" value="$328K" description="Annual projected savings" icon={DollarSignIcon} color="bg-green-500" />
          <MetricTile title="Knowledge Reuse" value="87%" description="Solutions from existing docs" icon={BrainIcon} color="bg-purple-500" />
          <MetricTile title="User Satisfaction" value="4.8/5" description="From IT support surveys" icon={UsersIcon} color="bg-blue-500" />
        </div>
        {/* Chart */}
        <Card className="mb-8">
          <h2 className="text-xl font-poppins font-medium mb-6">
            Performance Comparison
          </h2>
          <div className="h-80">
            <div className="h-full flex items-end justify-around">
              <div className="flex flex-col items-center">
                <div className="w-32 bg-gray-400 rounded-t" style={{
                height: '120px'
              }}></div>
                <div className="mt-2 text-center">
                  <p className="font-medium">Before RAG</p>
                  <p className="text-sm text-gray-500">67 min avg</p>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-32 bg-accent rounded-t" style={{
                height: '210px'
              }}></div>
                <div className="mt-2 text-center">
                  <p className="font-medium">With RAG</p>
                  <p className="text-sm text-gray-500">39 min avg</p>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-32 bg-gray-400 rounded-t" style={{
                height: '90px'
              }}></div>
                <div className="mt-2 text-center">
                  <p className="font-medium">Before RAG</p>
                  <p className="text-sm text-gray-500">82% accuracy</p>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-32 bg-accent rounded-t" style={{
                height: '180px'
              }}></div>
                <div className="mt-2 text-center">
                  <p className="font-medium">With RAG</p>
                  <p className="text-sm text-gray-500">95% accuracy</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
        {/* Summary */}
        <Card>
          <h2 className="text-xl font-poppins font-medium mb-4">
            Impact Summary
          </h2>
          <p className="text-gray-700 mb-4">
            The RAG Incident Assistant has significantly improved IT support
            efficiency by reducing the time to resolve common incidents by 42%.
            By leveraging existing organizational knowledge, the system provides
            accurate solutions that are fully traceable to internal
            documentation.
          </p>
          <p className="text-gray-700">
            The projected annual savings of $328K comes from reduced downtime,
            more efficient resource allocation, and improved first-contact
            resolution rates. User satisfaction scores have increased from 3.6
            to 4.8 since implementation.
          </p>
        </Card>
      </div>
    </div>;
};