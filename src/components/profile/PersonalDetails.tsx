import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import { TextArea } from '../common/TextArea';
import Toggle from '../common/Toggle';
import LanguageSection from './LanguageSection';

interface Language {
  id: string;
  name: string;
  level: 'Native' | 'Fluent' | 'Advanced' | 'Intermediate' | 'Basic';
}

interface PersonalDetailsProps {
  isVerified: boolean;
  isAvailableForCollabs: boolean;
  setIsAvailableForCollabs: (value: boolean) => void;
  customUrl: string;
  setCustomUrl: (value: string) => void;
  selectedCampaigns: string[];
  setSelectedCampaigns: (campaigns: string[]) => void;
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

const campaignTypes = [
  'Product Reviews',
  'Brand Ambassadorship',
  'Sponsored Content',
  'Event Coverage',
  'Social Media Takeover',
  'Tutorial/How-to Content',
];

export default function PersonalDetails({
  isAvailableForCollabs,
  setIsAvailableForCollabs,
  customUrl,
  setCustomUrl,
  selectedCampaigns,
  setSelectedCampaigns,
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
                  { value: "lifestyle", label: "Lifestyle" },
                  { value: "tech", label: "Technology" },
                  { value: "fashion", label: "Fashion & Beauty" },
                  { value: "fitness", label: "Fitness & Health" },
                  { value: "food", label: "Food & Cooking" },
                  { value: "travel", label: "Travel" },
                  { value: "gaming", label: "Gaming" },
                  { value: "education", label: "Education" }
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
        {/* Custom URL */}
        <div className="md:col-span-2">
          {isEditing ? (
            <>
              <label className="block text-base font-medium text-gray-700 dark:text-gray-300">Custom URL</label>
              <div className="mt-1 flex rounded-lg shadow-sm">
                <span className="inline-flex items-center px-3 rounded-l-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 sm:text-sm">
                  portfoliohub.com/
                </span>
                <Input
                  type='text'
                  placeholder='your-unique-url'
                  value={customUrl}
                  onChange={(e) => setCustomUrl(e.target.value)}
                  className="focus:ring-2 focus:ring-[#2563eb] dark:focus:ring-[#facc15] transition-transform duration-200"
                >
                </Input>
              </div>
            </>
          ) : (
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Profile URL</h3>
              <a
                href={`https://influencehub.com/${customUrl}`}
                className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                influencehub.com/{customUrl}
              </a>
            </div>
          )}
        </div>
        {/* Collaboration Toggle */}
        <div className="md:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Available for Collaborations</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Let brands know if you're currently accepting new partnerships
              </p>
            </div>
            <Toggle
              enabled={isAvailableForCollabs}
              onChange={setIsAvailableForCollabs}
              className="ml-4"
              disabled={!isEditing}
            />
          </div>
        </div>
        {/* Campaign Preferences */}
        {isEditing && (
          <div className="md:col-span-2">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Preferred Campaign Types</h3>
            <div className="flex flex-wrap gap-3">
              {campaignTypes.map((campaign) => (
                <Button
                  key={campaign}
                  variant={selectedCampaigns.includes(campaign) ? 'primary' : 'outline'}
                  onClick={() =>
                    selectedCampaigns.includes(campaign)
                      ? setSelectedCampaigns(selectedCampaigns.filter((item) => item !== campaign))
                      : setSelectedCampaigns([...selectedCampaigns, campaign])
                  }
                  className={`${selectedCampaigns.includes(campaign) 
                    ? 'bg-teal-500 hover:bg-teal-400 dark:bg-rose-500 dark:hover:bg-rose-400 focus:ring-teal-500 dark:focus:ring-rose-400' 
                    : 'border-teal-500 hover:bg-teal-400 focus:ring-teal-500 dark:border-rose-400 dark:hover:bg-rose-500 dark:focus:ring-rose-400'
                    } transition-transform duration-200`}
                >
                  {campaign}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
