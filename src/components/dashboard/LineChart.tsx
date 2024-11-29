import React from 'react';
import {
  Line,
  LineChart as RechartsLineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

interface LineChartProps {
  data: any[];
  dataKey: string;
  xAxisKey?: string;
  color?: string;
  height?: number;
}

export const LineChart: React.FC<LineChartProps> = ({
  data,
  dataKey,
  xAxisKey = 'name',
  color = '#10B981',
  height = 300,
}) => {
  const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsLineChart data={data}>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke={isDarkMode ? '#374151' : '#E5E7EB'} // Gray-700 in dark, Gray-200 in light
        />
        <XAxis
          dataKey={xAxisKey}
          stroke={isDarkMode ? '#9CA3AF' : '#4B5563'} // Gray-400 in dark, Gray-600 in light
          tick={{ fill: isDarkMode ? '#9CA3AF' : '#4B5563' }}
        />
        <YAxis
          stroke={isDarkMode ? '#9CA3AF' : '#4B5563'}
          tick={{ fill: isDarkMode ? '#9CA3AF' : '#4B5563' }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF', // Gray-800 in dark, White in light
            color: isDarkMode ? '#D1D5DB' : '#374151', // Gray-300 in dark, Gray-700 in light
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
        <Line
          type="monotone"
          dataKey={dataKey}
          stroke={color}
          strokeWidth={2}
          dot={false}
        />
      </RechartsLineChart>
    </ResponsiveContainer>
  );
};
