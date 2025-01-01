import api from './api';

export interface LoginResponse {
  message: string;
  redirect?: string;
  token?: string;
}

export interface AuthError {
  error: string;
}

export const authService = {
  // Login flow
  async login(email: string, password: string): Promise<LoginResponse> {
    const response = await api.post('/auth/login/', { email, password });
    return response.data;
  },

  // Verify OTP
  async verifyOTP(email: string, otp: string): Promise<LoginResponse> {
    const response = await api.post('/auth/verify-otp/', { email, otp });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  // Register
  async register(data: { email: string; password: string; fullName: string }) {
    const response = await api.post('/auth/register/', data);
    return response.data;
  },

  // Forgot password
  async forgotPassword(email: string) {
    const response = await api.post('/auth/forgot-password/', { email });
    return response.data;
  },

  // Reset password
  async resetPassword(email: string, otp: string, newPassword: string) {
    const response = await api.post('/auth/reset-password/', {
      email,
      otp,
      new_password: newPassword,
    });
    return response.data;
  },

  // Logout
  async logout() {
    localStorage.removeItem('token');
    await api.get('/auth/logout/');
  },
};