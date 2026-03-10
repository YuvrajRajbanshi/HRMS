import axios from "axios";
import type {
  Employee,
  CreateEmployeePayload,
  AttendanceRecord,
  CreateAttendancePayload,
} from "@/types";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  headers: { "Content-Type": "application/json" },
});

// ── Employees ──────────────────────────────────────────

export const getEmployees = async (): Promise<Employee[]> => {
  const { data } = await api.get<Employee[]>("/employees");
  return data;
};

export const createEmployee = async (
  payload: CreateEmployeePayload,
): Promise<Employee> => {
  const { data } = await api.post<Employee>("/employees", payload);
  return data;
};

export const deleteEmployee = async (id: string): Promise<void> => {
  await api.delete(`/employees/${id}`);
};

// ── Attendance ─────────────────────────────────────────

export const markAttendance = async (
  payload: CreateAttendancePayload,
): Promise<AttendanceRecord> => {
  const { data } = await api.post<AttendanceRecord>("/attendance", payload);
  return data;
};

export const getAttendance = async (
  employeeId: string,
): Promise<AttendanceRecord[]> => {
  const { data } = await api.get<AttendanceRecord[]>(
    `/attendance/${employeeId}`,
  );
  return data;
};
