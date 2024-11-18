import { Instagram, Twitter, Youtube, LucideIcon } from 'lucide-react';

interface SocialLinkInputProps {
  platform: string;
  url: string;
  onChange: (url: string) => void;
  isValid: boolean;
  isEditing: boolean;
}

const icons: Record<string, LucideIcon> = {
  instagram: Instagram,
  twitter: Twitter,
  youtube: Youtube,
};

const colors: Record<string, string> = {
  instagram: 'text-pink-500 group-hover:text-pink-600',
  twitter: 'text-blue-400 group-hover:text-blue-500',
  youtube: 'text-red-500 group-hover:text-red-600',
};

export default function SocialLinkInput({ platform, url, onChange, isValid }: SocialLinkInputProps) {
  const Icon = icons[platform];
  const colorClass = colors[platform];

  return (
    <div className="group relative">
      <div className="flex items-center space-x-4">
        <div
          className="w-10 h-10 p-3 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center
            transition-transform duration-200 group-hover:scale-110"
        >
          <Icon className={`w-5 h-5 transition-colors duration-200 ${colorClass}`} />
        </div>
        <input
          type="url"
          value={url}
          onChange={(e) => onChange(e.target.value)}
          className={`flex-1 rounded-lg p-3 border-gray-300 dark:border-gray-700 dark:bg-gray-900 text-gray-900 dark:text-gray-100 shadow-sm 
            focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-all duration-200
            ${url && !isValid ? 'border-red-500 dark:border-red-700 focus:border-red-500 focus:ring-red-500' : ''}
            ${url && isValid ? 'border-green-500 dark:border-green-700 focus:border-green-500 focus:ring-green-500' : ''}`}
          placeholder={`Your ${platform.charAt(0).toUpperCase() + platform.slice(1)} URL`}
        />
      </div>
      {url && !isValid && (
        <span className="absolute -bottom-6 left-14 text-red-500 dark:text-red-400 text-sm">
          Please enter a valid URL
        </span>
      )}
    </div>
  );
}
