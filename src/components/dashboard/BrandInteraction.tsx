import { useEffect, useState } from 'react';
import { Clock, CheckCircle2, XCircle, AlertCircle, BarChart2 } from 'lucide-react';
import { suggestionService } from '../../services/sugesstionService';
import { motion } from 'framer-motion';
import { format, parseISO } from 'date-fns';

interface SuggestionHistory {
  brand: {
    name: string;
  };
  decision: 'accept' | 'decline';
  suggested_at: string;
}

export const BrandInteractions = () => {
  const [suggestions, setSuggestions] = useState<SuggestionHistory[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        // Call the getSuggestionHistory endpoint
        const data = await suggestionService.getSuggestionHistory();
        setSuggestions(data);
        setError(null);
      } catch (err: any) {
        console.error('Error fetching suggestion history:', err);
        setError('Failed to load suggestions. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[300px]">
        <p className="text-gray-600 dark:text-gray-400">Loading...</p>
      </div>
    );
  }

  // If there is an error or no suggestions, show the integrated empty state
  if (error || suggestions.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center h-40 text-center"
      >
        {error ? (
          <AlertCircle className="w-16 h-16 text-red-500/70 mb-4" />
        ) : (
          <BarChart2 className="w-16 h-16 text-gray-400 dark:text-gray-600 mb-4" />
        )}
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
          {error ? 'Unable to Load Suggestions' : 'No Brand Interactions'}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 max-w-md">
          {error ||
            'There is no interaction data available to display at this time. Check back later for updates.'}
        </p>
      </motion.div>
    );
  }

  return (
    <div className="max-w-xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Interactions List */}
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {suggestions.map((interaction, index) => {
          const isAccept = interaction.decision === 'accept';
          // Use date-fns to parse and format the suggested_at date
          const formattedDate = format(parseISO(interaction.suggested_at), 'MMM dd, yyyy, hh:mm a');

          return (
            <div
              key={interaction.brand.name + index}
              className="px-6 py-5 flex items-center justify-between transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                {interaction.brand.name}
              </h3>
              <div className="flex items-center gap-6">
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Clock className="w-5 h-5 mr-1" />
                  <span>{formattedDate}</span>
                </div>
                <div
                  className={`p-2 rounded-xl transition ${isAccept
                      ? 'bg-green-100 dark:bg-green-900/30'
                      : 'bg-rose-100 dark:bg-rose-900/30'
                    }`}
                >
                  {isAccept ? (
                    <CheckCircle2 className="w-6 h-6 text-green-500 dark:text-green-400" />
                  ) : (
                    <XCircle className="w-6 h-6 text-rose-500 dark:text-rose-400" />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
