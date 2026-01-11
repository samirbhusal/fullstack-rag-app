import React from "react";
import { BoxIcon } from "lucide-react";
interface MetricTileProps {
  title: string;
  value: string;
  description?: string;
  icon: BoxIcon;
  color?: string;
}
export const MetricTile: React.FC<MetricTileProps> = ({
  title,
  value,
  description,
  icon: Icon,
  color = "bg-accent",
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-poppins font-medium text-gray-700">
            {title}
          </h3>
          <p className="text-3xl font-poppins font-semibold mt-2">{value}</p>
          {description && (
            <p className="text-sm text-gray-500 mt-1">{description}</p>
          )}
        </div>
        <div className={`${color} bg-opacity-20 p-3 rounded-full`}>
          <Icon className={`text-${color.replace("bg-", "")} h-6 w-6`} />
        </div>
      </div>
    </div>
  );
};
