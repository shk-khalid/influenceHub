import { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../context/AuthContext';

export function useAuth() {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  const { register, login, verifyOTP, resendOTP, forgotPassword, resetPassword, logout, updateUserDetails, ...state } = context;

  // Enhanced registration with toast
  const handleRegister = async (email: string, password: string, fullName: string) => {
    try{
      const result = await register(email, password, fullName);
      if (result.success) {
        toast.success('Registration successful! Please verify your email.');
      } else {
        toast.error(result.error || 'Registration failed.');
      }
      return result;
    } catch (error) {
      toast.error('An error occured during registration');
      return { success: false, error: 'Registration failed' };
    }
  }

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

  const handleForgotPassword = async (email: string) => {
    try {
      const result = await forgotPassword(email);
      if (result.success) {
        toast.success('An OTP has been sent to your email. Please check your inbox.');
      } else {
        toast.error(result.error || 'Failed to send OTP.');
      }
      return result;
    } catch (error) {
      toast.error('An error occurred while sending the OTP. Please try again.');
      return { success: false, error: 'Failed to send OTP' };
    }
  };

  // Enhanced reset password with toast
  const handleResetPassword = async (email: string, otp: string, newPassword: string) => {
    try {
      const result = await resetPassword(email, otp, newPassword);
      if (result.success) {
        toast.success('Your password has been successfully reset!');
      } else {
        toast.error(result.error || 'Failed to reset password.');
      }
      return result;
    } catch (error) {
      toast.error('An error occurred while resetting the password. Please try again.');
      return { success: false, error: 'Failed to reset password' };
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


  return {
    ...state,
    register: handleRegister,
    login: handleLogin,
    verifyOTP: handleVerifyOTP,
    resendOTP: handleResendOTP,
    logout: handleLogout,
    updateUserDetails: handleUpdateUserDetails,
    forgotPassword: handleForgotPassword,
    resetPassword: handleResetPassword,
  };
}
