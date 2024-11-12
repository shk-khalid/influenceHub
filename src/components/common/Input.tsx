import React from 'react';
import { type LucideIcon } from 'lucide-react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: LucideIcon;
}

export function Input({ label, icon: Icon, className = '', ...props }: InputProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative">
        {Icon && (
          <Icon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
        )}
        <input
          className={`w-full ${
            Icon ? 'pl-10' : 'pl-4'
          } pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent ${className}`}
          {...props}
        />
      </div>
    </div>
  );
}