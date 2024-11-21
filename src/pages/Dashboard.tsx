import React from 'react';
import { motion } from 'framer-motion';
import { Users, ThumbsUp, Share2, Eye, Filter } from 'lucide-react';
import MetricCard from '../components/dashboard/widgets/MetricsCard';
import DemographicsChart from '../components/dashboard/widgets/DemographicChart';
import EngagementChart from '../components/dashboard/widgets/EngagementChart';
import CampaignTable from '../components/dashboard/widgets/CampaignTable';
import DateRangePicker from '../components/dashboard/widgets/DateRangePicker';
import FilterPanel from '../components/dashboard/widgets/FilterPanel';
import { demographicData, generateEngagementData, campaigns } from '../components/dashboard/data/MockData';

export default function Dashboard() {
    const [timeframe, setTimeframe] = React.useState(30);
    const [isFilterOpen, setIsFilterOpen] = React.useState(false);
    const [selectedRegion, setSelectedRegion] = React.useState('all');
    const engagementData = generateEngagementData(timeframe);

    const totalReach = engagementData.reduce((sum, day) => sum + day.reach, 0);
    const avgEngagement = (
        (engagementData.reduce((sum, day) => sum + day.likes + day.comments + day.shares, 0) /
            (timeframe * 3)) /
        totalReach
    ).toFixed(2);

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <header className="relative mb-20 text-center">
                <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="absolute -top-4 left-1/2 -translate-x-1/2 w-48 h-48 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-3xl" />
                <motion.h1 className="text-6xl font-bold gradient-text mb-4 relative" initial={{ y: 20 }} animate={{ y: 0 }}>
                    Analytics Dashboard
                </motion.h1>
                <motion.p className="text-gray-600 dark:text-gray-400 text-lg relative max-w-2xl mx-auto" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
                    Track your performance metrics and engagement insights in real-time
                </motion.p>
            </header>
        
            <div className="mb-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-6">
                    <DateRangePicker onTimeframeChange={setTimeframe} />
                    <div className="relative w-full sm:w-auto">
                        <button
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 
                       bg-gray-900 dark:bg-gray-700 text-white rounded-lg"
                        >
                            <Filter className="w-4 h-4" />
                            <span>Filters</span>
                        </button>
                        {isFilterOpen && (
                            <FilterPanel
                                selectedRegion={selectedRegion}
                                onRegionChange={setSelectedRegion}
                                onClose={() => setIsFilterOpen(false)}
                            />
                        )}
                    </div>
                </div>
            </div>

            <div className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <MetricCard
                        title="Total Reach"
                        value={totalReach.toLocaleString()}
                        icon={Eye}
                        trend={{ value: 12.5, isPositive: true }}
                    />
                    <MetricCard
                        title="Engagement Rate"
                        value={`${avgEngagement}%`}
                        icon={ThumbsUp}
                        trend={{ value: 5.2, isPositive: true }}
                    />
                    <MetricCard
                        title="Total Shares"
                        value={engagementData.reduce((sum, day) => sum + day.shares, 0).toLocaleString()}
                        icon={Share2}
                        trend={{ value: 8.1, isPositive: true }}
                    />
                    <MetricCard
                        title="Active Followers"
                        value="125.3K"
                        icon={Users}
                        trend={{ value: 3.2, isPositive: true }}
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                        <EngagementChart data={engagementData} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:col-span-2">
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                            <DemographicsChart data={demographicData} type="age" title="Age Distribution" />
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                            <DemographicsChart data={demographicData} type="gender" title="Gender Distribution" />
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                            <DemographicsChart data={demographicData} type="location" title="Geographic Distribution" />
                        </div>
                    </div>

                    <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                        <CampaignTable campaigns={campaigns} />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}