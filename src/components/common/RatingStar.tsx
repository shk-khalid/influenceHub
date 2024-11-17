import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  max?: number;
}

export default function RatingStars({ rating, max = 5 }: RatingStarsProps) {
  return (
    <div className="flex">
      {[...Array(max)].map((_, i) => {
        const filled = i < Math.floor(rating);
        const half = i === Math.floor(rating) && rating % 1 !== 0;
        
        return (
          <Star
            key={i}
            className={`w-5 h-5 ${
              filled
                ? 'text-yellow-400 fill-current'
                : half
                ? 'text-yellow-400 fill-current opacity-50'
                : 'text-gray-300'
            }`}
          />
        );
      })}
    </div>
  );
}