import React from 'react';
import {
    LineChart as RechartsLineChart,
    Line,
    Tooltip,
    Legend,
    ResponsiveContainer,
    TooltipProps,
} from 'recharts';

interface EngagementData {
    date: string;
    likes: number;
    comments: number;
}

const engagementData: EngagementData[] = [
    { date: '2024-03-01', likes: 1200, comments: 45 },
    { date: '2024-03-02', likes: 1500, comments: 65 },
    { date: '2024-03-03', likes: 2500, comments: 95 },
    { date: '2024-03-04', likes: 1800, comments: 70 },
    { date: '2024-03-05', likes: 2200, comments: 85 },
    { date: '2024-03-06', likes: 2800, comments: 110 },
    { date: '2024-03-07', likes: 3200, comments: 125 },
    { date: '2024-03-08', likes: 2900, comments: 105 },
    { date: '2024-03-09', likes: 3500, comments: 140 },
    { date: '2024-03-10', likes: 4000, comments: 160 },
];

interface CustomTooltipProps extends TooltipProps<number, string> { }

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        return (
            <div
                style={{
                    backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
                    color: isDarkMode ? '#D1D5DB' : '#374151',
                    border: 'none',
                    borderRadius: '0.375rem',
                    boxShadow: isDarkMode
                        ? '0 2px 4px rgba(0, 0, 0, 0.2)'
                        : '0 2px 4px rgba(0, 0, 0, 0.1)',
                    padding: '1rem',
                }}
            >
                <p style={{ fontSize: '0.875rem', fontWeight: 500 }}>
                    {new Date(label).toLocaleDateString()}
                </p>
                <p style={{ fontSize: '0.875rem', color: '#4f46e5' }}>
                    Likes: {payload[0].value}
                </p>
                <p style={{ fontSize: '0.875rem', color: '#db2777' }}>
                    Comments: {payload[1].value}
                </p>
            </div>
        );
    }
    return null;
};

export const EngagementChart: React.FC = () => {

    return (
        <ResponsiveContainer>
            <RechartsLineChart data={engagementData}>
                <Tooltip content={CustomTooltip} />
                <Line
                    type="monotone"
                    dataKey="likes"
                    stroke="#4f46e5"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 8 }}
                />
                <Line
                    type="monotone"
                    dataKey="comments"
                    stroke="#db2777"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 8 }}
                />
                <Legend
                    verticalAlign="bottom"
                    align="center"
                    wrapperStyle={{ paddingTop: '1rem' }}
                />
            </RechartsLineChart>
        </ResponsiveContainer>
    );
};
