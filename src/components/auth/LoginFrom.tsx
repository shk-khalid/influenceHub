import React, { useState } from 'react';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TwoFactorAuth } from './TwoFactorAuth';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Card } from '../common/Card';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

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
    await login(email, password);
    setIsLoading(false);
    setShowTwoFactor(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex flex-col py-12 sm:px-6 lg:px-8">
      <div className="fixed top-8 left-8">
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          Welcome back
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Sign in to your account to continue
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              label="Email address"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail className="h-5 w-5 text-gray-400" />}
            />

            <Input
              label="Password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<Lock className="h-5 w-5 text-gray-400" />}
            />

            <div className="flex items-center justify-between">
              <Link
                to="/forgot-password"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-yellow-400 dark:hover:text-yellow-300 transition-colors duration-200"
              >
                Forgot your password?
              </Link>
            </div>

            <Button
              type="submit"
              isLoading={isLoading}
              icon={<ArrowRight className="h-5 w-5" />}
            >
              Sign in
            </Button>

            <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
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
                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                  New to Collabwise?
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Link to="/signup">
                <Button variant="secondary">
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