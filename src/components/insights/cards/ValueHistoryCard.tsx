import React from 'react';
import { DollarSign } from 'lucide-react';
import { BrandDetail } from '../../types/brand';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ValueHistoryCardProps {
  brand: BrandDetail;
}

export const ValueHistoryCard: React.FC<ValueHistoryCardProps> = ({ brand }) => {

  const data = brand.valuation_history.map(item => ({
    year: item.year,
    amount: parseFloat(item.valuation) / 1000000000 // Convert to billions
  }));

  return (
    <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-lg rounded-xl shadow-lg p-6 
                    border border-gray-200/50 dark:border-gray-700/50">
      <div className="flex items-center gap-2 mb-6">
        <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Value History</h2>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 30, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip
              formatter={(value: number) => `$${value}B`}
              labelFormatter={(year) => `Year ${year}`}
            />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#10B981"
              strokeWidth={2}
              dot={{ fill: '#10B981', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};