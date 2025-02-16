import { useState } from 'react';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { TwoFactorAuth } from './TwoFactorAuth';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Card } from '../common/Card';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginFormData } from '../types/auth';
import toast from 'react-hot-toast';
import DesktopLightLogo from '../../assets/logo/LightLogoOnly.png';
import DesktopDarkLogo from '../../assets/logo/DarkLogoOnly.png';

export function LoginForm() {
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const { login, verifyOTP, resendOTP } = useAuth();
  const navigate = useNavigate();
  const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const result = await login(data.email, data.password);
      if (result) {
        setShowTwoFactor(true);
      }
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
    }
  };

  const handleTwoFactorVerify = async (code: string) => {
    try {
      await verifyOTP(getValues('email'), code, 'login');
      setShowTwoFactor(false);
      navigate('/dashboard');
    } catch (error) {
      toast.error('Invalid OTP code. Please try again.');
    }
  };

  const handleOTPReset = async () => {
    try {
      await resendOTP(getValues('email'));
      toast.success('OTP code resent successfully');
    } catch (error) {
      toast.error('Failed to resend OTP code');
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
        <span className="hidden lg:block text-2xl font-bold text-gray-900 dark:text-white">
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
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="Email address"
              type="email"
              {...register('email')}
              error={errors.email?.message}
              icon={<Mail className="h-5 w-5 text-gray-400" />}
              className="focus:ring-2 focus:ring-[#2563eb] dark:focus:ring-[#facc15] transition-transform duration-200"
            />

            <Input
              label="Password"
              type="password"
              {...register('password')}
              error={errors.password?.message}
              icon={<Lock className="h-5 w-5 text-gray-400" />}
              className="focus:ring-2 focus:ring-[#2563eb] dark:focus:ring-[#facc15] transition-transform duration-200"
            />

            <div className="flex items-center justify-between">
              <Link
                to="/forgot"
                className="text-sm font-medium text-[#2563eb] hover:text-[#1e3a8a] dark:text-[#facc15] dark:hover:text-[#f59e0b] transition duration-150 ease-in-out"
              >
                Forgot your password?
              </Link>
            </div>

            <Button
              type="submit"
              isLoading={isSubmitting}
              icon={<ArrowRight className="h-5 w-5" />}
              className="w-full bg-teal-500 hover:bg-teal-400 dark:bg-rose-500 dark:hover:bg-rose-400 focus:ring-teal-500 dark:focus:ring-rose-400 transition-transform duration-200"
            >
              Sign in
            </Button>
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
                  fullWidth
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
        onResend={handleOTPReset}
        email={getValues('email')}
      />
    </div>
  );
}