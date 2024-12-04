import React, { useState } from 'react';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { TwoFactorAuth } from './TwoFactorAuth';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Card } from '../common/Card';
import DesktopLightLogo from '../../assets/logo/LightLogoOnly.png';
import DesktopDarkLogo from '../../assets/logo/DarkLogoOnly.png';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowTwoFactor(true);
    }, 1000);
  };

  const handleTwoFactorVerify = async (code: string) => {
    setIsLoading(true);
    try {
      await login(email, password);
      setIsLoading(false);
      setShowTwoFactor(false);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20">

      {/* Logo Section */}
      <div className="flex items-center justify-center mb-8 space-x-4">
        <img
          src={isDarkMode ? DesktopDarkLogo : DesktopLightLogo}
          alt="Logo"
          className="h-12"
        />
        <span className="block text-2xl font-bold text-gray-900 dark:text-white">
          influenceHub
        </span>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          Welcome back
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-300">
          Sign in to your account to continue
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="p-8 shadow-lg rounded-lg bg-white/30 dark:bg-gray-800/30 backdrop-blur-md border border-gray-300/40 dark:border-gray-700/40">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              label="Email address"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail className="h-5 w-5 text-gray-400" />}
              className="focus:ring-2 focus:ring-[#2563eb] dark:focus:ring-[#facc15] transition-transform duration-200"
            />

            <Input
              label="Password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<Lock className="h-5 w-5 text-gray-400" />}
              className="focus:ring-2 focus:ring-[#2563eb] dark:focus:ring-[#facc15] transition-transform duration-200"
            />

            <div className="flex items-center justify-between">
              <Link
                to="/forgot-password"
                className="text-sm font-medium text-[#2563eb] hover:text-[#1e3a8a] dark:text-[#facc15] dark:hover:text-[#f59e0b] transition duration-150 ease-in-out"
              >
                Forgot your password?
              </Link>
            </div>

            <Button
              type="submit"
              isLoading={isLoading}
              icon={<ArrowRight className="h-5 w-5" />}
              className="w-full bg-teal-500 hover:bg-teal-400 dark:bg-rose-500 dark:hover:bg-rose-400 focus:ring-teal-500 dark:focus:ring-rose-400 transition-transform duration-200"
            >
              Sign in
            </Button>

            <div className="mt-4 text-sm text-gray-600 dark:text-gray-300">
              <p>Demo accounts:</p>
              <ul className="mt-1 list-disc list-inside">
                <li>john@example.com / password123</li>
                <li>jane@example.com / password123</li>
              </ul>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 text-gray-500 dark:text-gray-400">
                  New to influenceHub?
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Link to="/signup">
                <Button
                  variant="outline"
                  className="border-teal-500 hover:bg-teal-400 focus:ring-teal-500 dark:border-rose-400 dark:hover:bg-rose-500 dark:focus:ring-rose-400 transition-transform duration-200"
                >
                  Create new account
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>

      <TwoFactorAuth
        isOpen={showTwoFactor}
        onClose={() => setShowTwoFactor(false)}
        onVerify={handleTwoFactorVerify}
        email={email}
      />
    </div>
  );
}
