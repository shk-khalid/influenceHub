import { useState } from "react";
import {
  Search,
  Filter,
  Plus,
  SlidersHorizontal,
  ArrowUpDown,
} from "lucide-react";
import CreateCampaignModal from "../modal/CreateCampaign";
import { useCampaign } from "../../../hooks/useCampaign";
import { Button } from "../../common/Button";
import { Input } from "../../common/Input";
import { Select } from "../../common/Select";

export default function SearchBar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showSort, setShowSort] = useState(false);
  const { filters, setFilters } = useCampaign();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ search: e.target.value });
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters({ [key]: value });
  };

  const handleSort = (sortBy: "date" | "budget" | "priority") => {
    setFilters({
      sortBy,
      sortDirection:
        filters.sortBy === sortBy && filters.sortDirection === "desc"
          ? "asc"
          : "desc",
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="Search campaigns..."
              value={filters.search}
              onChange={handleSearch}
              icon={<Search className="h-4 w-4 text-gray-400" />}
              className="focus:ring-2 focus:ring-[#2563eb] dark:focus:ring-[#facc15] transition-transform duration-200"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`p-2 text-gray-400 hover:text-gray-500 focus:outline-none rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 ${
                showFilters ? "bg-gray-100 dark:bg-gray-700" : ""
              }`}
            >
              <Filter className="h-5 w-5" />
            </button>

            <button
              onClick={() => setShowSort(!showSort)}
              className={`p-2 text-gray-400 hover:text-gray-500 focus:outline-none rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 ${
                showSort ? "bg-gray-100 dark:bg-gray-700" : ""
              }`}
            >
              <SlidersHorizontal className="h-5 w-5" />
            </button>
          </div>
        </div>

        <Button
          variant="primary"
          icon={<Plus className="h-5 w-5" />}
          onClick={() => setIsModalOpen(true)}
          className="bg-teal-500 hover:bg-teal-400 dark:bg-rose-500 dark:hover:bg-rose-400 focus:ring-teal-500 dark:focus:ring-rose-400 transition-transform duration-200"
        >
          New Campaign
        </Button>
      </div>

      {showFilters && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              label: "Platform",
              value: filters.platform,
              onChange: (e: React.ChangeEvent<HTMLSelectElement>) =>
                handleFilterChange("platform", e.target.value),
              options: [
                { value: "", label: "All Platforms" },
                { value: "instagram", label: "Instagram" },
                { value: "tiktok", label: "TikTok" },
                { value: "youtube", label: "YouTube" },
              ],
            },
            {
              label: "Priority",
              value: filters.priority,
              onChange: (e: React.ChangeEvent<HTMLSelectElement>) =>
                handleFilterChange("priority", e.target.value),
              options: [
                { value: "", label: "All Priorities" },
                { value: "high", label: "High" },
                { value: "medium", label: "Medium" },
                { value: "low", label: "Low" },
              ],
            },
            {
              label: "Budget Range",
              value: filters.budgetRange,
              onChange: (e: React.ChangeEvent<HTMLSelectElement>) =>
                handleFilterChange("budgetRange", e.target.value),
              options: [
                { value: "", label: "All Budgets" },
                { value: "0-1000", label: "$0 - $1,000" },
                { value: "1000-5000", label: "$1,000 - $5,000" },
                { value: "5000+", label: "$5,000+" },
              ],
            },
          ].map((filter, index) => (
            <Select
              key={index}
              label={filter.label}
              value={filter.value}
              onChange={filter.onChange}
              options={filter.options}
              className="w-full bg-gray-50 dark:bg-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600"
            />
          ))}
        </div>
      )}

      {showSort && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-wrap gap-2">
            {[
              { label: "Date", value: "date" as "date"},
              { label: "Budget", value: "budget" as "budget"},
              { label: "Priority", value: "priority" as "priority"},
            ].map((sortOption) => (
              <button
                key={sortOption.value}
                onClick={() => handleSort(sortOption.value)}
                className={`inline-flex items-center px-3 py-1.5 rounded-md text-sm ${
                  filters.sortBy === sortOption.value
                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
                    : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                }`}
              >
                {sortOption.label}
                {filters.sortBy === sortOption.value && (
                  <ArrowUpDown className="ml-1 h-4 w-4" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      <CreateCampaignModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
