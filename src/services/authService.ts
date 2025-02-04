import api from './api';

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
}

export const authService = {
  // Register new user
  async register(data: RegisterPayload): Promise<AuthResponse> {
    const response = await api.post('auth/register/', data);
    return response.data;
  },

  // Login user
  async login(data: LoginPayload): Promise<AuthResponse> {
    const response = await api.post('auth/login/', data);
    return response.data;
  },

  // Verify OTP
  async verifyOTP(data: VerifyOTPPayload): Promise<AuthResponse> {
    const response = await api.post('auth/verify-otp/', data);
    
    // Store token if login is successful
    if (response.data.token && data.action === 'login') {
      localStorage.setItem('token', response.data.token);
    }
    
    return response.data;
  },

  async resendOTP(data: ResendOTPPayload): Promise<AuthResponse> {
    const response = await api.post('/auth/resend-otp/', data);
    return response.data;
  },

  // Request password reset
  async forgotPassword(email: string): Promise<AuthResponse> {
    const response = await api.post('auth/forgot-password/', { email });
    return response.data;
  },

  // Reset password with new password
  async resetPassword(data: ResetPasswordPayload): Promise<AuthResponse> {
    const response = await api.post('auth/reset-password/', data);
    return response.data;
  },

  // Logout
  async logout() {
    localStorage.removeItem('token');
    await api.get('auth/logout/')
  }
};