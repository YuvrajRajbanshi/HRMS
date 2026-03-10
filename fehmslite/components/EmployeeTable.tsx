"use client";

import toast from "react-hot-toast";
import { deleteEmployee } from "@/services/api";
import type { Employee } from "@/types";

interface EmployeeTableProps {
  employees: Employee[];
  onDeleted: () => void;
}

export default function EmployeeTable({
  employees,
  onDeleted,
}: EmployeeTableProps) {
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this employee?")) return;

    try {
      await deleteEmployee(id);
      toast.success("Employee deleted");
      onDeleted();
    } catch {
      toast.error("Failed to delete employee");
    }
  };

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
      <table className="w-full text-left text-sm text-gray-900">
        <thead className="border-b border-gray-200 bg-gray-50 text-xs uppercase text-gray-600">
          <tr>
            <th className="px-4 py-3">Employee ID</th>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Email</th>
            <th className="px-4 py-3">Department</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {employees.map((emp) => (
            <tr key={emp._id} className="hover:bg-gray-50">
              <td className="px-4 py-3 font-medium text-gray-800">
                {emp.employeeId}
              </td>
              <td className="px-4 py-3 text-gray-900">{emp.fullName}</td>
              <td className="px-4 py-3 text-gray-700">{emp.email}</td>
              <td className="px-4 py-3 text-gray-900">{emp.department}</td>
              <td className="px-4 py-3 text-right">
                <button
                  onClick={() => handleDelete(emp._id)}
                  className="rounded-md bg-red-50 px-3 py-1 text-xs font-medium text-red-600 hover:bg-red-100"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
