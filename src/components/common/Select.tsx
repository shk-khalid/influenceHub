import React from 'react';
import { cn } from '../../lib/Utils';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  icon?: React.ReactNode;
  label?: string;
  options?: { value: string; label: string }[];
}

export function Select({ className, icon, label, options = [], id, ...props }: SelectProps) {
  const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={selectId} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={selectId}
          className={cn(
            'px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent border-gray-300',
            icon && 'pl-10',
            className
          )}
          {...props}
        >
          {options.length > 0 ? (
            options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))
          ) : (
            <option value="" disabled>
              No options available
            </option>
          )}
        </select>
        {icon && (
          <span className="absolute left-3 top-3 text-gray-400">
            {icon}
          </span>
        )}
      </div>
    </div>
  );
}
