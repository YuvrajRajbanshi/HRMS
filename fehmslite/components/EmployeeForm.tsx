"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { createEmployee } from "@/services/api";
import type { CreateEmployeePayload } from "@/types";

interface EmployeeFormProps {
  onCreated: () => void;
}

const initialForm: CreateEmployeePayload = {
  employeeId: "",
  fullName: "",
  email: "",
  department: "",
};

export default function EmployeeForm({ onCreated }: EmployeeFormProps) {
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.employeeId || !form.fullName || !form.email || !form.department) {
      toast.error("All fields are required");
      return;
    }

    setSubmitting(true);
    try {
      await createEmployee(form);
      toast.success("Employee created");
      setForm(initialForm);
      onCreated();
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Failed to create employee";
      if (
        typeof err === "object" &&
        err !== null &&
        "response" in err &&
        typeof (err as { response?: { data?: { message?: string } } }).response
          ?.data?.message === "string"
      ) {
        toast.error(
          (err as { response: { data: { message: string } } }).response.data
            .message,
        );
      } else {
        toast.error(msg);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border border-gray-200 bg-white p-6"
    >
      <h2 className="mb-4 text-lg font-semibold text-gray-800">Add Employee</h2>

      <div className="grid gap-4 sm:grid-cols-2">
        <input
          name="employeeId"
          value={form.employeeId}
          onChange={handleChange}
          placeholder="Employee ID"
          className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
        />
        <input
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          placeholder="Full Name"
          className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
        />
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
        />
        <input
          name="department"
          value={form.department}
          onChange={handleChange}
          placeholder="Department"
          className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="mt-4 rounded-md bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {submitting ? "Adding…" : "Add Employee"}
      </button>
    </form>
  );
}
