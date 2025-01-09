import api from "./api";
import { Brand } from "../components/types";


export const brandService = {
    async fetchBrandList(): Promise<Brand[]> {
        try {
            const response = await api.get('/insight/brands');
            return response.data;
        } catch (error) {
            console.error('error fetching brand list:', error);
            throw error;
        }
    },

    async fetchBrandDetail(id: string): Promise<Brand> {
        try{
            const response = await api.get(`/insight/brands/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching brand details for ID ${id}:`, error);
            throw error;
        }
    }
}