interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-600">Step {current} of {total}</span>
      <div className="w-16 h-1 bg-gray-200 rounded-full">
        <div
          className="h-full bg-indigo-600 rounded-full transition-all duration-300"
          style={{ width: `${(current / total) * 100}%` }}
        />
      </div>
    </div>
  );
}