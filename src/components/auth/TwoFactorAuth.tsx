import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { TwoFactorAuthProps } from '../types';
import { Button } from '../common/Button';

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
      <div className="backdrop-blur-xl bg-white/30 dark:bg-gray-800/30 border border-gray-300/40 dark:border-gray-700/40 rounded-lg p-6 w-full max-w-md shadow-lg transform transition-all">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Two-Factor Authentication
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          We've sent a verification code to <span className="font-medium">{email}</span>.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter verification code"
            className="w-full px-4 py-2 bg-white/70 dark:bg-gray-700/70 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:focus:ring-yellow-400 focus:outline-none transition-all"
            maxLength={6}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button 
            variant='primary'
            type='submit'
            className='w-full bg-teal-500 hover:bg-teal-400 dark:bg-rose-500 dark:hover:bg-rose-400 transition-transform duration-200'
          >
            Verify
          </Button>
        </form>
      </div>
    </div>
  );
}
