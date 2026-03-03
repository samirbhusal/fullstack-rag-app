import React from 'react';
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  onClick,
  className = '',
  disabled = false,
  type = 'button'
}) => {
  const baseStyles = 'px-6 py-3 rounded-full font-poppins font-medium text-base transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  const variantStyles = {
    primary: 'bg-accent hover:bg-opacity-90 text-textLight focus:ring-accent',
    secondary: 'border-2 border-accent text-accent hover:bg-accent hover:bg-opacity-10 focus:ring-accent',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-gray-300'
  };
  return <button type={type} onClick={onClick} disabled={disabled} className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {children}
    </button>;
};