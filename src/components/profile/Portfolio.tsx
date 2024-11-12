import { Image as ImageIcon, Video, Link as LinkIcon, Plus } from 'lucide-react';
import { Button } from '../common/Button';

interface PortfolioItem {
  id: string;
  type: 'image' | 'video' | 'link';
  thumbnail: string;
  title: string;
  description?: string;
  url?: string;
  stats?: {
    likes?: number;
    views?: number;
    engagement?: number;
  };
}

interface PortfolioProps {
  items: PortfolioItem[];
  onAdd: () => void;
}

export function Portfolio({ items, onAdd }: PortfolioProps) {
  const TypeIcon = {
    image: ImageIcon,
    video: Video,
    link: LinkIcon,
  };

  return (
    <div className="glass-effect rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Portfolio</h2>
        <Button
          variant="secondary"
          icon={Plus}
          onClick={onAdd}
        >
          Add Work
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => {
          const Icon = TypeIcon[item.type];
          
          return (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-lg transition-shadow duration-200"
            >
              <div className="aspect-w-16 aspect-h-9 relative">
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex items-center space-x-2 text-white">
                      <Icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{item.type}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    {item.description}
                  </p>
                )}
                {item.stats && (
                  <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                    {item.stats.likes && (
                      <span>👍 {item.stats.likes.toLocaleString()}</span>
                    )}
                    {item.stats.views && (
                      <span>👁️ {item.stats.views.toLocaleString()}</span>
                    )}
                    {item.stats.engagement && (
                      <span>📈 {item.stats.engagement}% engagement</span>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}