import { cn } from '../../lib/Utils';
import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  gradient?: boolean;
}

export function Card({ children, className, gradient, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'card p-4 sm:p-6',
        gradient && 'bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}