import api from "./api";
import { Brand, BrandDetail } from "../components/types/brand";

export const brandService = {
  async fetchBrandList(): Promise<Brand[]> {
    try {
      const response = await api.get('/insight/brands');
      return response.data;
    } catch (error) {
      console.error('Error fetching brand list:', error);
      throw error;
    }
  },

  async fetchBrandDetail(id: string): Promise<BrandDetail> {
    try {
      const response = await api.get(`/insight/brands/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching brand details for ID ${id}:`, error);
      throw error;
    }
  }
};