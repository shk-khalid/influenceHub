import { Loader2 } from 'lucide-react';
import { Button } from '../common/Button';
import { TrendCard } from './TrendingCard';
import { Trend } from '../types';

interface TrendListProps {
  trends: Trend[];
  hasMore: boolean;
  isLoading: boolean;
  onLoadMore: () => void;
}

export function TrendList({ trends, hasMore, isLoading, onLoadMore }: TrendListProps) {
  if (trends.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600 dark:text-gray-400">No trends found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {trends.map((trend) => (
        <TrendCard key={trend.id} trend={trend} />
      ))}
      
      {hasMore && (
        <div className="text-center pt-4">
          <Button
            onClick={onLoadMore}
            disabled={isLoading}
            variant="secondary"
            className="w-full sm:w-auto"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Loading...
              </>
            ) : (
              'Load More'
            )}
          </Button>
        </div>
      )}
    </div>
  );
}