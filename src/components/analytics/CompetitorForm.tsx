import React from 'react';
import { Plus } from 'lucide-react';
import { useCompetitorStore } from '../../hooks/useCompetitor';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Select } from '../common/Select';

interface CompetitorFormProps {
  onSuccess?: () => void;
}

export function CompetitorForm({ onSuccess }: CompetitorFormProps) {
  const addCompetitor = useCompetitorStore((state) => state.addCompetitor);
  const [formData, setFormData] = React.useState({
    name: '',
    handle: '',
    followers: 0,
    engagement: 0,
    category: 'Technology',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addCompetitor({
      ...formData,
      recentPosts: [],
    });
    setFormData({ name: '', handle: '', followers: 0, engagement: 0, category: 'Technology' });
    onSuccess?.();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="card p-4 sm:p-6 mb-8 animate-scale-in max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md"
    >
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-900 dark:text-gray-100">
        <Plus className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        Add New Competitor
      </h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        <Input
          label="Name"
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="e.g., Competitor Inc."
        />
        <Input
          label="Handle"
          type="text"
          required
          value={formData.handle}
          onChange={(e) => setFormData({ ...formData, handle: e.target.value })}
          placeholder="e.g., @competitor"
        />
        <Select
          label="Category"
          required
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          options={[
            { value: 'Technology', label: 'Technology' },
            { value: 'Fashion', label: 'Fashion' },
            { value: 'Food', label: 'Food' },
            { value: 'Lifestyle', label: 'Lifestyle' },
            { value: 'Travel', label: 'Travel' },
          ]}
          className='text-'
        />
        <Input
          label="Followers"
          type="number"
          required
          value={formData.followers}
          onChange={(e) => setFormData({ ...formData, followers: Number(e.target.value) })}
          placeholder="e.g., 10000"
          min="0"
        />
        <Input
          label="Engagement Rate (%)"
          type="number"
          step="0.1"
          required
          value={formData.engagement}
          onChange={(e) => setFormData({ ...formData, engagement: Number(e.target.value) })}
          placeholder="e.g., 4.5"
          min="0"
          max="100"
        />
      </div>
      <Button type="submit" className="mt-4 w-full sm:w-auto">
        Add Competitor
      </Button>
    </form>
  );
}
