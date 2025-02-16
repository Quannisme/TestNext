"use client";

import type React from "react";

import { useState } from "react";
import {
  Search,
  MapPin,
  ChevronDown,
  ChartBarStacked,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export type SearchFilters = {
  keyword: string;
  location: string;
  category: string;
};

interface SearchFormProps {
  onSearch: (filters: SearchFilters) => void;
}

export default function SearchForm({ onSearch }: SearchFormProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    keyword: "",
    location: "",
    category: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(filters);
  };
  return (
    <div className="w-full bg-[#F1F2F4]">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[1320px] p-4 flex flex-col mx-auto pb-[32px]"
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <h1 className="text-[18px]/[28px]">Find Job</h1>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <a href="/" className="hover:text-gray-700">
              Home
            </a>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900">Find Job</span>
          </div>
        </div>
        <div className="flex flex-wrap w-full ">
          {/* Job Titile Input */}
          <div className="relative flex-1 min-w-[250px] md:min-w-[375px]">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 ">
              <Search className="h-4 w-4 text-[#0066FF]" />
            </div>
            <input
              type="text"
              placeholder="Job title, Keyword..."
              className="w-full h-[56px] pl-10 pr-4 border-r border-[#F1F2F4] focus:outline-none rounded-l-lg text-[156px]-[24px]"
              value={filters.keyword}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, keyword: e.target.value }))
              }
            />
          </div>

          {/* Location Input */}
          <div className="relative flex-1 min-w-[250px] md:min-w-[300px]">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <MapPin className="h-4 w-4 text-[#0066FF]" />
            </div>
            <input
              type="text"
              placeholder="Location"
              className="w-full h-[56px] pl-10 pr-4 border-r border-[#F1F2F4] focus:outline-none text-[66px]-[24px]"
              value={filters.location}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, location: e.target.value }))
              }
            />
          </div>

          {/* Select Category */}
          <div className="relative flex-1 min-w-[250px] md:min-w-[300px]">
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <ChartBarStacked className="h-4 w-4 text-[#0066FF]" />
            </div>
            <select
              className="w-full h-[56px] pl-10 pr-4 appearance-none text-[#9199A3] border-r border-[#F1F2F4] focus:outline-none text-[122px]-[24px]"
              value={filters.category}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, category: e.target.value }))
              }
            >
              <option value="">Select Category</option>
              <option value="Design">Design</option>
              <option value="Development">Development</option>
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </div>
          </div>

          {/* Advance Filter */}
          <div className="relative flex-1 min-w-[250px] md:min-w-[178px]">
            <select
              className="w-full h-[56px] pl-10 pr-4 appearance-none text-[#9199A3] focus:outline-none rounded-r-lg text-[110px]-[24px]"
              value={filters.category}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, advanced: e.target.value }))
              }
            >
              <option value="">Advance Filter</option>
              <option value="Remote">Remote</option>
              <option value="Part-time">Part-time</option>
              <option value="Full-time">Full-time</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </div>
          </div>

          {/* Button Find Job */}
          <div className="relative flex-1 min-w-[250px]  md:min-w-[131px] max-w-[131px] pl-3">
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white w-full h-[56px] rounded-sm text-[16px]"
            >
              Find Job
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
