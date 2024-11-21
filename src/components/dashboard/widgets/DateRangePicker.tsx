import { Calendar } from 'lucide-react';

interface DateRangePickerProps {
  onTimeframeChange: (days: number) => void;
}

const presets = [
  { label: '7D', days: 7 },
  { label: '30D', days: 30 },
  { label: '90D', days: 90 },
  { label: 'YTD', days: 365 },
];

export default function DateRangePicker({ onTimeframeChange }: DateRangePickerProps) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Calendar className="w-5 h-5 text-gray-600 dark:text-gray-300" />
      <div className="flex flex-wrap gap-2">
        {presets.map((preset) => (
          <button
            key={preset.label}
            onClick={() => onTimeframeChange(preset.days)}
            className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 
                     dark:text-gray-300 rounded-lg text-sm font-medium"
          >
            {preset.label}
          </button>
        ))}
      </div>
    </div>
  );
}