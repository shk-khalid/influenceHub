import { cn } from '../../lib/Utils';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  title: string;
  value?: string | number;
  description?: string;
  iconColor?: string;
  valueColor?: string;
  className?: string;
}

export function StatCard({
  icon: Icon,
  title,
  value,
  description,
  iconColor = 'text-blue-500 dark:text-blue-400',
  valueColor = 'text-blue-600 dark:text-blue-400',
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        'card rounded-xl shadow-md p-6 flex flex-col items-center text-center transition-transform duration-200 hover:scale-105 hover:shadow-lg',
        'bg-gradient-to-bl',
        'from-gray-200 via-gray-300 to-white dark:from-gray-800 dark:via-gray-900 dark:to-black',
        className
      )}
    >
      <div
        className={cn(
          'p-4 rounded-full mb-4 flex items-center justify-center',
          iconColor.includes('blue') && 'bg-blue-100 dark:bg-blue-900/20',
          iconColor.includes('green') && 'bg-green-100 dark:bg-green-900/20',
          iconColor.includes('purple') && 'bg-purple-100 dark:bg-purple-900/20'
        )}
      >
        <Icon className={cn('w-8 h-8', iconColor)} aria-hidden="true" />
      </div>
      <h3 className="text-base font-medium text-gray-700 dark:text-gray-200 mb-1">
        {title}
      </h3>
      <p className={cn('text-4xl font-bold', valueColor)}>{value}</p>
      {description && (
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          {description}
        </p>
      )}
    </div>
  );
}
