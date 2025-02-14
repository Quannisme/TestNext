import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin } from "lucide-react";

interface JobCardProps {
  job: {
    company: string;
    logo: string;
    title: string;
    location: string;
    type: string;
    salary: string;
    featured?: boolean;
  };
  viewType: "grid" | "list";
}

export default function JobCard({ job, viewType }: JobCardProps) {
  return (
    <motion.div
      className={`bg-white rounded-lg p-6 border hover:shadow-lg transition-shadow ${
        viewType === "list" ? "flex gap-6 items-center" : ""
      }`}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <div
        className={`flex items-start gap-4 ${
          viewType === "list" ? "flex-1" : ""
        }`}
      >
        <div className="w-12 h-12 relative rounded-lg overflow-hidden border flex-shrink-0">
          <Image
            src={job.logo || "/placeholder.svg"}
            alt={job.company}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">{job.company}</h3>
            {job.featured && (
              <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded">
                Featured
              </span>
            )}
          </div>

          <h2 className="text-lg font-bold mb-2">{job.title}</h2>

          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="h-4 w-4 mr-1" />
            {job.location}
          </div>

          <div className="flex items-center gap-3 mt-4 text-sm">
            <span className="bg-gray-100 px-3 py-1 rounded">{job.type}</span>
            <span className="text-gray-600">{job.salary}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
