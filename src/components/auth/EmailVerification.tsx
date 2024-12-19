import { Mail, X } from 'lucide-react';
import { Button } from '../common/Button';

interface EmailVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
}

export function EmailVerification({ isOpen, onClose, email }: EmailVerificationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 w-full max-w-md shadow-lg transform transition-all">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Verify Your Email
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <p className="text-gray-600 dark:text-gray-300 mb-8 text-center">
          We’ve sent a verification link to{' '}
          <span className="font-semibold text-gray-900 dark:text-white">{email}</span>. Check your inbox and click the link to verify your email address.
        </p>

        <form className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            <Button
              onClick={onClose}
              className="w-full bg-teal-500 hover:bg-teal-400 dark:bg-rose-500 dark:hover:bg-rose-400 focus:ring-teal-500 dark:focus:ring-rose-400 transition-transform duration-200"
            >
              Close
            </Button>
          </div>

          <p className="text-center text-sm mt-4">
            Didn’t receive the email?{' '}
            <button
              type="button"
              className="text-teal-600 hover:text-teal-800 dark:text-rose-500 dark:hover:text-rose-700 transition duration-150 ease-in-out"
            >
              Resend
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
