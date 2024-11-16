export type CalendarViewType = 'day' | 'week' | 'month';

export interface ContentEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  status: 'draft' | 'pending' | 'approved' | 'rejected';
  assignee: string;
}

export interface FileItem {
  id: string;
  name: string;
  url: string;
  type: string;
  size: number;
  uploadedAt: string;
  uploadedBy: string;
}