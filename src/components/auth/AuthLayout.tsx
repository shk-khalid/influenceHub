import React from 'react';
import { Sparkles } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>
      <div className="w-full max-w-md relative">
        <div className="absolute -top-4 -left-4 w-20 h-20 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -top-4 -right-4 w-20 h-20 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="mb-8 text-center relative">
          <div className="bg-white/30 backdrop-blur-sm rounded-2xl p-4 inline-block mb-4">
            <Sparkles className="w-12 h-12 text-indigo-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            {title}
          </h1>
          <p className="text-gray-600">{subtitle}</p>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 relative z-10 border border-white/20">
          <div className="form-fade-in">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}