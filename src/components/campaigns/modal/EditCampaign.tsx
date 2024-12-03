import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { X, Save } from 'lucide-react';
import { useCampaignStore } from '../../../hooks/useCampaign';
import { Campaign } from '../../types';
import { Button } from '../../common/Button';
import { Input } from '../../common/Input';
import { Card } from '../../common/Card';
import { Select } from '../../common/Select';

interface EditCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaign: Campaign;
}

export default function EditCampaignModal({ isOpen, onClose, campaign }: EditCampaignModalProps) {
  const updateCampaign = useCampaignStore((state) => state.updateCampaign);
  const [formData, setFormData] = useState(campaign);

  useEffect(() => {
    setFormData(campaign);
  }, [campaign]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateCampaign(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Card className="mx-auto max-w-2xl w-full p-8 shadow-lg rounded-lg bg-white/30 dark:bg-gray-800/30 backdrop-blur-md border border-gray-300/40 dark:border-gray-700/40">
          <div className="flex items-center justify-between mb-6">
            <Dialog.Title className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
              Edit Campaign
            </Dialog.Title>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 transition duration-150 ease-in-out"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Campaign Title"
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="focus:ring-2 focus:ring-blue-500 dark:focus:ring-yellow-400"
            />
            <Input
              label="Brand"
              type="text"
              required
              value={formData.brand}
              onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
              className="focus:ring-2 focus:ring-blue-500 dark:focus:ring-yellow-400"
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Start Date"
                type="date"
                required
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="focus:ring-2 focus:ring-blue-500 dark:focus:ring-yellow-400"
              />
              <Input
                label="End Date"
                type="date"
                required
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="focus:ring-2 focus:ring-blue-500 dark:focus:ring-yellow-400"
              />
            </div>
            <Input
              label="Budget"
              type="number"
              required
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: Number(e.target.value) })}
              className="focus:ring-2 focus:ring-blue-500 dark:focus:ring-yellow-400"
            />
            <Select
              label="Priority"
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
              options={[
                { value: 'low', label: 'Low' },
                { value: 'medium', label: 'Medium' },
                { value: 'high', label: 'High' },
              ]}
              className="focus:ring-2 focus:ring-indigo-600"
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Progress
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={formData.progress}
                onChange={(e) => setFormData({ ...formData, progress: Number(e.target.value) })}
                className="mt-1 block w-full"
              />
              <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {formData.progress}%
              </div>
            </div>
            <div className="flex justify-end space-x-4">
              <Button
                variant="outline"
                icon={<X className="w-5 h-5" />}
                onClick={onClose}
                className="border-teal-500 hover:bg-teal-400 focus:ring-teal-500 dark:border-rose-400 dark:hover:bg-rose-500 dark:focus:ring-rose-400 transition-transform duration-200"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                icon={<Save className="w-5 h-5" />}
                type="submit"
                className="bg-teal-500 hover:bg-teal-400 dark:bg-rose-500 dark:hover:bg-rose-400 focus:ring-teal-500 dark:focus:ring-rose-400 transition-transform duration-200"
              >
                Save Changes
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </Dialog>
  );
}
