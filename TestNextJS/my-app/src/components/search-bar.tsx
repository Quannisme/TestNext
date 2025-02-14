"use client";

import { useState, type FormEvent } from "react";
import { Search, MapPin, Filter, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchFilters } from "../types/course";

interface SearchBarProps {
  onSearch: (filters: SearchFilters) => void;
}
export default function SearchBar({ onSearch }: SearchBarProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    keyword: "",
    location: "",
    category: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(filters);
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Find Job</h1>
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <a href="/" className="hover:text-gray-700">
            Home
          </a>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-900">Find Job</span>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row gap-4 "
      >
        <div className="flex-1 relative ">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Job title, keyword..."
            className="pl-10 bg-white"
            value={filters.keyword}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, keyword: e.target.value }))
            }
          />
        </div>

        <div className="flex-1 relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Location"
            className="pl-10 bg-white"
            value={filters.location}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, location: e.target.value }))
            }
          />
        </div>

        <div className="flex-1">
          <select
            className="w-full h-10 rounded-md border bg-white px-3 py-2 appearance-none"
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
        </div>

        <div className="flex gap-2">
          <Button type="button" variant="outline" className="bg-white">
            <Filter className="h-4 w-4 mr-2" />
            Advance Filter
          </Button>
          <Button type="submit">Find Job</Button>
        </div>
      </form>
    </div>
  );
}
