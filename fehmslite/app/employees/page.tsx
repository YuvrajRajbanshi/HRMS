"use client";

import { useEffect, useState, useCallback } from "react";
import { getEmployees } from "@/services/api";
import type { Employee } from "@/types";
import EmployeeForm from "@/components/EmployeeForm";
import EmployeeTable from "@/components/EmployeeTable";
import Loader from "@/components/Loader";
import EmptyState from "@/components/EmptyState";
import ErrorMessage from "@/components/ErrorMessage";

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchEmployees = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getEmployees();
      setEmployees(data);
    } catch {
      setError("Failed to load employees");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Employees</h1>

      <EmployeeForm onCreated={fetchEmployees} />

      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorMessage message={error} onRetry={fetchEmployees} />
      ) : employees.length === 0 ? (
        <EmptyState message="No employees found. Add one above." />
      ) : (
        <EmployeeTable employees={employees} onDeleted={fetchEmployees} />
      )}
    </div>
  );
}
