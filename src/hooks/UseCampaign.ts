import { create } from 'zustand';
import toast from 'react-hot-toast';
import { Campaign, CampaignStatus } from '../components/types/campaign';
import { campaignService } from '../services/campaignService';

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
  isLoading: boolean;
  error: string | null;
  setCampaigns: (campaigns: Campaign[]) => void;
  fetchCampaigns: () => Promise<void>;
  updateCampaignStatus: (id: string, status: CampaignStatus) => Promise<void>;
  addCampaign: (campaign: Omit<Campaign, 'id'>) => Promise<void>;
  updateCampaign: (campaign: Campaign) => Promise<void>;
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
  isLoading: false,
  error: null,
  setCampaigns: (campaigns) => set({ campaigns }),

  fetchCampaigns: async () => {
    set({ isLoading: true, error: null });
    try {
      const campaigns = await campaignService.getAllCampaigns();
      set({ campaigns });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to fetch campaigns.';
      set({ error: message });
      toast.error(message);
    } finally {
      set({ isLoading: false });
    }
  },

  updateCampaignStatus: async (id, status) => {
    set({ isLoading: true, error: null });
    try {
      await campaignService.updateCampaignStatus(id, status);
      set((state) => ({
        campaigns: state.campaigns.map((campaign) =>
          campaign.id === id ? { ...campaign, status } : campaign
        ),
      }));
      toast.success('Campaign status updated successfully!');
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Failed to update campaign status.';
      set({ error: message });
      toast.error(message);
    } finally {
      set({ isLoading: false });
    }
  },

  addCampaign: async (campaign) => {
    set({ isLoading: true, error: null });
    try {
      const newCampaign = await campaignService.createCampaign(campaign);
      set((state) => ({
        campaigns: [...state.campaigns, newCampaign],
      }));
      toast.success('Campaign created successfully!');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to create campaign.';
      set({ error: message });
      toast.error(message);
    } finally {
      set({ isLoading: false });
    }
  },

  updateCampaign: async (campaign) => {
    set({ isLoading: true, error: null });
    try {
      const updatedCampaign = await campaignService.updateCampaign(campaign.id, campaign);
      set((state) => ({
        campaigns: state.campaigns.map((c) =>
          c.id === campaign.id ? updatedCampaign : c
        ),
      }));
      toast.success('Campaign updated successfully!');
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Failed to update campaign.';
      set({ error: message });
      toast.error(message);
    } finally {
      set({ isLoading: false });
    }
  },

  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),

  getFilteredCampaigns: () => {
    const { campaigns, filters } = get();

    return campaigns
      .filter((campaign) => {
        const matchesSearch =
          !filters.search ||
          campaign.title.toLowerCase().includes(filters.search.toLowerCase());

        const matchesPlatform =
          !filters.platform ||
          campaign.platform?.includes(filters.platform);

        const matchesPriority =
          !filters.priority || campaign.priority === filters.priority;

        const matchesBudget =
          !filters.budgetRange ||
          (() => {
            const [min, max] = filters.budgetRange.split('-').map(Number);
            if (filters.budgetRange === '5000+') {
              return (campaign.budget ?? 0) >= 5000;
            }
            return (campaign.budget ?? 0) >= min && (campaign.budget ?? 0) <= max;
          })();

        return matchesSearch && matchesPlatform && matchesPriority && matchesBudget;
      })
      .sort((a, b) => {
        if (!filters.sortBy) return 0;

        const direction = filters.sortDirection === 'asc' ? 1 : -1;

        switch (filters.sortBy) {
          case 'date':
            return (
              (new Date(a.startDate).getTime() - new Date(b.startDate).getTime()) *
              direction
            );
          case 'budget':
            return ((a.budget ?? 0) - (b.budget ?? 0)) * direction;
          case 'priority': {
            const priorityWeight = { high: 3, medium: 2, low: 1 };
            return (
              (priorityWeight[a.priority || 'low'] -
                priorityWeight[b.priority || 'low']) *
              direction
            );
          }
          default:
            return 0;
        }
      });
  },
}));
