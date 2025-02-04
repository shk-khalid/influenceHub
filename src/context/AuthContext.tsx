import React, { createContext, useReducer, useEffect } from 'react';
import { authService } from '../services/authService';

interface User {
  email: string;
  username: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface AuthContextType extends AuthState {
  register: (username: string, email: string, password: string, confirmPassword: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  verifyOTP: (email: string, otp: string, action: 'login' | 'forgot_password') => Promise<void>;
  resendOTP: (email: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (email: string, newPassword: string) => Promise<void>;
  logout: () => Promise<void>;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthAction =
  | { type: 'SET_USER'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
      };
    case 'LOGOUT':
      return {
        ...initialState,
        isLoading: false,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch({ type: 'SET_LOADING', payload: false });
      return;
    }
  }, []);

  const register = async (username: string, email: string, password: string, confirmPassword: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      await authService.register({
        username,
        email,
        password,
        password_confirmation: confirmPassword,
      });
      dispatch({ type: 'SET_LOADING', payload: false });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Registration failed' });
      throw error;
    }
  };

  const login = async (email_or_username: string, password: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      await authService.login({
        email_or_username, 
        password
      });
      dispatch({ type: 'SET_LOADING', payload: false });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Login failed' });
      throw error;
    }
  };

  const verifyOTP = async (email: string, otp: string, action: 'login' | 'forgot_password') => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await authService.verifyOTP({
        email,
        otp,
        action,
      });
      
      if (response.token && action === 'login') {
        dispatch({ type: 'SET_USER', payload: { email, username: email } });
      }
      dispatch({ type: 'SET_LOADING', payload: false });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'OTP verification failed' });
      throw error;
    }
  };

  const resendOTP = async (email: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      await authService.resendOTP({email});
      dispatch({ type: 'SET_LOADING', payload: false });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to resend OTP' });
      throw error;
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      await authService.forgotPassword(email);
      dispatch({ type: 'SET_LOADING', payload: false });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to send reset email' });
      throw error;
    }
  };

  const resetPassword = async (email: string, newPassword: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      await authService.resetPassword({ email, new_password: newPassword });
      dispatch({ type: 'SET_LOADING', payload: false });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Password reset failed' });
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      dispatch({ type: 'LOGOUT' });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Logout failed' });
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        register,
        login,
        verifyOTP,
        resendOTP,
        forgotPassword,
        resetPassword,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}