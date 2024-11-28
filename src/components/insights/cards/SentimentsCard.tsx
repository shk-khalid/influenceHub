import React from 'react';
import { Heart, MessageCircle, ThumbsDown, Hash, Sparkles } from 'lucide-react';
import { Brand } from '../../types';

interface SentimentCardProps {
  brand: Brand;
}

export const SentimentCard: React.FC<SentimentCardProps> = ({ brand }) => {
  return (
    <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-lg rounded-xl shadow-lg p-6 
                    border border-gray-200/50 dark:border-gray-700/50">
      <div className="flex items-center gap-2 mb-6">
        <Heart className="w-6 h-6 text-red-600 dark:text-red-400" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Brand Sentiment</h2>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-green-600 dark:text-green-400" />
              <span className="text-green-600 dark:text-green-400">Positive</span>
            </div>
            <span className="font-semibold text-green-600 dark:text-green-400">{brand.sentiment.positive}%</span>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <span className="text-gray-600 dark:text-gray-400">Neutral</span>
            </div>
            <span className="font-semibold text-gray-600 dark:text-gray-400">{brand.sentiment.neutral}%</span>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/30 rounded-lg">
            <div className="flex items-center gap-2">
              <ThumbsDown className="w-5 h-5 text-red-600 dark:text-red-400" />
              <span className="text-red-600 dark:text-red-400">Negative</span>
            </div>
            <span className="font-semibold text-red-600 dark:text-red-400">{brand.sentiment.negative}%</span>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <p className="text-gray-600 dark:text-gray-400">Key Mentions</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {brand.sentiment.keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="px-3 py-1 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 
                           rounded-full text-sm"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-3">
              <Hash className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <p className="text-gray-600 dark:text-gray-400">Trending Topics</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {brand.sentiment.trends.map((trend) => (
                <span
                  key={trend}
                  className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 
                           rounded-full text-sm"
                >
                  {trend}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};