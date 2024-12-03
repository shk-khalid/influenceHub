import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react';
import { Card } from '../common/Card';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import { Button } from '../common/Button';

const PLATFORMS = [
  { value: 'instagram', label: 'Instagram' },
  { value: 'twitter', label: 'Twitter' },
  { value: 'youtube', label: 'YouTube' },
];

const CATEGORIES = [
  { value: 'Technology', label: 'Technology' },
  { value: 'Fashion', label: 'Fashion' },
  { value: 'Food', label: 'Food' },
  { value: 'Lifestyle', label: 'Lifestyle' },
  { value: 'Travel', label: 'Travel' },
];

interface CompetitorFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function CompetitorForm({ isOpen, onClose, onSuccess }: CompetitorFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    handle: '',
    platform: '',
    category: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const updateField = (field: keyof typeof formData) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulated submission logic
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Submission failed', error);
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Card className="max-w-2xl mx-auto p-8 shadow-lg rounded-lg bg-white/30 dark:bg-gray-800/30 backdrop-blur-md border border-gray-300/40 dark:border-gray-700/40">
          <div className="flex items-center justify-between mb-6">
            <Dialog.Title className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
              Add New Competitor
            </Dialog.Title>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 transition duration-150 ease-in-out"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Competitor Name"
                required
                value={formData.name}
                onChange={(e) => updateField('name')(e.target.value)}
                placeholder="e.g., Competitor Inc."
                className="focus:ring-2 focus:ring-[#2563eb] dark:focus:ring-[#facc15]"
              />
              <Input
                label="Social Handle"
                required
                value={formData.handle}
                onChange={(e) => updateField('handle')(e.target.value)}
                placeholder="e.g., @competitor"
                className="focus:ring-2 focus:ring-[#2563eb] dark:focus:ring-[#facc15]"
              />
              <Select
                label="Platform"
                required
                value={formData.platform}
                onChange={(e) => updateField('platform')(e.target.value)}
                options={PLATFORMS}
                className="focus:ring-2 focus:ring-[#2563eb] dark:focus:ring-[#facc15]"
              />
              <Select
                label="Category"
                required
                value={formData.category}
                onChange={(e) => updateField('category')(e.target.value)}
                options={CATEGORIES}
                className="focus:ring-2 focus:ring-[#2563eb] dark:focus:ring-[#facc15]"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <Button
                type="submit"
                fullWidth
                className="bg-teal-500 hover:bg-teal-400 dark:bg-rose-500 dark:hover:bg-rose-400 focus:ring-teal-500 dark:focus:ring-rose-400 transition-transform duration-200"
                disabled={isLoading}
              >
                {isLoading ? 'Fetching Details...' : 'Add Competitor'}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </Dialog>
  );
}
