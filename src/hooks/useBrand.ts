import { useState, useCallback } from 'react';
import { Brand, BrandDetail } from '../components/types/brand';
import { brandService } from '../services/brandService';

interface UseBrandServiceReturn {
  brands: Brand[];
  selectedBrand: BrandDetail | null;
  loading: boolean;
  error: Error | null;
  fetchBrands: () => Promise<void>;
  fetchBrandById: (id: string) => Promise<void>;
  clearError: () => void;
}

export const useBrandService = (): UseBrandServiceReturn => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<BrandDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const fetchBrands = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      setSelectedBrand(null); // Clear selected brand when fetching list
      const data = await brandService.fetchBrandList();
      setBrands(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch brands'));
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchBrandById = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await brandService.fetchBrandDetail(id);
      setSelectedBrand(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(`Failed to fetch brand with ID: ${id}`));
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    brands,
    selectedBrand,
    loading,
    error,
    fetchBrands,
    fetchBrandById,
    clearError,
  };
};