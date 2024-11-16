import { useState } from 'react';
import { X, Check, X as XIcon } from 'lucide-react';

interface ApprovalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApprove: (comment: string) => void;
  onReject: (comment: string) => void;
  content: {
    title: string;
    description: string;
    preview: string;
  };
}

export default function ApprovalModal({
  isOpen,
  onClose,
  onApprove,
  onReject,
  content,
}: ApprovalModalProps) {
  const [comment, setComment] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Content Review</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          <div>
            <h3 className="font-medium text-gray-700 mb-2">Content Details</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">Title</label>
                <p className="mt-1 text-gray-800">{content.title}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Description</label>
                <p className="mt-1 text-gray-800">{content.description}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Preview</label>
                <div className="mt-2 border rounded-lg overflow-hidden">
                  <img
                    src={content.preview}
                    alt="Content Preview"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Feedback
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={4}
              placeholder="Add your feedback here..."
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 p-4 border-t bg-gray-50">
          <button
            onClick={() => onReject(comment)}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 inline-flex items-center gap-2"
          >
            <XIcon className="w-4 h-4" />
            Reject
          </button>
          <button
            onClick={() => onApprove(comment)}
            className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 inline-flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            Approve
          </button>
        </div>
      </div>
    </div>
  );
}