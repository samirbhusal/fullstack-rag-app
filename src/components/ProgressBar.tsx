import React from 'react';
interface ProgressBarProps {
  progress: number;
  label?: string;
  animated?: boolean;
}
export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  label,
  animated = false
}) => {
  return <div className="w-full">
      {label && <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-textDark">{label}</span>
          <span className="text-sm font-medium text-textDark">{progress}%</span>
        </div>}
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div className={`h-2.5 rounded-full bg-accent ${animated ? 'animate-pulse' : ''}`} style={{
        width: `${progress}%`
      }}></div>
      </div>
    </div>;
};