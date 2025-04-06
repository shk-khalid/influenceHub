import { useState } from 'react';
import { Mail, ArrowLeft, KeyRound } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Card } from '../common/Card';
import { TwoFactorAuth } from './TwoFactorAuth';
import { PasswordStrengthMeter } from './PasswordStrength';
import { useAuth } from '../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import DesktopLightLogo from '../../assets/logo/LightLogoOnly.png';
import DesktopDarkLogo from '../../assets/logo/DarkLogoOnly.png';
import { useAppSelector } from '../../hooks/useRedux';

const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number')
      .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export function ForgotPasswordForm() {
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [step, setStep] = useState<'email' | 'reset'>('email');
  const navigate = useNavigate();
  const { forgotPassword, resetPassword, verifyOTP, resendOTP } = useAuth();
  const isDarkMode = useAppSelector((state) => state.theme.darkMode);

  const {
    register: registerEmail,
    handleSubmit: handleEmailSubmit,
    formState: { errors: emailErrors, isSubmitting: isEmailSubmitting },
    getValues: getEmailValues,
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    watch,
    formState: { errors: passwordErrors, isSubmitting: isPasswordSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const password = watch('password');

  const onEmailSubmit = async (data: ForgotPasswordFormData) => {
    try {
      const result = await forgotPassword(data.email);
      // Only open two factor modal if response is 200 OK.
      if (result && result.status === 200) {
        setShowTwoFactor(true);
      }
    } catch (error) {
      console.error('Failed to send reset instructions; ', error);
    }
  };

  const onPasswordReset = async (data: ResetPasswordFormData) => {
    try {
      const email = getEmailValues('email');
      await resetPassword(email, data.password);
      navigate('/login');
    } catch (error) {
      console.error('Failed to reset password: ', error);
    }
  };

  const handleTwoFactorVerify = async (code: string) => {
    try {
      const email = getEmailValues('email');
      await verifyOTP(email, code, 'forgot_password');
      setShowTwoFactor(false);
      setStep('reset');
    } catch (error) {
      console.error('Invalid OTP code: ', error);
    }
  };

  const handleOTPReset = async () => {
    try {
      const email = getEmailValues('email');
      await resendOTP(email);
    } catch (error) {
      console.error('Failed to resend OTP code: ', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20">
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
          {step === 'email' ? 'Reset your password' : 'Create new password'}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-300">
          {step === 'email'
            ? "Enter your email and we'll send you a verification code"
            : 'Choose a strong password for your account'}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="p-8 shadow-lg rounded-lg bg-white/30 dark:bg-gray-800/30 backdrop-blur-md border border-gray-300/40 dark:border-gray-700/40">
          {step === 'email' ? (
            <form onSubmit={handleEmailSubmit(onEmailSubmit)} className="space-y-6">
              <Input
                label="Email address"
                type="email"
                {...registerEmail('email')}
                error={emailErrors.email?.message}
                icon={<Mail className="h-5 w-5 text-gray-400" />}
                className="focus:ring-2 focus:ring-[#2563eb] dark:focus:ring-[#facc15] transition-transform duration-200"
              />

              <Button
                type="submit"
                isLoading={isEmailSubmitting}
                className="w-full bg-teal-500 hover:bg-teal-400 dark:bg-rose-500 dark:hover:bg-rose-400 focus:ring-teal-500 dark:focus:ring-rose-400 transition-transform duration-200"
              >
                Send Reset Link
              </Button>

              <div className="flex items-center justify-center">
                <Link
                  to="/login"
                  className="flex items-center text-sm font-medium text-[#2563eb] hover:text-[#1e3a8a] dark:text-[#facc15] dark:hover:text-[#f59e0b] transition duration-150 ease-in-out"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to login
                </Link>
              </div>
            </form>
          ) : (
            <form onSubmit={handlePasswordSubmit(onPasswordReset)} className="space-y-6">
              <div>
                <Input
                  label="New Password"
                  type="password"
                  {...registerPassword('password')}
                  error={passwordErrors.password?.message}
                  icon={<KeyRound className="h-5 w-5 text-gray-400" />}
                  className="focus:ring-2 focus:ring-[#2563eb] dark:focus:ring-[#facc15] transition-transform duration-200"
                />
                <PasswordStrengthMeter password={password || ''} />
              </div>

              <Input
                label="Confirm New Password"
                type="password"
                {...registerPassword('confirmPassword')}
                error={passwordErrors.confirmPassword?.message}
                icon={<KeyRound className="h-5 w-5 text-gray-400" />}
                className="focus:ring-2 focus:ring-[#2563eb] dark:focus:ring-[#facc15] transition-transform duration-200"
              />

              <Button
                type="submit"
                isLoading={isPasswordSubmitting}
                className="w-full bg-teal-500 hover:bg-teal-400 dark:bg-rose-500 dark:hover:bg-rose-400 focus:ring-teal-500 dark:focus:ring-rose-400 transition-transform duration-200"
              >
                Reset Password
              </Button>
            </form>
          )}
        </Card>
      </div>

      <TwoFactorAuth
        isOpen={showTwoFactor}
        onClose={() => setShowTwoFactor(false)}
        onVerify={handleTwoFactorVerify}
        email={getEmailValues('email')}
        onResend={handleOTPReset}
      />
    </div>
  );
}
