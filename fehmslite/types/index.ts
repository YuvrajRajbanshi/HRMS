export interface Employee {
  _id: string;
  employeeId: string;
  fullName: string;
  email: string;
  department: string;
  createdAt: string;
}

export interface CreateEmployeePayload {
  employeeId: string;
  fullName: string;
  email: string;
  department: string;
}

export interface AttendanceRecord {
  _id: string;
  employeeId: string;
  date: string;
  status: "Present" | "Absent";
  createdAt: string;
}

export interface CreateAttendancePayload {
  employeeId: string;
  date: string;
  status: "Present" | "Absent";
}
