import { Mail, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { GoogleIcon } from '../common/Icons';
import { SocialDivider } from './SocialDivider';

interface SignInFormProps {
  onSwitchToSignUp: () => void;
}

export function SignInForm({ onSwitchToSignUp }: SignInFormProps) {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/signup')
  }

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg w-full">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Welcome back</h2>

      <div className="space-y-4">
        <Button
          variant="social"
          icon={GoogleIcon}
          fullWidth
        >
          Continue with Google
        </Button>

        <SocialDivider />

        <Input
          label="Email"
          icon={Mail}
          type="email"
          placeholder="Enter your email"
        />

        <Input
          label="Password"
          icon={Lock}
          type="password"
          placeholder="Enter your password"
        />

        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <span className="ml-2 text-sm text-gray-600">Remember me</span>
          </label>
          <button className="text-sm text-indigo-600 hover:text-indigo-500">
            Forgot password?
          </button>
        </div>

        <Button fullWidth>Sign in</Button>
      </div>

      <p className="mt-6 text-center text-sm text-gray-600">
        Don't have an account?{' '}
        <button
          onClick={handleClick}
          className="text-indigo-600 hover:text-indigo-500 font-medium"
        >
          Sign up
        </button>
      </p>
    </div>
  );
}