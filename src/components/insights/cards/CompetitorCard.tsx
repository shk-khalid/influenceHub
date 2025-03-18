import React from 'react';
import { Users, ExternalLink } from 'lucide-react';
import { BrandDetail } from '../../types/brand';
import { useNavigate } from 'react-router-dom';

interface CompetitorsCardProps {
  brand: BrandDetail;
}

export const CompetitorsCard: React.FC<CompetitorsCardProps> = ({ brand }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-lg rounded-xl shadow-lg p-6 
                    border border-gray-200/50 dark:border-gray-700/50 transition-all duration-300
                    hover:shadow-xl">
      <div className="flex items-center gap-2 mb-6">
        <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Main Competitors</h2>
      </div>
      
      <div className="grid grid-cols-1 gap-3">
        {brand.competitors.map((competitor, index) => (
          <button
            key={index}
            onClick={() => navigate(`/insights/${competitor.id}`)}
            className="p-4 rounded-lg bg-purple-50 dark:bg-purple-900/30 
                     transform hover:scale-102 transition-all duration-300
                     hover:bg-purple-100 dark:hover:bg-purple-800/40
                     group flex items-center justify-between"
          >
            <p className="text-purple-600 dark:text-purple-400 font-medium group-hover:text-purple-700 
                       dark:group-hover:text-purple-300">
              {competitor.competitor_name}
            </p>
            <ExternalLink className="w-4 h-4 text-purple-500 dark:text-purple-400 opacity-0 
                                 group-hover:opacity-100 transition-opacity" />
          </button>
        ))}
      </div>
    </div>
  );
};