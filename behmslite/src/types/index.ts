import { Document } from "mongoose";

export interface IEmployee extends Document {
  employeeId: string;
  fullName: string;
  email: string;
  department: string;
  createdAt: Date;
}

export interface IAttendance extends Document {
  employeeId: string;
  date: Date;
  status: "Present" | "Absent";
  createdAt: Date;
}

export interface CreateEmployeeBody {
  employeeId: string;
  fullName: string;
  email: string;
  department: string;
}

export interface CreateAttendanceBody {
  employeeId: string;
  date: string;
  status: "Present" | "Absent";
}
