"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { markAttendance } from "@/services/api";
import type { Employee } from "@/types";

interface AttendanceFormProps {
  employees: Employee[];
  onMarked: () => void;
}

export default function AttendanceForm({
  employees,
  onMarked,
}: AttendanceFormProps) {
  const [employeeId, setEmployeeId] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState<"Present" | "Absent">("Present");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!employeeId || !date) {
      toast.error("Please select an employee and date");
      return;
    }

    setSubmitting(true);
    try {
      await markAttendance({ employeeId, date, status });
      toast.success("Attendance recorded");
      setDate("");
      onMarked();
    } catch {
      toast.error("Failed to record attendance");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border border-gray-200 bg-white p-6"
    >
      <h2 className="mb-4 text-lg font-semibold text-gray-800">
        Mark Attendance
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <select
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none"
        >
          <option value="">Select Employee</option>
          {employees.map((emp) => (
            <option key={emp._id} value={emp.employeeId}>
              {emp.employeeId} — {emp.fullName}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none"
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as "Present" | "Absent")}
          className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none"
        >
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>

        <button
          type="submit"
          disabled={submitting}
          className="rounded-md bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {submitting ? "Saving…" : "Record"}
        </button>
      </div>
    </form>
  );
}
