import { Request, Response, NextFunction } from "express";
import Attendance from "../models/Attendance";
import Employee from "../models/Employee";
import { CreateAttendanceBody } from "../types";

const VALID_STATUSES = ["Present", "Absent"] as const;

export const markAttendance = async (
  req: Request<{}, {}, CreateAttendanceBody>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { employeeId, date, status } = req.body;

    if (!employeeId || !date || !status) {
      res
        .status(400)
        .json({ message: "All fields are required: employeeId, date, status" });
      return;
    }

    if (!VALID_STATUSES.includes(status)) {
      res
        .status(400)
        .json({ message: "Status must be either Present or Absent" });
      return;
    }

    const employee = await Employee.findOne({ employeeId });
    if (!employee) {
      res
        .status(404)
        .json({ message: `Employee with ID ${employeeId} not found` });
      return;
    }

    const attendance = await Attendance.create({ employeeId, date, status });
    res.status(201).json(attendance);
  } catch (error) {
    next(error);
  }
};

export const getAttendanceByEmployee = async (
  req: Request<{ employeeId: string }>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { employeeId } = req.params;

    const employee = await Employee.findOne({ employeeId });
    if (!employee) {
      res
        .status(404)
        .json({ message: `Employee with ID ${employeeId} not found` });
      return;
    }

    const records = await Attendance.find({ employeeId }).sort({ date: -1 });
    res.status(200).json(records);
  } catch (error) {
    next(error);
  }
};
