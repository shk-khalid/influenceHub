import api from './api';
import { User } from '../components/types/auth';

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
}

interface AuthResponse {
  message: string;
  redirect?: string;
  token?: string;
  user?: User;
}

export const authService = {
  async register(data: RegisterPayload): Promise<AuthResponse> {
    return handleRequest(() => api.post('auth/register/', data));
  },

  async login(data: LoginPayload): Promise<AuthResponse> {
    return handleRequest(async () => {
      const response = await api.post('auth/login/', data);
      storeAuthData(response.data);
      return response.data;
    });
  },

  async verifyOTP(data: VerifyOTPPayload): Promise<AuthResponse> {
    return handleRequest(async () => {
      const response = await api.post('auth/verify-otp/', data);

      if (response.data.token) {
        if (data.action === 'login') {
          storeAuthData(response.data);
        } else if (data.action === 'forgot_password') {
          localStorage.setItem('reset_token', response.data.token);
        }
      }
      return response.data;
    });
  },

  async resendOTP(data: ResendOTPPayload): Promise<AuthResponse> {
    return handleRequest(() => api.post('auth/resend-otp/', data));
  },

  async forgotPassword(email: string): Promise<AuthResponse> {
    return handleRequest(() => api.post('auth/forgot-password/', { email }));
  },

  async resetPassword(data: ResetPasswordPayload): Promise<AuthResponse> {
    return handleRequest(async () => {
      const reset_token = localStorage.getItem('reset_token');
      if (!reset_token) throw new Error('Reset token not found. Please request a new password reset.');

      const response = await api.post('auth/reset-password/', { ...data, reset_token });

      localStorage.removeItem('reset_token');
      return response.data;
    });
  },

  async logout() {
    try {
      await api.post('auth/logout/');
    } finally {
      clearAuthData();
    }
  },

  hasValidResetToken(): boolean {
    return !!localStorage.getItem('reset_token');
  },

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  getToken(): string | null {
    return localStorage.getItem('token');
  },

  isAuthenticated(): boolean {
    return !!this.getToken();
  },
};

function storeAuthData(data: AuthResponse) {
  if (data.token) localStorage.setItem('token', data.token);
  if (data.user) localStorage.setItem('user', JSON.stringify(data.user));
}

function clearAuthData() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('reset_token');
}

async function handleRequest(request: () => Promise<any>): Promise<AuthResponse> {
  try {
    return await request();
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'An unexpected error occurred');
  }
}
