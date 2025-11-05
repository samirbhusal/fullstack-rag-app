import React from 'react';
interface ConfidenceBarProps {
  percentage: number;
}
export const ConfidenceBar: React.FC<ConfidenceBarProps> = ({
  percentage
}) => {
  // Determine color based on percentage
  const getColor = () => {
    if (percentage >= 80) return 'bg-accent';
    if (percentage >= 60) return 'bg-green-500';
    if (percentage >= 40) return 'bg-yellow-500';
    return 'bg-alert';
  };
  return <div className="w-full">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-textDark">Confidence</span>
        <span className="text-sm font-medium text-textDark">{percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div className={`h-2.5 rounded-full ${getColor()}`} style={{
        width: `${percentage}%`
      }}></div>
      </div>
    </div>;
};