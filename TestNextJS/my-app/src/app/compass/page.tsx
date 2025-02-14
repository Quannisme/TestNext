"use client";

import { useState } from "react";
import { LayoutGrid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import JobCard from "@/components/job-card";
import SearchBar from "@/components/search-bar";
import { motion } from "framer-motion";

export type SearchFilters = {
  keyword: string;
  location: string;
  category: string;
};

const jobs = [
  {
    id: 1,
    company: "Reddit",
    logo: "/next.svg",
    title: "Marketing Officer",
    location: "United Kingdom of Great Britain",
    type: "Full Time",
    salary: "$50k-$70k",
    featured: true,
  },
  {
    id: 2,
    company: "Dribbble",
    logo: "/next.svg",
    title: "Senior UX Designer",
    location: "California",
    type: "Full Time",
    salary: "$50k-$60k/month",
    featured: true,
  },
  {
    id: 2,
    company: "Dribbble",
    logo: "/next.svg",
    title: "Senior UX Designer",
    location: "California",
    type: "Full Time",
    salary: "$50k-$60k/month",
    featured: true,
  },
  {
    id: 2,
    company: "Dribbble",
    logo: "/next.svg",
    title: "Senior UX Designer",
    location: "California",
    type: "Full Time",
    salary: "$50k-$60k/month",
    featured: true,
  },
  // Add more job listings...
];

export default function Page() {
  const [viewType, setViewType] = useState<"grid" | "list">("grid");
  const [activeFilters, setActiveFilters] = useState<SearchFilters>({
    keyword: "",
    location: "",
    category: "",
  });

  const handleSearch = (filters: SearchFilters) => {
    setActiveFilters(filters);
  };

  const removeFilter = (key: keyof SearchFilters) => {
    setActiveFilters((prev) => ({
      ...prev,
      [key]: "",
    }));
  };

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto  py-8">
        {/* Breadcrumb */}
        {/* <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <a href="/" className="hover:text-gray-700">
            Home
          </a>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-900">Find Job</span>
        </div> */}

        <div className="mb-8 h-40 bg-[#F1F2F4]">
          {/* <h1 className="text-2xl font-bold mb-6">Find Job</h1> */}
          <SearchBar onSearch={handleSearch} />
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            {Object.entries(activeFilters).map(([key, value]) => {
              if (!value) return null;
              return (
                <Button
                  key={key}
                  variant="outline"
                  size="sm"
                  onClick={() => removeFilter(key as keyof SearchFilters)}
                >
                  {value}
                  <span className="ml-1 text-xs bg-gray-100 px-1.5 py-0.5 rounded">
                    ×
                  </span>
                </Button>
              );
            })}
          </div>

          <div className="flex items-center gap-4">
            <select className="text-sm border rounded-md px-2 py-1.5">
              <option>Latest</option>
              <option>Oldest</option>
            </select>

            <select className="text-sm border rounded-md px-2 py-1.5">
              <option>12 per page</option>
              <option>24 per page</option>
              <option>36 per page</option>
            </select>

            <div className="flex border rounded-md">
              <Button
                variant="ghost"
                size="sm"
                className={`px-2 ${viewType === "grid" ? "bg-gray-100" : ""}`}
                onClick={() => setViewType("grid")}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={`px-2 ${viewType === "list" ? "bg-gray-100" : ""}`}
                onClick={() => setViewType("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <motion.div
          className={`grid gap-6 ${
            viewType === "grid"
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1"
          }`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {jobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <JobCard job={job} viewType={viewType} />
            </motion.div>
          ))}
        </motion.div>

        <div className="flex justify-center mt-8">
          <nav className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full w-10 h-10"
            >
              ←
            </Button>
            {[1, 2, 3, 4, 5].map((page) => (
              <Button
                key={page}
                variant={page === 1 ? "default" : "outline"}
                size="icon"
                className="rounded-full w-10 h-10"
              >
                {page}
              </Button>
            ))}
            <Button
              variant="outline"
              size="icon"
              className="rounded-full w-10 h-10"
            >
              →
            </Button>
          </nav>
        </div>
      </div>
    </main>
  );
}
