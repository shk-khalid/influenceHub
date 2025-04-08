import React, { useState, useEffect } from 'react';
import {
    LineChart as RechartsLineChart,
    Line,
    Tooltip,
    Legend,
    ResponsiveContainer,
    TooltipProps,
} from 'recharts';
import { userService } from '../../services/userService';
import { AlertCircle, BarChart2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface PostData {
    post_number: number;
    like_count: number;
    comment_count: number;
}

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
                    Post #{label}
                </p>
                <p style={{ fontSize: '0.875rem', color: '#4f46e5' }}>
                    Likes: {userService.formatMetric(payload[0].value as number)}
                </p>
                <p style={{ fontSize: '0.875rem', color: '#db2777' }}>
                    Comments: {userService.formatMetric(payload[1].value as number)}
                </p>
            </div>
        );
    }
    return null;
};

// Remove the instagram prop from the interface.
export const EngagementChart: React.FC = () => {
    const [posts, setPosts] = useState<PostData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                // Define a default or obtain the Instagram value here if needed.
                const defaultInstagram = 'sampleInstagram';
                const data = await userService.fetchInstaOverview({ instagram: defaultInstagram });
                if (data.posts) {
                    setPosts(data.posts.sort((a: PostData, b: PostData) => a.post_number - b.post_number));
                }
                setError(null);
            } catch (err) {
                setError('Failed to fetch engagement data. Please try again later.');
                console.error('Error fetching posts:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[300px]">
                <p className="text-gray-600 dark:text-gray-400">Loading...</p>
            </div>
        );
    }

    if (error || posts.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center h-[300px] text-center"
            >
                {error ? (
                    <AlertCircle className="w-16 h-16 text-red-500/70 mb-4" />
                ) : (
                    <BarChart2 className="w-16 h-16 text-gray-400 dark:text-gray-600 mb-4" />
                )}
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    {error ? 'Unable to Load Chart Data' : 'No Engagement Data'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 max-w-md">
                    {error ||
                        'There is no engagement data available to display at this time. Check back later for updates.'}
                </p>
            </motion.div>
        );
    }

    return (
        <ResponsiveContainer>
            <RechartsLineChart data={posts}>
                <Tooltip content={CustomTooltip} />
                <Line
                    type="monotone"
                    dataKey="like_count"
                    stroke="#4f46e5"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 8 }}
                />
                <Line
                    type="monotone"
                    dataKey="comment_count"
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
