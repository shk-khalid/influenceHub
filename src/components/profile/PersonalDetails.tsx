import { Card } from '../common/Card';
import Toggle from '../common/Toggle';
import LanguageSection from './LanguangeSection';

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
              <label className="block text-lg font-medium text-gray-700 dark:text-gray-300">Full Name</label>
              <input
                type="text"
                className="mt-1 block w-full p-2 rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 shadow-sm 
                  focus:border-purple-500 focus:ring-purple-500 transition-colors"
                placeholder="Your Name"
                value={personalInfo.fullName}
                onChange={(e) => onUpdatePersonalInfo('fullName', e.target.value)}
              />
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
              <label className="block text-lg font-medium text-gray-700 dark:text-gray-300">Location</label>
              <input
                type="text"
                className="mt-1 block w-full p-2 rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 shadow-sm 
                  focus:border-purple-500 focus:ring-purple-500 transition-colors"
                placeholder="City, Country"
                value={personalInfo.location}
                onChange={(e) => onUpdatePersonalInfo('location', e.target.value)}
              />
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
              <label className="block text-lg font-medium text-gray-700 dark:text-gray-300">Bio</label>
              <textarea
                rows={4}
                className="mt-1 block w-full p-2 rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 shadow-sm 
                  focus:border-purple-500 focus:ring-purple-500 transition-colors"
                placeholder="Tell your story..."
                value={personalInfo.bio}
                onChange={(e) => onUpdatePersonalInfo('bio', e.target.value)}
              />
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
              <label className="block text-lg font-medium text-gray-700 dark:text-gray-300">Primary Niche</label>
              <select
                className="mt-1 block w-full p-2 rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 shadow-sm 
                  focus:border-purple-500 focus:ring-purple-500 transition-colors"
                value={personalInfo.niche}
                onChange={(e) => onUpdatePersonalInfo('niche', e.target.value)}
              >
                <option value="">Select your niche</option>
                <option value="lifestyle">Lifestyle</option>
                <option value="tech">Technology</option>
                <option value="fashion">Fashion & Beauty</option>
                <option value="fitness">Fitness & Health</option>
                <option value="food">Food & Cooking</option>
                <option value="travel">Travel</option>
                <option value="gaming">Gaming</option>
                <option value="education">Education</option>
              </select>
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
              <label className="block text-lg font-medium text-gray-700 dark:text-gray-300">Custom URL</label>
              <div className="mt-1 flex rounded-lg shadow-sm">
                <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 sm:text-sm">
                  portfoliohub.com/
                </span>
                <input
                  type="text"
                  value={customUrl}
                  onChange={(e) => setCustomUrl(e.target.value)}
                  className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-lg border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 
                    focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  placeholder="your-unique-handle"
                />
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
                <button
                  key={campaign}
                  className={`px-3 py-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 
                    ${
                      selectedCampaigns.includes(campaign)
                        ? 'text-purple-800 dark:text-purple-200 bg-purple-100 dark:bg-purple-700'
                        : 'text-gray-700 dark:text-gray-400'
                    } hover:border-purple-500 transition`}
                  onClick={() =>
                    selectedCampaigns.includes(campaign)
                      ? setSelectedCampaigns(selectedCampaigns.filter((item) => item !== campaign))
                      : setSelectedCampaigns([...selectedCampaigns, campaign])
                  }
                >
                  {campaign}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
