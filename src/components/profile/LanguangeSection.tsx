import { useState } from 'react';
import Badge from '../common/Badge';
import { Plus, X } from 'lucide-react';
import { Button } from '../common/Button';

interface Language {
  id: string;
  name: string;
  level: 'Native' | 'Fluent' | 'Advanced' | 'Intermediate' | 'Basic';
}

interface LanguageSectionProps {
  languages: Language[];
  onAddLanguage: (language: Language) => void;
  onRemoveLanguage: (id: string) => void;
  isEditing: boolean;
}

const LANGUAGE_OPTIONS = [
  'English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 
  'Chinese', 'Japanese', 'Korean', 'Russian', 'Arabic', 'Hindi'
];

const PROFICIENCY_LEVELS: Array<Language['level']> = [
  'Native', 'Fluent', 'Advanced', 'Intermediate', 'Basic'
];

const BADGE_COLORS: Record<Language['level'], 'purple' | 'blue' | 'green' | 'yellow' | 'gray'> = {
  Native: 'purple',
  Fluent: 'blue',
  Advanced: 'green',
  Intermediate: 'yellow',
  Basic: 'gray'
};

export default function LanguageSection({ languages, onAddLanguage, onRemoveLanguage, isEditing }: LanguageSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<Language['level']>('Intermediate');

  const handleAddLanguage = () => {
    if (selectedLanguage) {
      onAddLanguage({
        id: Math.random().toString(36).substr(2, 9),
        name: selectedLanguage,
        level: selectedLevel
      });
      setSelectedLanguage('');
      setSelectedLevel('Intermediate');
      setIsModalOpen(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="block text-lg font-medium text-gray-800 dark:text-gray-100">
          Languages
        </label>
        {isEditing && (
          <Button
            variant="secondary"
            icon={<Plus className='w-5 h-5' />}
            onClick={() => setIsModalOpen(true)}
            className="text-sm py-1.5 px-3"
          >
            Add Language
          </Button>
        )}
      </div>

      <div className="min-h-[4rem] p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600">
        {languages.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-sm text-center">
            Add languages you speak
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {languages.map((lang) => (
              <div
                key={lang.id}
                className="group relative inline-flex items-center animate-fadeIn"
              >
                <Badge color={BADGE_COLORS[lang.level]}>
                  {lang.name} ({lang.level})
                </Badge>
                {isEditing && (
                  <button
                    onClick={() => onRemoveLanguage(lang.id)}
                    className="absolute -top-2 -right-2 bg-gray-50 dark:bg-gray-900 rounded-full p-0.5 shadow-sm 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-200
                      hover:bg-red-50 dark:hover:bg-red-900"
                  >
                    <X className="w-3 h-3 text-red-500" />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 rounded-lg p-6 w-full max-w-md shadow-xl transform transition-all">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Add Language
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-lg font-medium text-gray-800 dark:text-gray-100 mb-3">
                  Language
                </label>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="w-full p-2 rounded-lg border-gray-300 dark:border-gray-700 dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm 
                    focus:border-purple-500 focus:ring-purple-500 transition-colors"
                >
                  <option value="">Select a language</option>
                  {LANGUAGE_OPTIONS.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-lg font-medium text-gray-800 dark:text-gray-100 mb-3">
                  Proficiency Level
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {PROFICIENCY_LEVELS.map((level) => (
                    <label
                      key={level}
                      className={`relative flex items-center justify-center p-2 rounded-lg border-2 cursor-pointer
                        transition-all duration-200 ${
                          selectedLevel === level
                            ? 'border-purple-500 bg-purple-50 dark:bg-purple-900'
                            : 'border-gray-200 dark:border-gray-700 hover:border-purple-200 dark:hover:border-purple-700'
                        }`}
                    >
                      <input
                        type="radio"
                        className="absolute opacity-0"
                        checked={selectedLevel === level}
                        onChange={() => setSelectedLevel(level)}
                      />
                      <span className="text-lg text-gray-900 dark:text-gray-100">
                        {level}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <Button
                variant="secondary"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleAddLanguage}
                disabled={!selectedLanguage}
              >
                Add Language
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
