import { TrendingBrands } from './TrendingBrands';
import { ActivityFeed } from './ActivityFeed';

export const SidePanel = () => {
  return (
    <div className="space-y-6">
      <TrendingBrands />
      <ActivityFeed />
    </div>
  );
};