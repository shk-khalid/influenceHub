import React from 'react';
import { LightbulbIcon } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row min-h-screen">
        {/* Left side - Branding */}
        <div className="lg:w-1/2 flex flex-col justify-center p-8 lg:p-12">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-6">
              <LightbulbIcon className="w-8 h-8 text-indigo-600" />
              <span className="text-2xl font-bold text-gray-900">InfluenceHub</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Connect. Collaborate. Create.
            </h1>
            <p className="text-lg text-gray-600">
              Join the platform where influencers and brands create meaningful partnerships.
            </p>
          </div>
          
          <div className="hidden lg:block">
            <div className="bg-white/50 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop"
                  alt="Testimonial"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-gray-900">Sarah Johnson</p>
                  <p className="text-sm text-gray-600">Fashion Influencer</p>
                </div>
              </div>
              <p className="text-gray-700">
                "InfluenceHub transformed how I collaborate with brands. The platform's
                seamless experience and professional tools make every partnership a success."
              </p>
            </div>
          </div>
        </div>

        {/* Right side - Auth Forms */}
        <div className="lg:w-1/2 flex items-center justify-center p-4 lg:p-12">
          <div className="w-full max-w-md">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}