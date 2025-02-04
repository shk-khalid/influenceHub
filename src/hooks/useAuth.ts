import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function useAuth() {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  const handleRegister = async (username: string, email: string, password: string, confirmPassword: string) => {
    try {
      await context.register(username, email, password, confirmPassword);
      toast.success('Registration successful! Please check your email.');
      navigate('/login');
    } catch (error) {
      toast.error('Registration failed. Please try again.');
    }
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      await context.login(email, password);
      toast.success('OTP sent to your email.');
      return true;
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
      return false;
    }
  };

  const handleVerifyOTP = async (email: string, otp: string, action: 'login' | 'forgot_password') => {
    try {
      await context.verifyOTP(email, otp, action);
      if (action === 'login') {
        toast.success('Login successful!');
        navigate('/dashboard');
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
      toast.success("OTP resent");
    } catch (error) {
      toast.error('Failed to resend otp. Please try again.')
    }
  }

  const handleForgotPassword = async (email: string) => {
    try {
      await context.forgotPassword(email);
      toast.success('Reset instructions sent to your email.');
      return true;
    } catch (error) {
      toast.error('Failed to send reset instructions. Please try again.');
      return false;
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