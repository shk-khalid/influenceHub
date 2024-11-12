import { Instagram, Twitter, Youtube, Globe, Plus } from 'lucide-react';
import { Button } from '../common/Button';

interface SocialLink {
  platform: string;
  url: string;
  followers?: number;
  verified: boolean;
}

interface SocialLinksProps {
  links: SocialLink[];
  onAdd: () => void;
}

const PLATFORM_ICONS = {
  instagram: Instagram,
  twitter: Twitter,
  youtube: Youtube,
  website: Globe,
};

export function SocialLinks({ links, onAdd }: SocialLinksProps) {
  return (
    <div className="glass-effect rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Social Media</h2>
        <Button
          variant="secondary"
          icon={Plus}
          onClick={onAdd}
        >
          Add Link
        </Button>
      </div>

      <div className="space-y-4">
        {links.map((link) => {
          const Icon = PLATFORM_ICONS[link.platform as keyof typeof PLATFORM_ICONS] || Globe;
          
          return (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 rounded-lg hover:bg-white/50 dark:hover:bg-gray-800/50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <Icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {link.platform.charAt(0).toUpperCase() + link.platform.slice(1)}
                  </p>
                  {link.followers && (
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {link.followers.toLocaleString()} followers
                    </p>
                  )}
                </div>
              </div>
              {link.verified && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400">
                  Verified
                </span>
              )}
            </a>
          );
        })}
      </div>
    </div>
  );
}