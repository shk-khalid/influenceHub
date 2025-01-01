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
      const response = await authService.verifyOTP(email, otp);
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

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        verifyOTP,
        logout,
        updateUserDetails,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}