import React, { createContext, useReducer } from 'react';
import axios from 'axios';
import type { AuthState, User, AuthContextType } from '../components/types';
import axiosInstance from '../api/axiosInstance';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
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
      return initialState;
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

  const login = async (email: string, password: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await axiosInstance.post('/auth/login/', { email, password });
      const { user, token } = response.data;

      // Store token locally
      localStorage.setItem('authToken', token);

      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Login failed."
      dispatch({ type: 'SET_ERROR', payload: message})
    }
  };

  const signup = async (email: string, password: string, fullName: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await axiosInstance.post('/auth/register/', { email, password, fullName });
      const { user, token } = response.data;

      // Store token locally
      localStorage.setItem('authToken', token);

      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Signup failed.';
      dispatch({ type: 'SET_ERROR', payload: message });
    }
  };

  const logout = () => {
    // Remove token from localStorage or cookie
    localStorage.removeItem('authToken');
    dispatch({ type: 'LOGOUT' });
  };

  const updateUserDetails = (details: Partial<User>) => {
    dispatch({ type: 'UPDATE_USER', payload: details });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        signup,
        logout,
        updateUserDetails,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
