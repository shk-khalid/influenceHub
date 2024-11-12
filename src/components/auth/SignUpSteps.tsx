import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Instagram, Twitter, Smartphone } from 'lucide-react';
import { Button } from '../common/Button';
import { Input } from '../common/Input';

interface UserTypeOption {
  type: 'influencer' | 'brand';
  title: string;
  description: string;
}

const USER_TYPES: UserTypeOption[] = [
  {
    type: 'influencer',
    title: 'Influencer',
    description: 'Create content and partner with brands',
  },
  {
    type: 'brand',
    title: 'Brand',
    description: 'Find creators and grow your brand',
  },
];

export function UserTypeStep({
  userType,
  onSelectType
}: {
  userType: string | null;
  onSelectType: (type: 'influencer' | 'brand') => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {USER_TYPES.map(({ type, title, description }) => (
        <button
          key={type}
          onClick={() => onSelectType(type)}
          className={`p-6 border rounded-xl text-center hover:border-indigo-600 transition-colors ${userType === type ? 'border-indigo-600 bg-indigo-50' : 'border-gray-200'
            }`}
        >
          <User className="w-8 h-8 mx-auto mb-2 text-indigo-600" />
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        </button>
      ))}
    </div>
  );
}

export function BasicInfoStep({ onNext }: { onNext: () => void }) {
  return (
    <div className="space-y-4">
      <Input
        label="Full Name"
        icon={User}
        type="text"
        placeholder="Enter your full name"
      />
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
        placeholder="Create a password"
      />
      <Button fullWidth onClick={onNext}>
        Continue
      </Button>
    </div>
  );
}

export function SocialConnectionStep() {
  return (
    <div className="space-y-4">
      <Input
        label="Phone Number"
        icon={Smartphone}
        type="tel"
        placeholder="Enter your phone number"
      />

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Connect Social Media
        </label>
        <Button
          fullWidth
          icon={Instagram}
          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:opacity-90"
        >
          Connect Instagram
        </Button>
        <Button
          fullWidth
          icon={Twitter}
          className="bg-blue-500 text-white hover:bg-blue-600"
        >
          Connect Twitter
        </Button>
      </div>

      <Button fullWidth>Complete Registration</Button>
    </div>
  );
}