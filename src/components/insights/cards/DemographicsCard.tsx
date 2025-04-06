import React from 'react';
import { Users } from 'lucide-react';
import { BrandDetail } from '../../types/brand';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface DemographicsCardProps {
  brand: BrandDetail;
}

export const DemographicsCard: React.FC<DemographicsCardProps> = ({ brand }) => {
  if (!brand.gender_demographics) {
    return null;
  }

  const malePct = brand.gender_demographics.male_percentage ?? '0';
  const femalePct = brand.gender_demographics.female_percentage ?? '0';

  const data = [
    { name: 'Male', value: parseFloat(malePct) },
    { name: 'Female', value: parseFloat(femalePct) },
  ];


  const COLORS = ['#3B82F6', '#EC4899'];

  return (
    <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur-lg rounded-xl shadow-lg p-6 
                    border border-gray-200/50 dark:border-gray-700/50">
      <div className="flex items-center gap-2 mb-6">
        <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Gender Demographics</h2>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number | string) => {
                // coerce to number
                const num = typeof value === 'number' ? value : parseFloat(value);
                return `${num.toFixed(1)}%`;
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};