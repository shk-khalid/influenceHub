import { motion } from 'framer-motion';
import {
  MapPin,
  Star,
  Building,
  TrendingUp,
  Users,
  BarChart3,
  Heart,
  MessageCircle,
  Eye,
  Instagram,
  Percent,
  Check,
  X
} from 'lucide-react';
import { BrandDetail as Brand } from '../types/brand';
import { Button } from '../common/Button';

interface BrandCardProps {
  brand: Brand;
  onAccept: (brand: Brand) => void;
  onDecline: (brand: Brand) => void;
}

export const BrandCard = ({ brand, onAccept, onDecline }: BrandCardProps) => {
  const stats = brand.social_stats;
  const valuationB = (parseFloat(brand.recent_valuation) / 1_000_000_000).toFixed(2);
  const matchScore = 92;

  const infoItems = [
    { icon: BarChart3, label: 'Market Share', value: `${brand.market_share}%`, color: 'text-blue-500' },
    { icon: TrendingUp, label: 'Growth', value: `${brand.growth_percentage}%`, color: 'text-green-500' },
    { icon: Users, label: 'Followers', value: stats?.followers?.toLocaleString() || '–', color: 'text-purple-500' },
    { icon: Eye, label: 'Reach Ratio', value: stats?.reach_ratio?.toString() || '–', color: 'text-indigo-500' }
  ];

  const engagementItems = [
    { icon: Heart, label: 'Avg. Likes', value: stats?.avg_likes_computed ?? '–' },
    { icon: MessageCircle, label: 'Avg. Comments', value: stats?.avg_comments_computed ?? '–' },
    { icon: Eye, label: 'Engagement Score', value: stats?.engagement_score ? `${stats.engagement_score}%` : '–' }
  ];

  const postStats = stats?.highest_post || {
    caption: 'No recent posts',
    likeCount: '–',
    commentCount: '–',
    viewCount: '–'
  };

  return (
    <motion.div
      className="bg-white dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 rounded-2xl shadow-xl p-6 sm:p-8 max-w-4xl w-full border border-gray-200 dark:border-gray-700/50 backdrop-blur-xl transition-colors"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 mb-6">
        <div className="flex flex-col sm:flex-row items-start gap-6">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-400 dark:bg-blue-500 blur-md opacity-20 dark:opacity-30 rounded-xl" />
            <img
              src={`https://cdn.brandfetch.io/${brand.name.toLowerCase()}.com?c=1idce-XmvJbQiBHXyMA`}
              alt={`${brand.name} logo`}
              className="w-20 h-20 rounded-xl object-cover relative z-10"
            />
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">{brand.name}</h3>
              <div className="flex items-center gap-1 bg-yellow-500/10 px-3 py-1 rounded-full">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-medium text-yellow-500">{brand.overall_rating}</span>
              </div>
              {stats?.is_verified && (
                <div className="bg-blue-500/10 p-1 rounded-full">
                  <Instagram className="w-5 h-5 text-blue-500" />
                </div>
              )}
              <div className="flex items-center gap-1 bg-green-500/10 px-3 py-1 rounded-full">
                <Percent className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium text-green-500">{matchScore}% match</span>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <Building className="w-4 h-4" />
                <span className="capitalize">{brand.sector}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{brand.location}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start sm:items-end justify-center gap-1 text-right">
          <div className="flex items-center gap-1 text-gray-900 dark:text-white font-bold text-xl">
            <Percent className="w-5 h-5 text-gray-400 dark:text-gray-300" />
            {valuationB}B
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Valuation</div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {infoItems.map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="bg-gray-100 dark:bg-white/10 p-4 rounded-xl flex flex-col">
            <div className="flex items-center gap-2 mb-1">
              <Icon className={`w-5 h-5 ${color}`} />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
            </div>
            <div className="mt-auto text-lg font-bold text-gray-900 dark:text-white">{value}</div>
          </div>
        ))}
      </div>

      {/* Engagement + Post */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Engagement */}
        <div className="bg-gray-100 dark:bg-white/10 p-6 rounded-xl">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500" /> Engagement Metrics
          </h4>
          <div className="space-y-4">
            {engagementItems.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <Icon className="w-5 h-5" />
                  <span>{label}</span>
                </div>
                <span className="text-gray-900 dark:text-white font-medium">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Latest Post */}
        <div className="bg-gray-100 dark:bg-white/10 p-6 rounded-xl">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-blue-500" /> Latest Post
          </h4>
          <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2 mb-4">"{postStats.caption}"</p>
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { icon: Heart, label: 'Likes', value: postStats.likeCount },
              { icon: MessageCircle, label: 'Comments', value: postStats.commentCount },
              { icon: Eye, label: 'Views', value: postStats.viewCount }
            ].map(({ icon: Icon, label, value }) => (
              <div key={label}>
                <Icon className="mx-auto w-5 h-5 text-gray-500 dark:text-gray-300 mb-1" />
                <div className="text-lg font-semibold text-gray-900 dark:text-white">{value}</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          variant="outline"
          onClick={() => onDecline(brand)}
          className="flex-1 flex items-center justify-center gap-2 border-teal-500 hover:bg-teal-400 focus:ring-teal-500 dark:border-rose-400 dark:hover:bg-rose-500 dark:focus:ring-rose-400 transition-transform duration-200"
        >
          <X className="w-4 h-4" /> Skip
        </Button>
        <Button
          variant="primary"
          onClick={() => onAccept(brand)}
          className="flex-1 flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-400 dark:bg-rose-500 dark:hover:bg-rose-400 focus:ring-teal-500 dark:focus:ring-rose-400 transition-transform duration-200"
        >
          <Check className="w-4 h-4" /> Connect
        </Button>
      </div>
    </motion.div>
  );
};
