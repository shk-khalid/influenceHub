import React from 'react';
import { Users, BarChart, TrendingUp, DollarSign } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  change: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, change }) => (
  <div className="glass-effect rounded-xl p-6 transition-all duration-200 hover:shadow-glow group">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
        <p className="mt-2 text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          {value}
        </p>
      </div>
      <div className="p-2 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-lg group-hover:scale-110 transition-transform duration-200">
        <Icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
      </div>
    </div>
    <p className="mt-2 text-sm font-medium text-green-600 dark:text-green-400">
      {change} from last month
    </p>
  </div>
);

const DashboardOverview: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="glass-effect rounded-xl p-6 shadow-glow">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Dashboard Overview
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Welcome back, John! Here's what's happening with your campaigns.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Total Reach', value: '2.4M', icon: Users, change: '+12.5%' },
          { title: 'Active Campaigns', value: '24', icon: BarChart, change: '+3.2%' },
          { title: 'Engagement Rate', value: '4.7%', icon: TrendingUp, change: '+0.8%' },
          { title: 'Revenue', value: '$12.4K', icon: DollarSign, change: '+22.4%' },
        ].map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            change={stat.change}
          />
        ))}
      </div>
    </div>
  );
};

const Dashboard: React.FC = () => {
  return (
      <DashboardOverview />
  );
};

export default Dashboard;
