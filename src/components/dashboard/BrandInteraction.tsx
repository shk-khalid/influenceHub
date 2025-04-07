import { Clock, CheckCircle2, XCircle } from 'lucide-react';

const interactions = [
  {
    brand: 'TechGear Pro',
    type: 'Accepted',
    date: '2024-03-15',
  },
  {
    brand: 'FitLife Apparel',
    type: 'Pending',
    date: '2024-03-14',
  },
  {
    brand: 'GreenEats',
    type: 'Declined',
    date: '2024-03-10',
  },
];

export const BrandInteractions = () => {
  return (
    <div className="max-w-xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      
      {/* Interactions List */}
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {interactions.map((interaction, index) => {
          const isAccept = interaction.type.toLowerCase() === 'accepted';

          return (
            <div
              key={interaction.brand + index}
              className="px-6 py-5 flex items-center justify-between transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                {interaction.brand}
              </h3>
              <div className="flex items-center gap-6">
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Clock className="w-5 h-5 mr-1" />
                  <span>{interaction.date}</span>
                </div>
                <div
                  className={`p-2 rounded-xl transition ${
                    isAccept
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
