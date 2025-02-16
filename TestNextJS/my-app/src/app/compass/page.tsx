"use client";

import { useState } from "react";
import { LayoutGrid, List, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import JobCard from "@/components/job-card";
import SearchForm from "@/components/search-bar";
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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Calculate pagination
  const totalPages = Math.ceil(jobs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentJobs = jobs.slice(startIndex, endIndex);

  // Generate page numbers
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  const handleSearch = (filters: SearchFilters) => {
    setActiveFilters(filters);
    setCurrentPage(1);
  };

  const removeFilter = (key: keyof SearchFilters) => {
    setActiveFilters((prev) => ({
      ...prev,
      [key]: "",
    }));
  };

  return (
    <main className="min-h-screen bg-white">
      <SearchForm onSearch={handleSearch} />
      <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-5xl mx-auto mb-6 mt-6 gap-x-8">
        {/* Div bên trái */}
        <div className="flex flex-wrap items-center gap-2">
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

        {/* Div bên phải */}
        <div className="flex flex-wrap items-center gap-4">
          <select className="text-sm border rounded-md px-2 py-1.5 h-[48px] w-[180px]">
            <option>Latest</option>
            <option>Oldest</option>
          </select>

          <select className="text-sm border rounded-md px-2 py-1.5 h-[48px] w-[180px]">
            <option>12 per page</option>
            <option>24 per page</option>
            <option>36 per page</option>
          </select>

          <div className="flex items-center justify-center border rounded-md h-[48px] w-[88px]">
            <Button
              variant="ghost"
              size="sm"
              className={`px-2 h-[32px] w-[32px] ${
                viewType === "grid" ? "bg-gray-100" : ""
              }`}
              onClick={() => setViewType("grid")}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`px-2 h-[32px] w-[32px] ${
                viewType === "list" ? "bg-gray-100" : ""
              }`}
              onClick={() => setViewType("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div
        className={
          viewType === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6"
            : "flex flex-col gap-4"
        }
        style={{
          padding: "0", // Remove any padding
          margin: "0", // Remove any margin
          boxSizing: "border-box", // Include padding and border in the element's total width and height
        }}
      >
        {currentJobs.map((job) => (
          <JobCard key={job.id} job={job} viewType={viewType} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <nav className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full w-10 h-10"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {getPageNumbers().map((page) => (
              <Button
                key={page}
                variant={page === currentPage ? "default" : "outline"}
                size="icon"
                className="rounded-full w-10 h-10"
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Button>
            ))}

            <Button
              variant="outline"
              size="icon"
              className="rounded-full w-10 h-10"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </nav>
        </div>
      )}
    </main>
  );
}
