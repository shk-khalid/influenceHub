import { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../context/AuthContext';
import { authService } from '../services/authService';

export function useAuth() {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  const { login, verifyOTP, resendOTP, logout, updateUserDetails, ...state } = context;

  // Enhanced login with toast
  const handleLogin = async (email: string, password: string) => {
    try {
      const result = await login(email, password);
      if (result.success) {
        toast.success('A one-time password (OTP) has been sent to your email address.');
      } else {
        toast.error(result.error || 'Login failed. Please try again.');
      }
      return result;
    } catch (error) {
      toast.error('There was an issue while logging you in. Please try again later.');
      return { success: false, error: 'Login failed' };
    }
  };

  // Enhanced OTP verification with toast
  const handleVerifyOTP = async (email: string, otp: string) => {
    try {
      const result = await verifyOTP(email, otp);
      if (result.success) {
        toast.success('You are successfully logged in! Welcome back!');
      } else {
        toast.error(result.error || 'The OTP you entered is incorrect. Please try again.');
      }
      return result;
    } catch (error) {
      toast.error('Unable to verify the OTP at this time. Please try again later.');
      return { success: false, error: 'OTP verification failed' };
    }
  };

  // Resend OTP with toast
  const handleResendOTP = async (email: string) => {
    try {
      const result = await resendOTP(email);
      if (result.success) {
        toast.success('We have sent a new OTP to your email. Please check your inbox!');
      } else {
        toast.error(result.error || 'There was an issue resending the OTP. Please try again.');
      }
      return result;
    } catch (error) {
      toast.error('Something went wrong while resending the OTP. Please try again later.');
      return { success: false, error: 'Failed to resend OTP' };
    }
  };

  // Enhanced logout with toast
  const handleLogout = async () => {
    try {
      await logout();
      toast.success('You have successfully logged out. See you soon!');
    } catch (error) {
      toast.error('We encountered an issue while logging you out. Please try again.');
    }
  };

  // Enhanced profile update with toast
  const handleUpdateUserDetails = async (details: Parameters<typeof updateUserDetails>[0]) => {
    try {
      await updateUserDetails(details);
      toast.success('Your profile has been successfully updated!');
    } catch (error) {
      toast.error('There was an issue updating your profile. Please try again.');
    }
  };

  // Password reset request with toast
  const handleForgotPassword = async (email: string) => {
    try {
      const response = await authService.forgotPassword(email);
      toast.success(response.message || 'A reset code has been sent to your email address.');
      return { success: true };
    } catch (error) {
      toast.error('Unable to send the reset code. Please try again later.');
      return { success: false, error: 'Failed to send reset code' };
    }
  };

  // Reset password with OTP and toast
  const handleResetPassword = async (email: string, otp: string, newPassword: string) => {
    try {
      const response = await authService.resetPassword(email, otp, newPassword);
      toast.success(response.message || 'Your password has been successfully reset.');
      return { success: true };
    } catch (error) {
      toast.error('There was an issue resetting your password. Please try again.');
      return { success: false, error: 'Failed to reset password' };
    }
  };

  return {
    ...state,
    login: handleLogin,
    verifyOTP: handleVerifyOTP,
    resendOTP: handleResendOTP,
    logout: handleLogout,
    updateUserDetails: handleUpdateUserDetails,
    forgotPassword: handleForgotPassword,
    resetPassword: handleResetPassword,
  };
}
