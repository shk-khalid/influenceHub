import Card from '../common/Card';
import RatingStars from '../common/RatingStar';
import { Target, Star, Megaphone, Globe2 } from 'lucide-react';

interface InfluencerStatsProps {
  rating: number;
}

export default function InfluencerStats({ rating }: InfluencerStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
      {/* Followers Card */}
      <Card className="relative overflow-hidden group p-4 sm:p-6">
        <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-purple-100 dark:bg-purple-500 rounded-full -mr-10 sm:-mr-16 -mt-10 sm:-mt-16 transition-transform group-hover:scale-110" />
        <div className="relative">
          <Target className="w-6 sm:w-8 h-6 sm:h-8 text-purple-600 dark:text-purple-300 mb-3 sm:mb-4" />
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100">Followers</h3>
          <p className="text-2xl sm:text-3xl font-bold text-purple-600 dark:text-purple-300 mt-1 sm:mt-2">125K</p>
        </div>
      </Card>

      {/* Rating Card */}
      <Card className="relative overflow-hidden group p-4 sm:p-6">
        <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-pink-100 dark:bg-pink-500 rounded-full -mr-10 sm:-mr-16 -mt-10 sm:-mt-16 transition-transform group-hover:scale-110" />
        <div className="relative">
          <Star className="w-6 sm:w-8 h-6 sm:h-8 text-pink-600 dark:text-pink-300 mb-3 sm:mb-4" />
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100">Rating</h3>
          <div className="flex items-center mt-1 sm:mt-2">
            <RatingStars rating={rating} />
            <span className="ml-2 text-lg sm:text-xl font-bold text-pink-600 dark:text-pink-300">{rating}</span>
          </div>
        </div>
      </Card>

      {/* Campaigns Card */}
      <Card className="relative overflow-hidden group p-4 sm:p-6">
        <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-blue-100 dark:bg-blue-500 rounded-full -mr-10 sm:-mr-16 -mt-10 sm:-mt-16 transition-transform group-hover:scale-110" />
        <div className="relative">
          <Megaphone className="w-6 sm:w-8 h-6 sm:h-8 text-blue-600 dark:text-blue-300 mb-3 sm:mb-4" />
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100">Campaigns</h3>
          <p className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-300 mt-1 sm:mt-2">48</p>
        </div>
      </Card>

      {/* Countries Card */}
      <Card className="relative overflow-hidden group p-4 sm:p-6">
        <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-green-100 dark:bg-green-500 rounded-full -mr-10 sm:-mr-16 -mt-10 sm:-mt-16 transition-transform group-hover:scale-110" />
        <div className="relative">
          <Globe2 className="w-6 sm:w-8 h-6 sm:h-8 text-green-600 dark:text-green-300 mb-3 sm:mb-4" />
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100">Countries</h3>
          <p className="text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-300 mt-1 sm:mt-2">45</p>
        </div>
      </Card>
    </div>
  );
}
