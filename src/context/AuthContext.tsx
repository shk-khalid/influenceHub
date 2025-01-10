import React, { createContext, useReducer, useEffect } from 'react';
import type { AuthState, User, AuthContextType } from '../components/types/auth';
import { authService } from '../services/authService';
import { userService } from '../services/userService';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

type AuthAction =
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: "REGISTER_SUCCESS"; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'UPDATE_USER'; payload: Partial<User> };

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        isLoading: false,
        error: null,
      };
    case 'LOGOUT':
      return {
        ...initialState,
        isLoading: false,
      };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };
    case 'UPDATE_USER':
      return {
        ...state,
        user: state.user ? { ...state.user, ...action.payload } : null,
      };
    default:
      return state;
  }
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check auth status on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const user = await userService.getProfile();
          dispatch({ type: 'LOGIN_SUCCESS', payload: user });
        } catch (error) {
          localStorage.removeItem('token');
          dispatch({ type: 'LOGOUT' });
        }
      } else {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };
    checkAuth();
  }, []);

  const register = async (email: string, password: string, fullName: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await authService.register({ email, password, fullName });
      if (response.success) {
        dispatch({ type: 'REGISTER_SUCCESS', payload: response.message });
        return { success: true, message: response.message };
      } else {
        dispatch({ type: 'SET_ERROR', payload: 'Registration failed' });
        return { success: false, error: 'Registration failed' };
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Registration failed';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  const login = async (email: string, password: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      await authService.login(email, password);
      return { success: true };
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Invalid credentials' });
      return { success: false, error: 'Invalid credentials' };
    }
  };

  const verifyOTP = async (email: string, otp: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await authService.verifyToken(email, otp);
      if (response.token) {
        const user = await userService.getProfile();
        dispatch({ type: 'LOGIN_SUCCESS', payload: user });
        return { success: true };
      }
      return { success: false, error: 'Invalid OTP' };
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Invalid OTP' });
      return { success: false, error: 'Invalid OTP' };
    }
  };

  const resendOTP = async (email: string) => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      await authService.resendOTP(email);
      return { success: true };
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to resend OTP' });
      return { success: false, error: 'Failed to resend OTP' }
    }
  }

  const logout = async () => {
    try {
      await authService.logout();
    } finally {
      dispatch({ type: 'LOGOUT' });
    }
  };

  const updateUserDetails = async (details: Partial<User>) => {
    try {
      const updatedUser = await userService.updateProfile(details);
      dispatch({ type: 'UPDATE_USER', payload: updatedUser });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to update profile' });
    }
  };

  const forgotPassword = async (email: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await authService.forgotPassword(email);
      if ('message' in response) {
        return { success: true, message: response.message };
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.error });
        return { success: false, error: response.error };
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to send OTP';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      return { success: false, error: errorMessage };
    }
  };

  const resetPassword = async (email: string, otp: string, newPassword: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await authService.resetPassword(email, otp, newPassword);
      if ('message' in response) {
        return { success: true, message: response.message };
      } else {
        dispatch({ type: 'SET_ERROR', payload: response.error });
        return { success: false, error: response.error };
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to reset password';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      return { success: false, error: errorMessage };
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
        updateUserDetails,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}