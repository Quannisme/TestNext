"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { motion } from "framer-motion";

interface Invoice {
  id: number;
  clientName: string;
  date: string;
  dueDate: string;
  total: string;
  balance: string;
  status: "Draft" | "Paid" | "Partial Payment";
}

export default function InvoiceTable() {
  const [invoices] = useState<Invoice[]>([
    {
      id: 12,
      clientName: "Thomas Lynol",
      date: "5/11/2019",
      dueDate: "12/11/2019",
      total: "$678.00",
      balance: "$678.00",
      status: "Draft",
    },
    {
      id: 13,
      clientName: "Jason Jemol",
      date: "5/11/2019",
      dueDate: "12/11/2019",
      total: "$245.00",
      balance: "$245.00",
      status: "Paid",
    },
    {
      id: 14,
      clientName: "Michael Serkes",
      date: "5/11/2019",
      dueDate: "12/11/2019",
      total: "$678.00",
      balance: "$678.00",
      status: "Partial Payment",
    },
    {
      id: 15,
      clientName: "Jensen Clark",
      date: "5/11/2019",
      dueDate: "12/11/2019",
      total: "$978.00",
      balance: "$978.00",
      status: "Draft",
    },
  ]);

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
            <Button variant="outline">Create New</Button>
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
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                Invoice #
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                Client name
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                Date
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                Due date
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                Total
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                Balance
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice, index) => (
              <motion.tr
                key={invoice.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="group hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 text-sm text-gray-900">
                  {invoice.id}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {invoice.clientName}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {invoice.date}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {invoice.dueDate}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {invoice.total}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {invoice.balance}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${
                        invoice.status === "Draft"
                          ? "bg-red-100 text-red-800"
                          : ""
                      }
                      ${
                        invoice.status === "Paid"
                          ? "bg-blue-100 text-blue-800"
                          : ""
                      }
                      ${
                        invoice.status === "Partial Payment"
                          ? "bg-purple-100 text-purple-800"
                          : ""
                      }
                    `}
                  >
                    {invoice.status}
                  </span>
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
