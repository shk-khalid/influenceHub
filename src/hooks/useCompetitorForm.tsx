import { useState } from 'react';
import { useCompetitor } from '../context/CompetitorContext';
import { Competitor } from '../components/types';

interface FormData {
  name: string;
  handle: string;
  category: string;
  platform: string;
}

interface UseCompetitorFormProps {
  onSuccess?: () => void;
}

export function useCompetitorForm({ onSuccess }: UseCompetitorFormProps = {}) {
  const { addCompetitor } = useCompetitor();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    handle: '',
    category: 'Technology',
    platform: 'instagram',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const competitorData = await fetchCompetitorDetails(formData);
      addCompetitor(competitorData);
      resetForm();
      onSuccess?.();
    } catch (error) {
      console.error('Error fetching competitor details:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      handle: '',
      category: 'Technology',
      platform: 'instagram',
    });
  };

  const updateField = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  return {
    formData,
    isLoading,
    handleSubmit,
    updateField,
  };
}

// Simulated API call with proper typing
async function fetchCompetitorDetails(data: FormData): Promise<Omit<Competitor, 'id'>> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        ...data,
        followers: Math.floor(Math.random() * 1000000),
        engagement: Number((Math.random() * 10).toFixed(1)),
        recentPosts: [],
      });
    }, 1000);
  });
}