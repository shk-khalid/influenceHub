import { addDays, format, subDays } from 'date-fns';
import { CampaignMetrics, DemographicData, EngagementMetric } from '../../types';

export const demographicData: DemographicData = {
  age: [
    { label: '18-24', value: 30 },
    { label: '25-34', value: 45 },
    { label: '35-44', value: 15 },
    { label: '45+', value: 10 },
  ],
  gender: [
    { label: 'Female', value: 58 },
    { label: 'Male', value: 40 },
    { label: 'Other', value: 2 },
  ],
  location: [
    { country: 'United States', value: 45 },
    { country: 'United Kingdom', value: 15 },
    { country: 'Canada', value: 12 },
    { country: 'Australia', value: 8 },
    { country: 'Germany', value: 6 },
    { country: 'Others', value: 14 },
  ],
};

export const generateEngagementData = (days: number): EngagementMetric[] => {
  return Array.from({ length: days }).map((_, index) => {
    const date = subDays(new Date(), days - index - 1);
    return {
      date: format(date, 'MMM dd'),
      likes: Math.floor(Math.random() * 1000) + 500,
      comments: Math.floor(Math.random() * 200) + 100,
      shares: Math.floor(Math.random() * 100) + 50,
      reach: Math.floor(Math.random() * 5000) + 2000,
    };
  });
};

export const campaigns: CampaignMetrics[] = [
  {
    id: '1',
    name: 'Summer Collection Launch',
    impressions: 250000,
    clicks: 45000,
    conversions: 3200,
    startDate: format(subDays(new Date(), 30), 'yyyy-MM-dd'),
    endDate: format(addDays(new Date(), 15), 'yyyy-MM-dd'),
  },
  {
    id: '2',
    name: 'Fitness Challenge',
    impressions: 180000,
    clicks: 32000,
    conversions: 2800,
    startDate: format(subDays(new Date(), 15), 'yyyy-MM-dd'),
    endDate: format(addDays(new Date(), 30), 'yyyy-MM-dd'),
  },
  {
    id: '3',
    name: 'Tech Review Series',
    impressions: 320000,
    clicks: 58000,
    conversions: 4100,
    startDate: format(subDays(new Date(), 45), 'yyyy-MM-dd'),
    endDate: format(subDays(new Date(), 15), 'yyyy-MM-dd'),
  },
];