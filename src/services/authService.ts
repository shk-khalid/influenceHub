import api from './api';
import { User } from '../components/types/auth';
import { store } from '../hooks/useReduxStore';
import { setUser, clearUser } from '../context/slices/userSlice';

interface RegisterPayload {
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
}

interface LoginPayload {
  email_or_username: string;
  password: string;
}

interface VerifyOTPPayload {
  email: string;
  otp: string;
  action: 'login' | 'forgot_password';
}

interface ResendOTPPayload {
  email: string;
}

interface ResetPasswordPayload {
  email: string;
  new_password: string;
  reset_token: string;
}

export interface AuthResponse {
  message: string;
  redirect?: string;
  token?: string;
  user?: User;
}

export const authService = {
  async register(data: RegisterPayload): Promise<{ status: number; data: AuthResponse }> {
    try {
      const response = await api.post('auth/register/', data);
      return { status: response.status, data: response.data };
    } catch (error: any) {
      throw new Error(error.response?.data?.error || "Registration Failed");
    }
  },

  // Updated login function returning an object with status and data.
  async login(data: LoginPayload): Promise<{ status: number; data: AuthResponse }> {
    try {
      const response = await api.post('auth/login/', data);
      return { status: response.status, data: response.data };
    } catch (error: any) {
      throw new Error(error.response?.data?.error || "Login Failed");
    }
  },

  async verifyOTP(data: VerifyOTPPayload): Promise<AuthResponse> {
    try {
      const response = await api.post('auth/verify-otp/', data);

      if (response.data.token && data.action === 'login') {
        sessionStorage.setItem('token', response.data.token);
        store.dispatch(setUser(response.data.user));
      } else if (response.data.token && data.action === 'forgot_password') {
        sessionStorage.setItem("reset_token", response.data.token);
      }

      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || "OTP Verification Failed");
    }
  },

  async resendOTP(data: ResendOTPPayload): Promise<AuthResponse> {
    const response = await api.post('auth/resend-otp/', data);
    return response.data;
  },

  // Updated forgotPassword to return an object with status and data.
  async forgotPassword(email: string): Promise<{ status: number; data: AuthResponse }> {
    try {
      const response = await api.post('auth/forgot-password/', { email });
      return { status: response.status, data: response.data };
    } catch (error: any) {
      throw new Error(error?.response?.data?.error || "Failed to Initiate Password Reset Request");
    }
  },

  async resetPassword(data: ResetPasswordPayload): Promise<AuthResponse> {
    try {
      const reset_token = sessionStorage.getItem('reset_token');
      if (!reset_token) {
        throw new Error("Reset token not found. Please request a new password reset.");
      }

      const response = await api.post('auth/reset-password/', {
        ...data,
        reset_token,
      });

      sessionStorage.removeItem('reset_token');
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 400) {
        sessionStorage.removeItem("reset_token");
      }
      throw new Error(error?.response?.data?.error || "Password Reset Failed");
    }
  },

  hasValidResetToken(): boolean {
    return !!sessionStorage.getItem("reset_token");
  },

  getCurrentUser(): User | null {
    const userString = sessionStorage.getItem("user");
    return userString ? JSON.parse(userString) : store.getState().user.user;
  },

  getToken(): string | null {
    return sessionStorage.getItem("token");
  },

  async logout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('reset_token');
    sessionStorage.removeItem('user');
    store.dispatch(clearUser());
    await api.get('auth/logout/');
  },

  isAuthenticated(): boolean {
    return !!this.getToken() && !!this.getCurrentUser();
  }
};
