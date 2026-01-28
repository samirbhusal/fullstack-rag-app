import React from "react";

interface CommonErrorMessageProps {
  message?: string | "Invalid input";
  error: boolean;
}

const CommonErrorMessage: React.FC<CommonErrorMessageProps> = ({
  message,
  error,
}) => {
  if (!error) return null;

  return (
    <p className="text-red-600 mt-3">
      <strong className="font-bold">Error: </strong>
      <span className="block sm:inline">{message}</span>
    </p>
  );
};

export default CommonErrorMessage;
