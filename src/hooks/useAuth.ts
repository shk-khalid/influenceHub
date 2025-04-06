import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AuthResponse } from '../services/authService';

export function useAuth() {
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  const handleRegister = async (
    username: string,
    email: string,
    password: string,
    confirmPassword: string
  ): Promise<{ status: number; data: AuthResponse }> => {
    try {
      await context.register(username, email, password, confirmPassword);
      toast.success('Registration successful! Please check your email.');
      navigate('/login');
      return { status: 200, data: { message: 'Registration successful' } };
    } catch (error: any) {
      toast.error(error.message || 'Registration failed. Please try again.');
      return { status: 400, data: { message: error.message || 'Registration failed.' } };
    }
  };


  const handleLogin = async (
    email: string,
    password: string
  ): Promise<{ status: number; data: AuthResponse }> => {
    try {
      const success = await context.login(email, password); // assume it returns a boolean
      if (success) {
        toast.success('OTP sent to your email.');
        return { status: 200, data: { message: 'OTP sent to your email.' } };
      }
      // Fallback if false
      throw new Error('Login failed.');
    } catch (error: any) {
      toast.error(error.message || 'Login failed. Please check your credentials.');
      return { status: 401, data: { message: error.message || 'Login failed.' } };
    }
  };
  

  const handleForgotPassword = async (
    email: string
  ): Promise<{ status: number; data: AuthResponse }> => {
    try {
      await context.forgotPassword(email);
      toast.success('Reset instructions sent to your email.');
      return { status: 200, data: { message: 'Reset instructions sent to your email.' } };
    } catch (error: any) {
      toast.error(error.message || 'Failed to send reset instructions. Please try again.');
      return { status: 400, data: { message: error.message || 'Password reset failed.' } };
    }
  };
  

  const handleVerifyOTP = async (
    email: string,
    otp: string,
    action: 'login' | 'forgot_password'
  ) => {
    try {
      await context.verifyOTP(email, otp, action);
      if (action === 'login') {
        toast.success('Login successful!');
        const from = (location.state as { from?: Location })?.from?.pathname || '/dashboard';
        navigate(from, { replace: true });
      } else {
        toast.success('OTP verified. Please set your new password.');
      }
    } catch (error) {
      toast.error('Invalid OTP. Please try again.');
    }
  };

  const handleResendOTP = async (email: string) => {
    try {
      await context.resendOTP(email);
      toast.success('OTP resent');
    } catch (error) {
      toast.error('Failed to resend OTP. Please try again.');
    }
  };

  const handleResetPassword = async (email: string, newPassword: string) => {
    try {
      await context.resetPassword(email, newPassword);
      toast.success('Password reset successful! Please login with your new password.');
      navigate('/login');
    } catch (error) {
      toast.error('Failed to reset password. Please try again.');
    }
  };

  const handleLogout = async () => {
    try {
      await context.logout();
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  return {
    ...context,
    register: handleRegister,
    login: handleLogin,
    verifyOTP: handleVerifyOTP,
    resendOTP: handleResendOTP,
    forgotPassword: handleForgotPassword,
    resetPassword: handleResetPassword,
    logout: handleLogout,
  };
}
