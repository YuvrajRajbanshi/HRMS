"use client";

import { useEffect, useState, useCallback } from "react";
import { getEmployees, getAttendance } from "@/services/api";
import type { Employee, AttendanceRecord } from "@/types";
import AttendanceForm from "@/components/AttendanceForm";
import AttendanceTable from "@/components/AttendanceTable";
import Loader from "@/components/Loader";
import EmptyState from "@/components/EmptyState";
import ErrorMessage from "@/components/ErrorMessage";

export default function AttendancePage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [loadingEmp, setLoadingEmp] = useState(true);
  const [loadingRec, setLoadingRec] = useState(false);
  const [error, setError] = useState("");

  const fetchEmployees = useCallback(async () => {
    setLoadingEmp(true);
    try {
      const data = await getEmployees();
      setEmployees(data);
    } catch {
      setError("Failed to load employees");
    } finally {
      setLoadingEmp(false);
    }
  }, []);

  const fetchRecords = useCallback(async (empId: string) => {
    if (!empId) {
      setRecords([]);
      return;
    }
    setLoadingRec(true);
    setError("");
    try {
      const data = await getAttendance(empId);
      setRecords(data);
    } catch {
      setError("Failed to load attendance records");
    } finally {
      setLoadingRec(false);
    }
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  useEffect(() => {
    fetchRecords(selectedId);
  }, [selectedId, fetchRecords]);

  const handleMarked = () => {
    if (selectedId) fetchRecords(selectedId);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Attendance</h1>

      {loadingEmp ? (
        <Loader />
      ) : error && employees.length === 0 ? (
        <ErrorMessage message={error} onRetry={fetchEmployees} />
      ) : (
        <>
          <AttendanceForm employees={employees} onMarked={handleMarked} />

          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-800">
              View Attendance Records
            </h2>

            <select
              value={selectedId}
              onChange={(e) => setSelectedId(e.target.value)}
              className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none"
            >
              <option value="">Select Employee</option>
              {employees.map((emp) => (
                <option key={emp._id} value={emp.employeeId}>
                  {emp.employeeId} — {emp.fullName}
                </option>
              ))}
            </select>

            {!selectedId ? (
              <EmptyState message="Select an employee to view attendance." />
            ) : loadingRec ? (
              <Loader />
            ) : error ? (
              <ErrorMessage
                message={error}
                onRetry={() => fetchRecords(selectedId)}
              />
            ) : records.length === 0 ? (
              <EmptyState message="No attendance records found." />
            ) : (
              <AttendanceTable records={records} />
            )}
          </div>
        </>
      )}
    </div>
  );
}
