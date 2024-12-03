import React, { createContext, useReducer } from 'react';
import type { AuthState, User, AuthContextType } from '../components/types';
import { mockUsers, mockCredentials } from '../data/mockData';

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
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check credentials
      const validPassword = mockCredentials[email as keyof typeof mockCredentials];
      if (!validPassword || validPassword !== password) {
        throw new Error('Invalid credentials');
      }

      // Find user
      const user = mockUsers.find(u => u.email === email);
      if (!user) {
        throw new Error('User not found');
      }

      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: (error as Error).message });
    }
  };

  const signup = async (email: string, password: string, fullName: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Check if email already exists
      if (mockUsers.some(u => u.email === email)) {
        throw new Error('Email already exists');
      }

      const newUser: User = {
        email,
        fullName,
        location: '',
        bio: '',
        socialLinks: {}
      };

      // In a real app, we would save this to a database
      mockUsers.push(newUser);
      (mockCredentials as any)[email] = password;

      dispatch({ type: 'LOGIN_SUCCESS', payload: newUser });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: (error as Error).message });
    }
  };

  const logout = () => {
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