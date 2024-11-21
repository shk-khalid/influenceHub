import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { DemographicData } from '../../types';

interface DemographicsChartProps {
  data: DemographicData;
  type: keyof DemographicData;
  title: string;
}

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f97316', '#84cc16'];

export default function DemographicsChart({ data, type, title }: DemographicsChartProps) {
  const chartData = data[type];

  return (
    <div className="chart-container">
      <h3 className="text-lg font-semibold mb-6 gradient-text">{title}</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              nameKey="label"
              animationBegin={200}
              animationDuration={1000}
            >
              {chartData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ borderRadius: '8px', border: 'none' }} />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}