import React, { useState } from 'react';
import { Mail, ArrowLeft, KeyRound } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Card } from '../common/Card';
import { TwoFactorAuth } from './TwoFactorAuth';
import { PasswordStrengthMeter } from './PasswordStrength';
import { useAuth } from '../../hooks/useAuth';
import DesktopLightLogo from '../../assets/logo/LightLogoOnly.png';
import DesktopDarkLogo from '../../assets/logo/DarkLogoOnly.png';

export function ForgotPasswordForm() {
    const [email, setEmail] = useState('');
    const [showTwoFactor, setShowTwoFactor] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState<'email' | 'reset'>('email');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [otpCode, setOtpCode] = useState('');
    const navigate = useNavigate();
    const { forgotPassword, resetPassword, verifyOTP, resendOTP } = useAuth();
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;


    const handleEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const result = await forgotPassword(email);
            if (result.success) {
                setShowTwoFactor(true);
            }
        } catch (error) {
            console.error('Failed to send reset code:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handlePasswordReset = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        setIsLoading(true);
        try {
            const result = await resetPassword(email, otpCode, newPassword);
            if (result.success) {
                navigate('/login', {
                    state: { message: 'Password reset successful. Please login with your new password.' },
                });
            }
        } catch (error) {
            console.error('Password reset failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleTwoFactorVerify = async (code: string) => {
        setIsLoading(true);
        try {
            const result = await verifyOTP(email, code);
            if (result.success) {
                setShowTwoFactor(false);
                navigate('/dashboard');
            }
        } catch (error) {
            console.error('2FA verification failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleOTPReset = async() => {
        setIsLoading(true);
        try {
          await resendOTP(email);
          console.log("OTP resent successfully");
          } catch (error) {
              console.error("Failed to resend OTP", error);
          } finally {
              setIsLoading(false);
        }
      }

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
                        <form onSubmit={handleEmailSubmit} className="space-y-6">
                            <Input
                                label="Email address"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                icon={<Mail className="h-5 w-5 text-gray-400" />}
                                className="focus:ring-2 focus:ring-[#2563eb] dark:focus:ring-[#facc15] transition-transform duration-200"
                            />

                            <Button
                                type="submit"
                                isLoading={isLoading}
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
                        <form onSubmit={handlePasswordReset} className="space-y-6">
                            <div>
                                <Input
                                    label="New Password"
                                    type="password"
                                    required
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    icon={<KeyRound className="h-5 w-5 text-gray-400" />}
                                    className="focus:ring-2 focus:ring-[#2563eb] dark:focus:ring-[#facc15] transition-transform duration-200"
                                />
                                <PasswordStrengthMeter password={newPassword} />
                            </div>

                            <Input
                                label="Confirm New Password"
                                type="password"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                error={error}
                                icon={<KeyRound className="h-5 w-5 text-gray-400" />}
                                className="focus:ring-2 focus:ring-[#2563eb] dark:focus:ring-[#facc15] transition-transform duration-200"
                            />

                            <Button
                                type="submit"
                                isLoading={isLoading}
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
                email={email}
                onResend={handleOTPReset}
            />
        </div>
    );
}