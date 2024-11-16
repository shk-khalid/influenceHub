import { useState } from 'react';
import { File, Image, Video, FileText, Download, Trash2, Eye, X } from 'lucide-react';
import { Button } from '../../common/Button';

interface FileItem {
  id: string;
  name: string;
  type: 'image' | 'video' | 'document';
  url: string;
  size: number;
  uploadedAt: Date;
  thumbnail?: string;
}

interface FileGridProps {
  files: FileItem[];
  onDelete: (id: string) => void;
}

export function FileGrid({ files, onDelete }: FileGridProps) {
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);

  const getFileIcon = (type: FileItem['type']) => {
    switch (type) {
      case 'image': return Image;
      case 'video': return Video;
      case 'document': return FileText;
      default: return File;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {files.map((file) => {
          const Icon = getFileIcon(file.type);
          
          return (
            <div
              key={file.id}
              className="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              {file.type === 'image' && file.thumbnail ? (
                <div className="aspect-square">
                  <img
                    src={file.thumbnail}
                    alt={file.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="aspect-square flex items-center justify-center bg-gray-100 dark:bg-gray-900">
                  <Icon className="w-12 h-12 text-gray-400" />
                </div>
              )}

              <div className="p-4">
                <h3 className="font-medium text-gray-900 dark:text-white truncate">
                  {file.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {formatFileSize(file.size)}
                </p>
              </div>

              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Button
                  variant="secondary"
                  icon={Eye}
                  className="!p-2"
                  onClick={() => setSelectedFile(file)}
                />
                <Button
                  variant="secondary"
                  icon={Download}
                  className="!p-2"
                  onClick={() => window.open(file.url)}
                />
                <Button
                  variant="secondary"
                  icon={Trash2}
                  className="!p-2"
                  onClick={() => onDelete(file.id)}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* File Preview Modal */}
      {selectedFile && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-3xl w-full max-h-[90vh] overflow-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">{selectedFile.name}</h3>
              <button
                onClick={() => setSelectedFile(null)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {selectedFile.type === 'image' ? (
              <img
                src={selectedFile.url}
                alt={selectedFile.name}
                className="max-w-full h-auto rounded-lg"
              />
            ) : selectedFile.type === 'video' ? (
              <video
                src={selectedFile.url}
                controls
                className="max-w-full h-auto rounded-lg"
              />
            ) : (
              <div className="flex items-center justify-center p-12 bg-gray-100 dark:bg-gray-900 rounded-lg">
                <FileText className="w-16 h-16 text-gray-400" />
              </div>
            )}

            <div className="mt-4 text-sm text-gray-500">
              <p>Size: {formatFileSize(selectedFile.size)}</p>
              <p>Uploaded: {selectedFile.uploadedAt.toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}