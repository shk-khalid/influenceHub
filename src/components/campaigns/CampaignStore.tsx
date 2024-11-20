import { create } from 'zustand';
import { Campaign, CampaignStatus } from '../types';

interface Filters {
  search: string;
  platform: string;
  priority: string;
  budgetRange: string;
  sortBy: 'date' | 'budget' | 'priority' | null;
  sortDirection: 'asc' | 'desc';
}

interface CampaignStore {
  campaigns: Campaign[];
  filters: Filters;
  setCampaigns: (campaigns: Campaign[]) => void;
  updateCampaignStatus: (id: string, status: CampaignStatus) => void;
  addCampaign: (campaign: Campaign) => void;
  updateCampaign: (campaign: Campaign) => void;
  setFilters: (filters: Partial<Filters>) => void;
  getFilteredCampaigns: () => Campaign[];
}

const defaultFilters: Filters = {
  search: '',
  platform: '',
  priority: '',
  budgetRange: '',
  sortBy: null,
  sortDirection: 'desc',
};

export const useCampaignStore = create<CampaignStore>((set, get) => ({
  campaigns: [],
  filters: defaultFilters,
  setCampaigns: (campaigns) => set({ campaigns }),
  updateCampaignStatus: (id, status) =>
    set((state) => ({
      campaigns: state.campaigns.map((campaign) =>
        campaign.id === id ? { ...campaign, status } : campaign
      ),
    })),
  addCampaign: (campaign) =>
    set((state) => ({
      campaigns: [...state.campaigns, campaign],
    })),
  updateCampaign: (updatedCampaign) =>
    set((state) => ({
      campaigns: state.campaigns.map((campaign) =>
        campaign.id === updatedCampaign.id ? updatedCampaign : campaign
      ),
    })),
  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),
  getFilteredCampaigns: () => {
    const { campaigns, filters } = get();
    
    return campaigns
      .filter((campaign) => {
        const matchesSearch = !filters.search
          || campaign.title.toLowerCase().includes(filters.search.toLowerCase())
          || campaign.brand.toLowerCase().includes(filters.search.toLowerCase());

        const matchesPlatform = !filters.platform
          || campaign.platforms.includes(filters.platform);

        const matchesPriority = !filters.priority
          || campaign.priority === filters.priority;

        const matchesBudget = !filters.budgetRange || (() => {
          const [min, max] = filters.budgetRange.split('-').map(Number);
          if (filters.budgetRange === '5000+') {
            return campaign.budget >= 5000;
          }
          return campaign.budget >= min && campaign.budget <= max;
        })();

        return matchesSearch && matchesPlatform && matchesPriority && matchesBudget;
      })
      .sort((a, b) => {
        if (!filters.sortBy) return 0;
        
        const direction = filters.sortDirection === 'asc' ? 1 : -1;
        
        switch (filters.sortBy) {
          case 'date':
            return (new Date(a.startDate).getTime() - new Date(b.startDate).getTime()) * direction;
          case 'budget':
            return (a.budget - b.budget) * direction;
          case 'priority': {
            const priorityWeight = { high: 3, medium: 2, low: 1 };
            return ((priorityWeight[a.priority || 'low'] - priorityWeight[b.priority || 'low']) * direction);
          }
          default:
            return 0;
        }
      });
  },
}));