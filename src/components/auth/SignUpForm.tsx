import { useState } from 'react';
import { UserTypeStep, BasicInfoStep, SocialConnectionStep } from './SignUpSteps';
import { ProgressBar } from '../common/ProgressBar';

interface SignUpFormProps {
  onSwitchToSignIn: () => void;
}

export function SignUpForm({ onSwitchToSignIn }: SignUpFormProps) {
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState<'influencer' | 'brand' | null>(null);

  const handleUserTypeSelect = (type: 'influencer' | 'brand') => {
    setUserType(type);
    setStep(2);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <UserTypeStep userType={userType} onSelectType={handleUserTypeSelect} />;
      case 2:
        return <BasicInfoStep onNext={() => setStep(3)} />;
      case 3:
        return <SocialConnectionStep />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg w-full">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
        <ProgressBar current={step} total={3} />
      </div>

      {renderStep()}

      {step > 1 && (
        <button
          onClick={() => setStep(step - 1)}
          className="mt-4 text-sm text-gray-600 hover:text-gray-900"
        >
          ← Back to previous step
        </button>
      )}
    </div>
  );
}