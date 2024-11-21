import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { EngagementMetric } from '../../types';

interface EngagementChartProps {
  data: EngagementMetric[];
}

export default function EngagementChart({ data }: EngagementChartProps) {
  return (
    <div className="chart-container">
      <h3 className="text-lg font-semibold mb-6 gradient-text">Engagement Over Time</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorLikes" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorComments" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorShares" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#ec4899" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="date" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip 
              contentStyle={{ 
                borderRadius: '8px', 
                border: 'none',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' 
              }} 
            />
            <Legend />
            <Area
              type="monotone"
              dataKey="likes"
              stroke="#6366f1"
              fillOpacity={1}
              fill="url(#colorLikes)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="comments"
              stroke="#8b5cf6"
              fillOpacity={1}
              fill="url(#colorComments)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="shares"
              stroke="#ec4899"
              fillOpacity={1}
              fill="url(#colorShares)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}