import { CheckCircle2 } from 'lucide-react';

interface ProfileHeaderProps {
  personalInfo : {
    fullName: String;
  }
  isVerified: boolean;
}

export default function ProfileHeader({ isVerified, personalInfo }: ProfileHeaderProps) {
  return (
    <div className="text-center space-y-4">
      <div className="flex items-center justify-center gap-2">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
        {personalInfo.fullName}
        </h1>
        {isVerified && (
          <CheckCircle2 className="w-8 h-8 text-blue-500" />
        )}
      </div>
    </div>
  );
}