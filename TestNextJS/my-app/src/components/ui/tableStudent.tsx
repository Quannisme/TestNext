"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import * as service from "../../service/student.service";

export default function InvoiceTable() {
  const [students, setStudents] = useState([]);
  useEffect(() => {
    getAll();
  }, []);
  const getAll = async () => {
    const result = await service.findAll();
    console.log("1", result);

    setStudents(result);
  };
  const deleteStudent = async (id: string) => {
    const result = await service.deleteStudent(id);
    console.log("2", result.message);
    if (result.message === "success") {
      console.log("kakakak");
      toast.success("Deleted Successfully");
    }
    getAll();
  };
  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-8">
      <div className="bg-red-50 rounded-lg p-6 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <h2 className="text-lg font-semibold">All Invoices</h2>
          <div className="flex flex-wrap items-center gap-3">
            <Input
              type="date"
              className="w-[150px]"
              defaultValue="2019-05-11"
            />
            <Input
              type="date"
              className="w-[150px]"
              defaultValue="2019-12-11"
            />
            <Select>
              <option value="all">All Status</option>
              <option value="draft">Draft</option>
              <option value="paid">Paid</option>
              <option value="partial">Partial Payment</option>
            </Select>
          </div>
        </div>
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-wUhd59Res6pFsHh0fYERcPg0n0fZZk.png"
          alt="Decorative illustration"
          className="absolute right-0 top-0 h-full w-auto opacity-10"
        />
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
        <motion.table
          className="w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <thead>
            <tr className="border-b">
              <th className="px-6 py-4 text-center text-sm font-medium text-gray-500">
                Student ID
              </th>
              <th className="px-6 py-4 text-center text-sm font-medium text-gray-500">
                Student name
              </th>
              <th className="px-6 py-4 text-center text-sm font-medium text-gray-500">
                Age
              </th>
              <th className="px-6 py-4 text-center text-sm font-medium text-gray-500">
                Email
              </th>
              <th className="px-6 py-4 text-center text-sm font-medium text-gray-500">
                Courses
              </th>
              <th className="px-6 py-4 text-center text-sm font-medium text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <motion.tr
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="group hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 text-sm text-gray-900 flex items-center justify-center">
                  {student.id}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {student.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {student.age}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {student.email}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {student.courses.map((course, index) => {
                    return (
                      <div
                        key={index}
                        className="flex gap-2 items-center text-gray-500"
                      >
                        {course.id}
                      </div>
                    );
                  })}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  <div className="flex gap-5 items-center justify-center">
                    <Button variant="outline">Update</Button>
                    <Button
                      variant="destructive"
                      onClick={() => deleteStudent(student.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </motion.table>
      </div>

      <div className="flex justify-start items-center">
        <p className="text-sm text-gray-500">Showing 4 invoices</p>
      </div>
    </div>
  );
}
