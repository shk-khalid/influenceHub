import { useState } from 'react';
import { AuthState, AuthFormData } from '../components/types';
import toast from 'react-hot-toast';

const initialState: AuthState = {
  isLoading: false,
  error: null,
  isAuthenticated: false,
  requiresTwoFactor: false,
  user: null,
};

export function useAuth() {
  const [state, setState] = useState<AuthState>(initialState);

  const login = async (data: AuthFormData) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate 2FA requirement
      if (!data.code && data.email.includes('2fa')) {
        setState(prev => ({
          ...prev,
          isLoading: false,
          requiresTwoFactor: true,
        }));
        return;
      }

      setState(prev => ({
        ...prev,
        isLoading: false,
        isAuthenticated: true,
        user: {
          id: '1',
          email: data.email,
          name: 'John Doe',
        },
      }));
      toast.success('Successfully logged in!');
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Invalid credentials',
      }));
      toast.error('Login failed. Please try again.');
    }
  };

  const register = async (data: AuthFormData) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Registration successful! Please check your email to verify your account.');
      setState(prev => ({ ...prev, isLoading: false }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Registration failed',
      }));
      toast.error('Registration failed. Please try again.');
    }
  };

  const resetPassword = async (email: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Password reset instructions sent to your email!');
      setState(prev => ({ ...prev, isLoading: false }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Password reset failed',
      }));
      toast.error('Password reset failed. Please try again.');
    }
  };

  return {
    ...state,
    login,
    register,
    resetPassword,
  };
}