import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { TwoFactorAuth } from './TwoFactorAuth';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Card } from '../common/Card';
import { PasswordStrengthMeter } from './PasswordStrength';
import { calculatePasswordStrength } from '../../lib/PasswordStrength';

export function SignupForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const { score } = calculatePasswordStrength(password);
    if (score < 3) {
      setError('Please choose a stronger password');
      return;
    }

    setError('');
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowTwoFactor(true);
    }, 1000);
  };

  const handleTwoFactorVerify = async (code: string) => {
    setIsLoading(true);
    await signup(email, password, fullName);
    setIsLoading(false);
    setShowTwoFactor(false);
    navigate('/complete-profile');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex flex-col py-12 sm:px-6 lg:px-8">
      <div className="fixed top-8 left-8">
        
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          Join Collabwise
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Create your account to get started
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
              label="Full Name"
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              icon={<User className="h-5 w-5 text-gray-400" />}
            />

            <Input
              label="Email address"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail className="h-5 w-5 text-gray-400" />}
            />

            <div>
              <Input
                label="Password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={<Lock className="h-5 w-5 text-gray-400" />}
              />
              <PasswordStrengthMeter password={password} />
            </div>

            <Input
              label="Confirm Password"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              error={error}
              icon={<Lock className="h-5 w-5 text-gray-400" />}
            />

            <Button
              type="submit"
              isLoading={isLoading}
              icon={<ArrowRight className="h-5 w-5" />}
            >
              Create Account
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                  Already have an account?
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Link to="/login">
                <Button variant="secondary">
                  Sign in instead
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