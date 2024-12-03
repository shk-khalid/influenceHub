import React, { useState, useRef, useEffect } from 'react';
import { X, Mail } from 'lucide-react';
import type { TwoFactorAuthProps } from '../types';
import { Button } from '../common/Button';
import { Input } from '../common/Input';

export function TwoFactorAuth({ isOpen, onClose, onVerify, email }: TwoFactorAuthProps) {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (isOpen) {
      inputRefs.current[0]?.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) value = value[0];

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value !== '' && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && code[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6).split('');
    setCode((prev) => {
      const newCode = [...prev];
      pastedData.forEach((digit, i) => {
        if (/[0-9]/.test(digit)) newCode[i] = digit;
      });
      return newCode;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fullCode = code.join('');
    if (fullCode === '123456') {
      onVerify(fullCode);
    } else {
      setError('Invalid verification code. Please try again.');
      setCode(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 w-full max-w-md shadow-lg transform transition-all">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Two-Factor Authentication
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
          Enter the verification code sent to{' '}
          <span className="font-semibold text-gray-900 dark:text-white">{email}</span>.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-6 gap-2">
            {code.map((digit, index) => (
              <Input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={digit}
                onChange={(e) => handleInputChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className="text-center text-2xl font-semibold py-2 focus:ring-[#2563eb] dark:focus:ring-[#facc15] transition-transform duration-200"
              />
            ))}
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center mt-4">{error}</p>
          )}

          <Button type="submit" className="w-full bg-teal-500 hover:bg-teal-400 dark:bg-rose-500 dark:hover:bg-rose-400 focus:ring-teal-500 dark:focus:ring-rose-400 transition-transform duration-200">
            Verify Code
          </Button>

          <p className="text-center text-sm mt-4">
            <button
              type="button"
              onClick={() => {
                setCode(['', '', '', '', '', '']);
                setError('');
              }}
              className="text-[#2563eb] hover:text-[#1e3a8a] dark:text-[#facc15] dark:hover:text-[#f59e0b] transition duration-150 ease-in-out"
            >
              Didn't receive the code? Resend
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
