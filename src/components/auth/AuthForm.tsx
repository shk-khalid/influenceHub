import React, { useState } from 'react';
import { z } from 'zod';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { SocialLogin } from './SocialLogin';
import { useAuth } from '../../hooks/UseAuth';
import { KeyRound, Mail, ArrowLeft } from 'lucide-react';

const schema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  code: z.string().optional(),
});

type FormType = 'login' | 'register' | 'forgot-password' | '2fa';

export function AuthForms() {
  const [formType, setFormType] = useState<FormType>('login');
  const [formData, setFormData] = useState({ email: '', password: '', code: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isAnimating, setIsAnimating] = useState(false);
  
  const { isLoading, login, register, resetPassword, requiresTwoFactor } = useAuth();

  const handleFormTypeChange = (newType: FormType) => {
    setIsAnimating(true);
    setTimeout(() => {
      setFormType(newType);
      setIsAnimating(false);
    }, 300);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      schema.parse(formData);
      
      switch (formType) {
        case 'login':
          await login(formData);
          break;
        case 'register':
          await register(formData);
          break;
        case 'forgot-password':
          await resetPassword(formData.email);
          break;
        case '2fa':
          await login(formData);
          break;
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path) {
            newErrors[err.path[0]] = err.message;
          }
        });
        setErrors(newErrors);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className={`space-y-6 transition-opacity duration-300 ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
          {formType === 'login' && 'Welcome back'}
          {formType === 'register' && 'Create your account'}
          {formType === 'forgot-password' && 'Reset your password'}
          {formType === '2fa' && 'Two-factor authentication'}
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          {formType === 'login' && 'Sign in to your account to continue'}
          {formType === 'register' && 'Join thousands of influencers and brands'}
          {formType === 'forgot-password' && 'Enter your email to receive reset instructions'}
          {formType === '2fa' && 'Enter the code from your authenticator app'}
        </p>
      </div>

      {formType !== '2fa' && <SocialLogin />}

      <form onSubmit={handleSubmit} className="space-y-4">
        {formType === 'forgot-password' && (
          <button
            type="button"
            onClick={() => handleFormTypeChange('login')}
            className="flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to login
          </button>
        )}

        <Input
          label="Email"
          name="email"
          type="email"
          icon={<Mail className="w-5 h-5" />}
          placeholder="name@example.com"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />

        {(formType === 'login' || formType === 'register') && (
          <Input
            label="Password"
            name="password"
            type="password"
            icon={<KeyRound className="w-5 h-5" />}
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />
        )}

        {formType === '2fa' && (
          <Input
            label="Authentication Code"
            name="code"
            type="text"
            placeholder="Enter 6-digit code"
            value={formData.code}
            onChange={handleChange}
            error={errors.code}
          />
        )}

        {formType === 'login' && (
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
            <button
              type="button"
              onClick={() => handleFormTypeChange('forgot-password')}
              className="text-sm text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
            >
              Forgot password?
            </button>
          </div>
        )}

        <Button type="submit" fullWidth isLoading={isLoading}>
          {formType === 'login' && 'Sign In'}
          {formType === 'register' && 'Create Account'}
          {formType === 'forgot-password' && 'Reset Password'}
          {formType === '2fa' && 'Verify Code'}
        </Button>

        <div className="text-center">
          {formType === 'login' ? (
            <button
              type="button"
              onClick={() => handleFormTypeChange('register')}
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              Don't have an account? <span className="text-indigo-600">Sign up</span>
            </button>
          ) : formType === 'register' ? (
            <button
              type="button"
              onClick={() => handleFormTypeChange('login')}
              className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              Already have an account? <span className="text-indigo-600">Sign in</span>
            </button>
          ) : null}
        </div>
      </form>
    </div>
  );
}