import { Search, Filter } from 'lucide-react';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import { TrendCategory } from '../types';

interface TrendFiltersProps {
  searchTerm: string;
  selectedCategory: TrendCategory;
  onSearchChange: (term: string) => void;
  onCategoryChange: (category: TrendCategory) => void;
}

const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'tech', label: 'Technology' },
    { value: 'fashion', label: 'Fashion' },
    { value: 'fitness', label: 'Fitness' },
    { value: 'travel', label: 'Travel' },
    { value: 'food', label: 'Food' },
    { value: 'gaming', label: 'Gaming' },
  
  ];

export function TrendFilters({
  searchTerm,
  selectedCategory,
  onSearchChange,
  onCategoryChange
}: TrendFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      <Input
        icon={<Search className="w-5 h-5" />}
        placeholder="Search trends..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="flex-1"
      />
      <Select
        icon={<Filter className="w-5 h-5" />}
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value as TrendCategory)}
        options={categories}
        className="md:w-48"
      />
    </div>
  );
}