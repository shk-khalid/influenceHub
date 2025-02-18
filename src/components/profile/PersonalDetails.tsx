import { Card } from '../common/Card';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import { TextArea } from '../common/TextArea';
import LanguageSection from './LanguageSection';

interface Language {
  id: string;
  name: string;
  level: 'Native' | 'Fluent' | 'Advanced' | 'Intermediate' | 'Basic';
}

interface PersonalDetailsProps {
  isVerified: boolean;
  languages: Language[];
  onAddLanguage: (language: Language) => void;
  onRemoveLanguage: (id: string) => void;
  isEditing: boolean;
  personalInfo: {
    fullName: string;
    location: string;
    bio: string;
    niche: string;
  };
  onUpdatePersonalInfo: (field: "fullName" | "location" | "bio" | "niche", value: string) => void;
}



export default function PersonalDetails({
  languages,
  onAddLanguage,
  onRemoveLanguage,
  isEditing,
  personalInfo,
  onUpdatePersonalInfo,
}: PersonalDetailsProps) {
  return (
    <Card>
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center gap-2">
        Personal Details
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div>
          {isEditing ? (
            <>
              <Input
                label='Full Name'
                type='text'
                placeholder='Your Name'
                value={personalInfo.fullName}
                onChange={(e) =>
                  onUpdatePersonalInfo('fullName', e.target.value)}
                className="focus:ring-2 focus:ring-[#2563eb] dark:focus:ring-[#facc15] transition-transform duration-200"
              >
              </Input>
            </>
          ) : (
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Full Name</h3>
              <p className="text-gray-700 dark:text-gray-400">{personalInfo.fullName}</p>
            </div>
          )}
        </div>
        {/* Location */}
        <div>
          {isEditing ? (
            <>
              <Input
                label='Location'
                type='text'
                placeholder='City, Country'
                value={personalInfo.location}
                onChange={(e) => onUpdatePersonalInfo('location', e.target.value)}
                className="focus:ring-2 focus:ring-[#2563eb] dark:focus:ring-[#facc15] transition-transform duration-200"
              >
              </Input>
            </>
          ) : (
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Location</h3>
              <p className="text-gray-700 dark:text-gray-400">{personalInfo.location}</p>
            </div>
          )}
        </div>
        {/* Bio */}
        <div className="md:col-span-2">
          {isEditing ? (
            <>
              <TextArea
                rows={4}
                label='Bio'
                placeholder='Tell us your story...'
                maxLength={150}
                helperText={`${personalInfo.bio.length}/150 characters`}
                value={personalInfo.bio}
                onChange={(e) => onUpdatePersonalInfo('bio', e.target.value)}
                className="focus:ring-2 focus:ring-[#2563eb] dark:focus:ring-[#facc15] transition-transform duration-200"
              >
              </TextArea>
            </>
          ) : (
            <div className="prose prose-sm max-w-none dark:prose-invert">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Bio</h3>
              <p className="text-gray-700 dark:text-gray-400">{personalInfo.bio}</p>
            </div>
          )}
        </div>
        {/* Primary Niche */}
        <div>
          {isEditing ? (
            <>
              <Select
                label='Primary Niche'
                value={personalInfo.niche}
                onChange={(e) => onUpdatePersonalInfo('niche', e.target.value)}
                className="focus:ring-2 focus:ring-[#2563eb] dark:focus:ring-[#facc15] transition-transform duration-200"
                options={[
                  { value: "", label: "Select your niche" },
                  { value: "technology", label: "Technology" },
                  { value: "fashion", label: "Fashion & Beauty" },
                  { value: "fitness", label: "Fitness & Health" },
                  { value: "food", label: "Food & Cooking" },
                  { value: "travel", label: "Travel" },
                  { value: "gaming", label: "Gaming" },
                ]}
              >
              </Select>
            </>
          ) : (
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Primary Niche</h3>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 dark:bg-purple-800 text-purple-800 dark:text-purple-200">
                {personalInfo.niche.charAt(0).toUpperCase() + personalInfo.niche.slice(1)}
              </span>
            </div>
          )}
        </div>
        {/* Languages */}
        <div>
          <LanguageSection
            languages={languages}
            onAddLanguage={onAddLanguage}
            onRemoveLanguage={onRemoveLanguage}
            isEditing={isEditing}
          />
        </div>
      </div>
    </Card>
  );
}