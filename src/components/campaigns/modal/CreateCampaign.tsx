import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Save, X } from 'lucide-react';
import { useCampaignStore } from '../../../hooks/useCampaign';
import { Campaign } from '../../types';
import { Button } from '../../common/Button';
import { Input } from '../../common/Input';
import { Card } from '../../common/Card';

interface CreateCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateCampaignModal({ isOpen, onClose }: CreateCampaignModalProps) {
  const addCampaign = useCampaignStore((state) => state.addCampaign);
  const [formData, setFormData] = useState({
    title: '',
    brand: '',
    description: '',
    startDate: '',
    endDate: '',
    budget: '',
    platforms: [] as string[],
    goals: [] as string[],
    deliverables: [] as string[],
    requirements: [] as string[],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const campaign: Campaign = {
      id: Date.now().toString(),
      ...formData,
      budget: parseInt(formData.budget),
      status: 'pending',
    };
    addCampaign(campaign);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Card className="mx-auto max-w-2xl w-full p-8 shadow-lg rounded-lg bg-white/30 dark:bg-gray-800/30 backdrop-blur-md border border-gray-300/40 dark:border-gray-700/40">
          <div className="flex items-center justify-between mb-6">
            <Dialog.Title className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
              Create New Campaign
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
              className="focus:ring-2 focus:ring-[#2563eb] dark:focus:ring-[#facc15]"
            />
            <Input
              label="Brand"
              type="text"
              required
              value={formData.brand}
              onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
              className="focus:ring-2 focus:ring-[#2563eb] dark:focus:ring-[#facc15]"
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Start Date"
                type="date"
                required
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="focus:ring-2 focus:ring-[#2563eb] dark:focus:ring-[#facc15]"
              />
              <Input
                label="End Date"
                type="date"
                required
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                className="focus:ring-2 focus:ring-[#2563eb] dark:focus:ring-[#facc15]"
              />
            </div>
            <Input
              label="Budget"
              type="number"
              required
              value={formData.budget}
              onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
              className="focus:ring-2 focus:ring-[#2563eb] dark:focus:ring-[#facc15]"
            />
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
                Create Campaign
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </Dialog>
  );
}
