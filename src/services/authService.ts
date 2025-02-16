import api from './api';
import { User } from '../components/types/auth'

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

interface AuthResponse {
  message: string;
  redirect?: string;
  token?: string;
  user?: User;
}

export const authService = {
  // Register new user
  async register(data: RegisterPayload): Promise<AuthResponse> {
    try {
      const response = await api.post('auth/register/', data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || "Registration Failed");
    }
  },

  // Login user
  async login(data: LoginPayload): Promise<AuthResponse> {
    try {
      const response = await api.post('auth/login/', data);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || "Login Failed")
    }

  },

  // Verify OTP
  async verifyOTP(data: VerifyOTPPayload): Promise<AuthResponse> {
    try {
      const response = await api.post('auth/verify-otp/', data);

      // Store token if login is successful
      if (response.data.token && data.action === 'login') {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      } else if (response.data.token && data.action === 'forgot_password'){
        localStorage.setItem("reset_token", response.data.token)
      }

      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || "OTP Verification Failed")
    }
  },

  async resendOTP(data: ResendOTPPayload): Promise<AuthResponse> {
    const response = await api.post('/auth/resend-otp/', data);
    return response.data;
  },

  // Request password reset
  async forgotPassword(email: string): Promise<AuthResponse> {
    try {
      const response = await api.post('auth/forgot-password/', { email });
      return response.data;
    } catch (error: any) {
      throw new Error(error?.response?.data?.error || "Failed to Initiate Password Reset Request")
    }
  },

  // Reset password with new password and token
  async resetPassword(data: ResetPasswordPayload): Promise<AuthResponse> {
    try {
      const reset_token = localStorage.getItem('reset_token');
      if (!reset_token) {
        throw new Error("Reset token not found. Please request a new password reset.");
      }

      const response = await api.post('auth/reset-password/', {
        ...data,
        reset_token,
      });

      // Clear the reset token after successful password reset
      localStorage.removeItem(reset_token)
      return response.data;
    } catch (error: any) {
      // Clear invalid reset token
      if (error.response?.status === 400) {
        localStorage.removeItem("reset_token");
      }
      throw new Error(error?.response?.data?.error || "Password Reset Failed")
    }
  },

  // Verify if a valid reset token exists
  hasValidResetToken(): boolean {
    return !!localStorage.getItem("reset_token");
  },

  // Get current user from localStorage
  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null; 
  },

  getToken(): string | null {
    return localStorage.getItem("token");
  },


  // Logout
  async logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('reset_token');
    await api.get('auth/logout/')
  },
  
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
};