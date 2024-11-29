import React from 'react';
import { PieChart, Pie, ResponsiveContainer, Cell, Tooltip } from 'recharts';

interface DonutChartProps {
  data: { label: string; value: number }[];
  colors?: string[];
}

export const DonutChart: React.FC<DonutChartProps> = ({
  data,
  colors = ['#10B981', '#3B82F6', '#6366F1', '#8B5CF6', '#EC4899'],
}) => {
  const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          innerRadius={60}
          outerRadius={80}
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF', // Gray-800 for dark, White for light
            color: isDarkMode ? '#D1D5DB' : '#374151', // Gray-300 for dark, Gray-700 for light
            border: 'none',
            borderRadius: '0.375rem',
            boxShadow: isDarkMode
              ? '0 2px 4px rgba(0, 0, 0, 0.2)'
              : '0 2px 4px rgba(0, 0, 0, 0.1)',
          }}
          labelStyle={{
            color: isDarkMode ? '#D1D5DB' : '#374151',
          }}
          itemStyle={{
            color: isDarkMode ? '#D1D5DB' : '#374151',
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};
