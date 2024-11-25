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
        gradient && 'group hover:bg-gradient-to-br hover:from-blue-50 hover:to-cyan-50 dark:hover:from-blue-900/20 dark:hover:to-cyan-900/20',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}