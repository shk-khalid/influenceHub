import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface FilterPanelProps {
  selectedRegion: string;
  onRegionChange: (region: string) => void;
  onClose: () => void;
}

const regions = [
  { id: 'all', label: 'All Regions' },
  { id: 'na', label: 'North America' },
  { id: 'eu', label: 'Europe' },
  { id: 'asia', label: 'Asia' },
  { id: 'other', label: 'Other' },
];

export default function FilterPanel({ selectedRegion, onRegionChange, onClose }: FilterPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      className="absolute top-full right-0 mt-4 w-72 bg-white/90 dark:bg-gray-800/90 
                backdrop-blur-xl rounded-2xl shadow-xl p-6 border border-gray-200 
                dark:border-gray-700"
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold gradient-text">Filters</h3>
        <motion.button 
          onClick={onClose} 
          className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300
                   p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <X className="w-4 h-4" />
        </motion.button>
      </div>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Region
          </label>
          <div className="space-y-3">
            {regions.map((region) => (
              <motion.label 
                key={region.id} 
                className="flex items-center p-3 rounded-xl cursor-pointer
                         hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                whileHover={{ x: 4 }}
              >
                <input
                  type="radio"
                  name="region"
                  value={region.id}
                  checked={selectedRegion === region.id}
                  onChange={(e) => onRegionChange(e.target.value)}
                  className="form-radio h-4 w-4 text-indigo-600 border-gray-300 
                           dark:border-gray-600 focus:ring-indigo-500"
                />
                <span className="ml-3 text-sm text-gray-700 dark:text-gray-300">
                  {region.label}
                </span>
              </motion.label>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}