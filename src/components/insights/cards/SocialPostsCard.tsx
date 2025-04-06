import React, { useState, useEffect, useRef } from 'react';
import { Heart, MessageCircle, Eye, Star, ChevronDown, ChevronUp } from 'lucide-react';
import { BrandDetail } from '../../types/brand';

interface SocialPostsCardProps {
  posts: BrandDetail['social_stats']['brand_posts'];
}

export const SocialPostsCard: React.FC<SocialPostsCardProps> = ({ posts }) => {
  const [expandedPost, setExpandedPost] = useState<number | null>(null);

  // We'll store whether each post is truncated in a map:
  const [isTruncatedMap, setIsTruncatedMap] = useState<Record<number, boolean>>({});

  // Refs to each post's <p> element so we can measure them
  // We will store them in a map keyed by post_number
  const paragraphRefs = useRef<Record<number, HTMLParagraphElement | null>>({});

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  // A function that checks if a paragraph is truncated (in "collapsed" mode).
  // If scrollHeight > offsetHeight, it’s truncated.
  const measureTruncation = (postNumber: number) => {
    const paragraphEl = paragraphRefs.current[postNumber];
    if (!paragraphEl) return;

    const isOverflowing = paragraphEl.scrollHeight > paragraphEl.offsetHeight + 1; 
    // The +1 is just a small buffer in case of rounding.
    setIsTruncatedMap((prev) => ({ ...prev, [postNumber]: isOverflowing }));
  };

  // We measure each post’s paragraph after rendering or on window resize
  useEffect(() => {
    // measure on mount/update
    posts.forEach((post: any) => {
      measureTruncation(post.post_number);
    });
    // measure again if window resizes (text wrapping can change)
    const handleResize = () => {
      posts.forEach((post: any) => {
        measureTruncation(post.post_number);
      });
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [posts]);

  return (
    <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-lg rounded-xl shadow-lg p-6 
                    border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300
                    hover:shadow-xl">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Recent Posts</h2>
      
      <div className="space-y-4">
        {posts.slice(0, 5).map((post: any) => {
          const isExpanded = expandedPost === post.post_number;
          const isTruncated = isTruncatedMap[post.post_number];

          const handleToggle = () => {
            // Only toggle if we *actually* truncated in collapsed mode
            if (isTruncated) {
              setExpandedPost(isExpanded ? null : post.post_number);
            }
          };

          return (
            <div 
              key={post.post_number}
              className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 space-y-3
                         transform hover:scale-102 transition-all duration-300
                         hover:bg-gray-100 dark:hover:bg-gray-600/50 cursor-pointer"
              onClick={handleToggle}
            >
              {/* 
                1) line-clamp is only applied if not expanded
                2) ref to measure the paragraph
              */}
              <div className="flex items-center justify-between">
                <p
                  ref={(el) => {
                    paragraphRefs.current[post.post_number] = el;
                  }}
                  className={`text-sm text-gray-600 dark:text-gray-300 transition-all
                    ${!isExpanded ? 'line-clamp-2' : ''}`}
                >
                  {post.post_detail.caption}
                </p>

                {/* Show chevron only if truncated */}
                {isTruncated && (
                  isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-gray-500 flex-shrink-0 ml-2" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-500 flex-shrink-0 ml-2" />
                  )
                )}
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 hover:text-red-600 transition-colors">
                  <Heart className="w-4 h-4 text-red-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {formatNumber(post.post_detail.likeCount)}
                  </span>
                </div>
                
                <div className="flex items-center gap-1 hover:text-green-600 transition-colors">
                  <MessageCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {formatNumber(post.post_detail.commentCount)}
                  </span>
                </div>
                
                {post.post_detail.viewCount > 0 && (
                  <div className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                    <Eye className="w-4 h-4 text-blue-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {formatNumber(post.post_detail.viewCount)}
                    </span>
                  </div>
                )}
                
                {post.post_detail.isCollaborated && (
                  <div className="flex items-center gap-1 hover:text-yellow-600 transition-colors">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-xs text-gray-500 dark:text-gray-400">Collab</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
