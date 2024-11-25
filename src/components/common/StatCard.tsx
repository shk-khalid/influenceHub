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
  iconColor = 'text-blue-600 dark:text-blue-400',
  valueColor = 'text-blue-600 dark:text-blue-400',
  className,
}: StatCardProps) {
  return (
    <div className={cn(
      'card p-6 flex flex-col items-center text-center group hover:scale-105 transition-transform',
      className
    )}>
      <div className={cn(
        'p-3 rounded-full mb-4',
        iconColor.includes('blue') && 'bg-blue-100 dark:bg-blue-900/50',
        iconColor.includes('purple') && 'bg-purple-100 dark:bg-purple-900/50',
        iconColor.includes('green') && 'bg-green-100 dark:bg-green-900/50'
      )}>
        <Icon className={cn('w-6 h-6', iconColor)} />
      </div>
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className={cn('text-3xl font-bold', valueColor)}>{value}</p>
      {description && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{description}</p>
      )}
    </div>
  );
}