import { format } from 'date-fns';
import type { Campaign } from '../components/types/campaign';

export const generateCSVReport = (campaigns: Campaign[]): string => {
  const headers = [
    'Campaign Title',
    'Description',
    'Status',
    'Priority',
    'Budget (INR)',
    'Start Date',
    'End Date',
    'Platforms',
  ].join(',');

  const rows = campaigns.map(campaign => {
    const formattedStartDate = campaign.startDate ? format(new Date(campaign.startDate), 'MMM d, yyyy') : '';
    const formattedEndDate = campaign.endDate ? format(new Date(campaign.endDate), 'MMM d, yyyy') : '';
    const formattedBudget = campaign.budget ? campaign.budget.toLocaleString() : '0';
    const platforms = campaign.platform ? campaign.platform.toLowerCase() : 'No Platform';

    return [
      `"${campaign.title}"`,
      `"${campaign.description}"`,
      `"${campaign.status || 'pending'}"`,
      `"${campaign.priority || 'low'}"`,
      `"₹${formattedBudget}"`,
      `"${formattedStartDate}"`,
      `"${formattedEndDate}"`,
      `"${platforms}"`,
    ].join(',');
  });

  return [headers, ...rows].join('\n');
};

export const downloadReport = (data: string, filename: string) => {
  const blob = new Blob([data], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};
