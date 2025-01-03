import { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../context/AuthContext';
import { authService } from '../services/authService';

export function useAuth() {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  const { login, verifyOTP, logout, updateUserDetails, ...state } = context;

  // Enhanced login with toast
  const handleLogin = async (email: string, password: string) => {
    try {
      const result = await login(email, password);
      if (result.success) {
        toast.success('OTP sent to your email');
      } else {
        toast.error(result.error || 'Login failed');
      }
      return result;
    } catch (error) {
      toast.error('An error occurred during login');
      return { success: false, error: 'Login failed' };
    }
  };

  // Enhanced OTP verification with toast
  const handleVerifyOTP = async (email: string, otp: string) => {
    try {
      const result = await verifyOTP(email, otp);
      if (result.success) {
        toast.success('Login successful!');
      } else {
        toast.error(result.error || 'Invalid OTP');
      }
      return result;
    } catch (error) {
      toast.error('Failed to verify OTP');
      return { success: false, error: 'OTP verification failed' };
    }
  };

  // Enhanced logout with toast
  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error('Failed to logout');
    }
  };

  // Enhanced profile update with toast
  const handleUpdateUserDetails = async (details: Parameters<typeof updateUserDetails>[0]) => {
    try {
      await updateUserDetails(details);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  // Password reset request with toast
  const handleForgotPassword = async (email: string) => {
    try {
      const response = await authService.forgotPassword(email);
      toast.success(response.message || 'Reset code sent to your email');
      return { success: true };
    } catch (error) {
      toast.error('Failed to send reset code');
      return { success: false, error: 'Failed to send reset code' };
    }
  };

  // Reset password with OTP and toast
  const handleResetPassword = async (email: string, otp: string, newPassword: string) => {
    try {
      const response = await authService.resetPassword(email, otp, newPassword);
      toast.success(response.message || 'Password reset successful');
      return { success: true };
    } catch (error) {
      toast.error('Failed to reset password');
      return { success: false, error: 'Failed to reset password' };
    }
  };

  return {
    ...state,
    login: handleLogin,
    verifyOTP: handleVerifyOTP,
    logout: handleLogout,
    updateUserDetails: handleUpdateUserDetails,
    forgotPassword: handleForgotPassword,
    resetPassword: handleResetPassword,
  };
}