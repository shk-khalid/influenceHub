import { useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { Calendar } from '../components/collaboration/Calendar/Calendar';
import { FileGrid } from '../components/collaboration/FileSharing/FileGrid';
import { FileUpload } from '../components/collaboration/FileSharing/FileUpload';
import { Calendar as CalendarIcon, Share2 } from 'lucide-react';
import { Button } from '../components/common/Button';

const mockFiles = [
  {
    id: '1',
    name: 'Product Shoot 1.jpg',
    type: 'image' as const,
    url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
    thumbnail: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300',
    size: 2500000,
    uploadedAt: new Date('2024-03-10'),
  },
  {
    id: '2',
    name: 'Campaign Video.mp4',
    type: 'video' as const,
    url: 'https://example.com/video.mp4',
    size: 15000000,
    uploadedAt: new Date('2024-03-09'),
  },
  {
    id: '3',
    name: 'Brand Guidelines.pdf',
    type: 'document' as const,
    url: 'https://example.com/document.pdf',
    size: 1200000,
    uploadedAt: new Date('2024-03-08'),
  },
];

export default function ContentManager() {
  const [activeTab, setActiveTab] = useState<'calendar' | 'files'>('calendar');
  const [files, setFiles] = useState(mockFiles);

  const handleFileUpload = (fileList: FileList) => {
    // Handle file upload logic
    console.log('Files to upload:', fileList);
  };

  const handleFileDelete = (id: string) => {
    setFiles(files.filter(file => file.id !== id));
  };

  return (
    <Layout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Content Manager
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Plan, organize, and manage your content calendar and files
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant={activeTab === 'calendar' ? 'primary' : 'secondary'}
              icon={CalendarIcon}
              onClick={() => setActiveTab('calendar')}
            >
              Calendar
            </Button>
            <Button
              variant={activeTab === 'files' ? 'primary' : 'secondary'}
              icon={Share2}
              onClick={() => setActiveTab('files')}
            >
              Files
            </Button>
          </div>
        </div>

        {activeTab === 'calendar' ? (
          <Calendar />
        ) : (
          <div className="space-y-6">
            <FileUpload onUpload={handleFileUpload} />
            <FileGrid files={files} onDelete={handleFileDelete} />
          </div>
        )}
      </div>
    </Layout>
  );
}