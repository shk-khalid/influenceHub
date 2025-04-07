import type { Campaign } from '../components/types/campaign';

export const campaignsMock: Campaign[] = [
  {
    id: '1',
    title: 'Campaign One',
    description: 'First campaign on Instagram to increase reach.',
    status: 'pending',
    platform: 'instagram',
    startDate: '2025-03-01',
    endDate: '2025-04-01',
    priority: 'high',
    budget: 5000,
  },
  {
    id: '2',
    title: 'Campaign Two',
    description: 'YouTube video series campaign for product demos.',
    status: 'in_progress',
    platform: 'youtube',
    startDate: '2025-02-15',
    endDate: '2025-05-15',
    priority: 'medium',
    budget: 10000,
  },
  {
    id: '3',
    title: 'Campaign Three',
    description: 'Twitter buzz campaign for app launch.',
    status: 'completed',
    platform: 'twitter',
    startDate: '2025-01-01',
    endDate: '2025-02-01',
    priority: 'low',
    budget: 3000,
  },
];

