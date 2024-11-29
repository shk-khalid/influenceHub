import { Campaign } from '../components/types';

export const generateCSVReport = (campaigns: Campaign[]): string => {
  const headers = [
    'Campaign Title',
    'Brand',
    'Status',
    'Progress',
    'Start Date',
    'End Date',
    'Reach',
    'Engagement',
    'ROI'
  ].join(',');

  const rows = campaigns.map(campaign => [
    `"${campaign.title}"`,
    `"${campaign.brand}"`,
    `"${campaign.status}"`,
    campaign.progress,
    campaign.startDate,
    campaign.endDate,
    campaign.metrics?.reach,
    `${campaign.metrics?.engagement}%`,
    `${campaign.roi}%`
  ].join(','));

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