import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, icon, className = '', ...props },
  ref
) {
  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="auth-icon-wrapper absolute left-3 top-1/2 -translate-y-1/2">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          className={`w-full ${
            icon ? 'pl-10' : 'pl-4'
          } pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent ${
            error ? 'border-red-300' : 'border-gray-300'
          } ${className}`}
          {...props}
        />
      </div>
      {error && (
        <p className="text-sm text-red-600 mt-1 animate-fadeIn">{error}</p>
      )}
    </div>
  );
});
