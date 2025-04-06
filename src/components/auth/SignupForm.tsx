import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useAppSelector } from '../../hooks/useRedux';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Card } from '../common/Card';
import { PasswordStrengthMeter } from './PasswordStrength';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema, type SignupFormData } from '../types/auth';
import DesktopLightLogo from '../../assets/logo/LightLogoOnly.png';
import DesktopDarkLogo from '../../assets/logo/DarkLogoOnly.png';
import { LoadingPulse } from '../common/LoadingPulse';

export function SignupForm() {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const isDarkMode = useAppSelector((state) => state.theme.darkMode);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const password = watch('password');

  const onSubmit = async (data: SignupFormData) => {
    try {
      const result = await registerUser(
        data.userName,
        data.email,
        data.password,
        data.confirmPassword
      );
      // Only redirect if the registration response is 200 OK.
      if (result && result.status === 200) {
        navigate('/login');
      }
    } catch (error) {
      console.error('Registration failed. Please try again.', error);
    }
  };

  if (isSubmitting) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingPulse count={3} sizeClass="w-6 h-6" gapClass="space-x-2" duration={1500} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20">
      {/* Logo Section */}
      <div className="flex items-center justify-center mb-8 space-x-4">
        <img
          src={isDarkMode ? DesktopDarkLogo : DesktopLightLogo}
          alt="Logo"
          className="h-12"
        />
        <span className="hidden lg:block text-2xl font-bold text-gray-900 dark:text-white">
          influenceHub
        </span>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
          Join influenceHub
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-300">
          Create your account to get started
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card className="p-8 shadow-lg rounded-lg bg-white/30 dark:bg-gray-800/30 backdrop-blur-md border border-gray-300/40 dark:border-gray-700/40">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="Email address"
              type="email"
              {...register('email')}
              error={errors.email?.message}
              icon={<Mail className="h-5 w-5 text-gray-400" />}
              className="focus:ring-2 focus:ring-[#2563eb] dark:focus:ring-[#facc15] transition-transform duration-200"
            />

            <Input
              label="User Name"
              type="text"
              {...register('userName')}
              error={errors.userName?.message}
              icon={<User className="h-5 w-5 text-gray-400" />}
              className="focus:ring-2 focus:ring-[#2563eb] dark:focus:ring-[#facc15] transition-transform duration-200"
            />

            <div>
              <Input
                label="Password"
                type="password"
                {...register('password')}
                error={errors.password?.message}
                icon={<Lock className="h-5 w-5 text-gray-400" />}
                className="focus:ring-2 focus:ring-[#2563eb] dark:focus:ring-[#facc15] transition-transform duration-200"
              />
              <PasswordStrengthMeter password={password} />
            </div>

            <Input
              label="Confirm Password"
              type="password"
              {...register('confirmPassword')}
              error={errors.confirmPassword?.message}
              icon={<Lock className="h-5 w-5 text-gray-400" />}
              className="focus:ring-2 focus:ring-[#2563eb] dark:focus:ring-[#facc15] transition-transform duration-200"
            />

            <Button
              type="submit"
              isLoading={isSubmitting}
              icon={<ArrowRight className="h-5 w-5" />}
              className="w-full bg-teal-500 hover:bg-teal-400 dark:bg-rose-500 dark:hover:bg-rose-400 focus:ring-teal-500 dark:focus:ring-rose-400 transition-transform duration-200"
            >
              Create Account
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 text-gray-500 dark:text-gray-400">
                  Already have an account?
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Link to="/login">
                <Button
                  variant="outline"
                  className="w-full border-teal-500 hover:bg-teal-400 focus:ring-teal-500 dark:border-rose-400 dark:hover:bg-rose-500 dark:focus:ring-rose-400 transition-transform duration-200"
                >
                  Sign in instead
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
