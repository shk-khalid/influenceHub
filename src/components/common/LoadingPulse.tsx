import React from 'react';
import clsx from 'clsx';

interface LoadingPulseProps {
  count?: number;
  sizeClass?: string;
  gapClass?: string;
  duration?: number;
}

export const LoadingPulse: React.FC<LoadingPulseProps> = ({
  count     = 4,
  sizeClass = 'w-4 h-4',
  gapClass  = 'space-x-3',
  duration  = 1500,
}) => {
  return (
    <div className={clsx('flex items-center', gapClass)}>
      {Array.from({ length: count }).map((_, i) => {
        const delay = `${(i * duration) / count}ms`;

        return (
          <div
            key={i}
            className={clsx(
              sizeClass,
              'relative rounded-full',
              'bg-teal-500 dark:bg-rose-500',
              'shadow-glow-lg',
              'animate-pulse-scale'
            )}
            style={{
              animationDuration: `${duration}ms`,
              animationDelay: delay,
            }}
          >
            <span
              className={clsx(
                'absolute inset-0 rounded-full',
                // subtle glass‑style overlay:
                'bg-[var(--glass-bg)]/30',
                // reuse Tailwind’s built‑in ping:
                'animate-ping'
              )}
              style={{
                animationDuration: `${duration}ms`,
                animationDelay: delay,
              }}
            />
          </div>
        );
      })}
    </div>
  );
};
