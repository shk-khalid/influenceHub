import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { TwoFactorAuthProps } from '../types';

export function TwoFactorAuth({ isOpen, onClose, onVerify, email }: TwoFactorAuthProps) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code === '123456') {
      onVerify(code);
    } else {
      setError('Invalid verification code');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md transform transition-all">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold dark:text-white">Two-Factor Authentication</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          We've sent a verification code to {email}
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter verification code"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            maxLength={6}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white dark:bg-yellow-400 dark:hover:bg-yellow-300 dark:text-gray-900 py-2 rounded-lg transition-colors"
          >
            Verify
          </button>
        </form>
      </div>
    </div>
  );
}