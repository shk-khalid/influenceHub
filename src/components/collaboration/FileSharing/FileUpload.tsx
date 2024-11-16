import React, { useCallback } from 'react';
import { Upload } from 'lucide-react';

interface FileUploadProps {
  onUpload: (files: FileList) => void;
  accept?: string;
  multiple?: boolean;
}

export function FileUpload({ onUpload, accept, multiple = true }: FileUploadProps) {
  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const files = e.dataTransfer.files;
      if (files.length > 0) {
        onUpload(files);
      }
    },
    [onUpload]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-8 text-center hover:border-indigo-500 transition-colors"
    >
      <input
        type="file"
        id="fileInput"
        className="hidden"
        accept={accept}
        multiple={multiple}
        onChange={(e) => e.target.files && onUpload(e.target.files)}
      />
      
      <label
        htmlFor="fileInput"
        className="cursor-pointer flex flex-col items-center"
      >
        <Upload className="w-12 h-12 text-gray-400 mb-4" />
        <p className="text-lg font-medium text-gray-900 dark:text-white mb-1">
          Drop files here or click to upload
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Support for images, videos, and documents
        </p>
      </label>
    </div>
  );
}