export interface User {
    email: string;
    fullName: string;
    location?: string;
    bio?: string;
    socialLinks?: {
      instagram?: string;
      twitter?: string;
      youtube?: string;
    };
    isEmailVerified?: boolean;
    isAdminVerified?: boolean;
  }
  
  export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
  }
  
  export interface TwoFactorAuthProps {
    isOpen: boolean;
    onClose: () => void;
    onVerify: (code: string) => void;
    email: string;
  }
  
  export interface AuthContextType extends AuthState {
    login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
    verifyOTP: (email: string, otp: string) => Promise<{ success: boolean; error?: string }>;
    logout: () => Promise<void>;
    updateUserDetails: (details: Partial<User>) => Promise<void>;
  }