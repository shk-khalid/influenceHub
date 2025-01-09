import  api  from './api';
import { Campaign, CampaignStatus } from '../components/types/campaign';

export const campaignService = {
  getAllCampaigns: async (): Promise<Campaign[]> => {
    const response = await api.get<Campaign[]>('/campaign/create/');
    return response.data;
  },

  createCampaign: async (campaign: Omit<Campaign, 'id'>): Promise<Campaign> => {
    const response = await api.post<Campaign>('/campaign/create/', campaign);
    return response.data;
  },

  updateCampaign: async (id: string, campaign: Partial<Campaign>): Promise<Campaign> => {
    const response = await api.put<{ message: string; data: Campaign }>(
      `/campaign/${id}/update/`,
      campaign
    );
    return response.data.data;
  },

  updateCampaignStatus: async (id: string, status: CampaignStatus): Promise<void> => {
    await api.patch<{ message: string }>(
      `/campaign/${id}/status/`,
      { status }
    );
  },
};