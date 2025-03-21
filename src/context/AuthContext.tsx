import React, { createContext, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { authService } from '../services/authService';
import { User } from '../components/types/auth';
import { setUser, setLoading, setError, clearUser } from '../slices/userSlice';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  register: (username: string, email: string, password: string, password_confirmation: string) => Promise<void>;
  login: (email_or_username: string, password: string) => Promise<boolean>;
  verifyOTP: (email: string, otp: string, action: 'login' | 'forgot_password') => Promise<void>;
  resendOTP: (email: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<boolean>;
  resetPassword: (email: string, newPassword: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const { user, isLoading, error } = useAppSelector(state => state.user);

  useEffect(() => {
    const token = authService.getToken();
    if (token) {
      const currentUser = authService.getCurrentUser();
      if (currentUser) {
        dispatch(setUser(currentUser));
      }
    }
    dispatch(setLoading(false));
  }, [dispatch]);

  const register = async (
    username: string,
    email: string,
    password: string,
    password_confirmation: string
  ) => {
    try {
      dispatch(setLoading(true));
      await authService.register({
        username,
        email,
        password,
        password_confirmation,
      });
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setError('Registration failed'));
      throw error;
    }
  };

  const login = async (email_or_username: string, password: string) => {
    try {
      dispatch(setLoading(true));
      await authService.login({ email_or_username, password });
      dispatch(setLoading(false));
      return true;
    } catch (error) {
      dispatch(setError('Login failed'));
      return false;
    }
  };

  const verifyOTP = async (email: string, otp: string, action: 'login' | 'forgot_password') => {
    try {
      dispatch(setLoading(true));
      const response = await authService.verifyOTP({ email, otp, action });
      
      if (action === 'login' && response.user) {
        dispatch(setUser(response.user));
      }
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setError('OTP verification failed'));
      throw error;
    }
  };

  const resendOTP = async (email: string) => {
    try {
      dispatch(setLoading(true));
      await authService.resendOTP({ email });
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setError('Failed to resend OTP'));
      throw error;
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      dispatch(setLoading(true));
      await authService.forgotPassword(email);
      dispatch(setLoading(false));
      return true;
    } catch (error) {
      dispatch(setError('Failed to send reset email'));
      return false;
    }
  };

  const resetPassword = async (email: string, newPassword: string) => {
    try {
      dispatch(setLoading(true));
      const reset_token = authService.getToken();
      if (!reset_token) {
        throw new Error('Reset token not found');
      }
      await authService.resetPassword({ email, new_password: newPassword, reset_token });
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setError('Password reset failed'));
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      dispatch(clearUser());
    } catch (error) {
      dispatch(setError('Logout failed'));
      throw error;
    }
  };

  const value = {
    user,
    isAuthenticated: !!user && !!authService.getToken(),
    isLoading,
    error,
    register,
    login,
    verifyOTP,
    resendOTP,
    forgotPassword,
    resetPassword,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}