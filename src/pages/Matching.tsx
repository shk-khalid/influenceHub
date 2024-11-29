import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, TrendingUp, Users, Target, BarChart } from 'lucide-react';
import { Brand } from '../components/types';
import { BrandCard } from '../components/matching/BrandCard';
import { InsightCard } from '../components/matching/InsightCard';
import { Layout } from '../components/layout/Layout';

const mockBrands: Brand[] = [
  {
    id: '1',
    name: 'TechVision Pro',
    logo: 'https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?w=400&h=400&fit=crop',
    location: 'San Francisco, CA',
    sector: 'Electronics',
    rating: 4.8,
    value: [
      { year: 2022, amount: 1200000 },
      { year: 2023, amount: 1800000 }
    ],
    competitors: ['CompA', 'CompB', 'CompC'],
    demographics: {
      gender: {
        male: 65,
        female: 30,
        other: 5
      }
    },
    metrics: {
      engagementRate: 8.5,
      marketShare: 12.3
    },
    sentiment: {
      positive: 75,
      neutral: 20,
      negative: 5,
      keywords: ['innovation', 'quality', 'design', 'premium'],
      trends: ['#TechInnovation', '#FutureGadgets', '#SmartLiving']
    }
  }
];

export const BrandMatchingDashboard = () => {
  const [currentBrandIndex, setCurrentBrandIndex] = useState(0);

  const handleAccept = (brand: Brand) => {
    console.log('Accepted brand:', brand);
    setCurrentBrandIndex((prev) => prev + 1);
  };

  const handleDecline = (brand: Brand) => {
    console.log('Declined brand:', brand);
    setCurrentBrandIndex((prev) => prev + 1);
  };

  return (
    <Layout>
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Brand Matches</h1>
            <div className="flex justify-center items-center min-h-[600px]">
              <AnimatePresence mode="wait">
                {currentBrandIndex < mockBrands.length ? (
                  <BrandCard
                    key={mockBrands[currentBrandIndex].id}
                    brand={mockBrands[currentBrandIndex]}
                    onAccept={handleAccept}
                    onDecline={handleDecline}
                  />
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center"
                  >
                    <Sparkles className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                      You're all caught up!
                    </h2>
                    <p className="text-gray-600">
                      Check back later for new brand matches.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              <InsightCard
                icon={<Users className="w-5 h-5" />}
                title="Total Matches"
                value="24"
                trend={{ direction: 'up', value: '+12% this week' }}
              />
              <InsightCard
                icon={<Target className="w-5 h-5" />}
                title="Avg. Match Rate"
                value="85%"
                trend={{ direction: 'up', value: '+5% this month' }}
              />
              <InsightCard
                icon={<BarChart className="w-5 h-5" />}
                title="Campaign Success"
                value="92%"
              />
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="w-5 h-5 text-blue-500" />
                <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
              </div>
              <div className="space-y-4">
                {['Electronics', 'Fashion', 'Cosmetics'].map((sector) => (
                  <div
                    key={sector}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <span className="text-sm font-medium text-gray-700">{sector}</span>
                    <span className="text-sm text-gray-500">
                      {Math.floor(Math.random() * 10) + 1} new matches
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
};