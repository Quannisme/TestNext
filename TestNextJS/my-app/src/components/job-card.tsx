import { motion } from "framer-motion";
import Image from "next/image";
import {
  MapPin,
  DollarSign,
  Calendar,
  Bookmark,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
interface JobCardProps {
  job: {
    id: number;
    company: string;
    logo: string;
    title: string;
    location: string;
    type: string;
    salary: string;
    featured?: boolean;
    daysRemaining?: number;
  };
  viewType: "grid" | "list";
}
export default function JobCard({ job, viewType }: JobCardProps) {
  if (viewType === "list") {
    return (
      <motion.div
        className="bg-white rounded-lg border hover:shadow-lg transition-shadow"
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-4 flex-1">
            <div className="w-12 h-12 relative rounded-lg overflow-hidden border flex-shrink-0 bg-gray-50">
              <Image
                src={job.logo || "/placeholder.svg"}
                alt={job.company}
                width={48}
                height={48}
                className="object-contain"
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-lg font-bold">{job.title}</h2>
                <div className="flex gap-2">
                  {job.featured && (
                    <span className="text-xs bg-red-50 text-red-500 px-2 py-1 rounded-full">
                      Featured
                    </span>
                  )}
                  <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
                    {job.type}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4" />
                  <span>{job.salary}</span>
                </div>
                {job.daysRemaining && (
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{job.daysRemaining} Days Remaining</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Bookmark className="h-4 w-4" />
            </Button>
            <Button className="bg-blue-50 hover:bg-blue-100 text-blue-600">
              Apply Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    // <Link href={"/"}>
    <motion.div
      className="bg-white rounded-3xl p-6 border hover:border-[#0A65CC] hover:shadow-lg transition-shadow flex flex-col justify-center "
      style={{ width: "424px", height: "204px" }}
      whileHover={{ y: -5 }}
      // transition={{ duration: 0.2 }}
    >
      <div className="flex items-start justify-between mb-4 ">
        <div className="flex items-start gap-4">
          <div className=" relative rounded-lg overflow-hidden border flex-shrink-0 bg-gray-50">
            <Image
              src={job.logo || "/placeholder.svg"}
              alt={job.company}
              width={48}
              height={48}
              className="object-contain size-14 rounded-sm"
            />
          </div>

          <div className="gap-4">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-medium">{job.company}</h3>
              {job.featured && (
                <span className="text-xs bg-red-50 text-red-500 px-2 py-1 rounded-full">
                  Featured
                </span>
              )}
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <MapPin className="h-4 w-4 mr-1 flex-shrink-0 text-[#939AAD]" />
              <span className=" text-[#939AAD]">{job.location}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-[8px] ">
        <h2 className=" text-blue-600 text-[20px]/[32px] font-medium">
          {job.title}
        </h2>
        <div className="flex items-center gap-2 text-sm text-[#636A80]">
          <span>{job.type}</span>
          <span>•</span>
          <span>{job.salary}</span>
        </div>
      </div>
    </motion.div>
    // </Link>
  );
}
