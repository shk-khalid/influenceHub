import React from 'react';
import { type LucideIcon, Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'social' | 'gradient' | 'outline';
  icon?: LucideIcon | React.FC;
  isLoading?: boolean;
  fullWidth?: boolean;
  children?: React.ReactNode;
}

export function Button({
  variant = 'primary',
  icon: Icon,
  isLoading = false,
  children,
  fullWidth = false,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles =
    'relative flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all duration-200 text-sm focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg focus:ring-indigo-500',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500',
    outline: 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-500',
    gradient: 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 focus:ring-indigo-500 transform hover:scale-105',
    social: 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      disabled={isLoading}
      {...props}
    >
      {isLoading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="w-5 h-5 animate-spin" />
        </span>
      )}
      {!isLoading && Icon && <Icon className="w-5 h-5" />}
      <span className={isLoading ? 'opacity-0' : ''}>
        {children || (Icon && <span className="sr-only">Button</span>)}
      </span>
    </button>
  );
}
