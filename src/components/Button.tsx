import React from 'react';
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  children,
  onClick,
  className = ''
}) => {
  const baseStyles = 'px-6 py-3 rounded-full font-poppins font-medium text-base transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variantStyles = {
    primary: 'bg-accent hover:bg-opacity-90 text-textLight focus:ring-accent',
    secondary: 'border-2 border-accent text-accent hover:bg-accent hover:bg-opacity-10 focus:ring-accent'
  };
  return <button onClick={onClick} className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {children}
    </button>;
};