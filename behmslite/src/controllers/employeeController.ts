import { Request, Response, NextFunction } from "express";
import Employee from "../models/Employee";
import { CreateEmployeeBody } from "../types";
import { isValidEmail } from "../utils/validateEmail";

export const createEmployee = async (
  req: Request<{}, {}, CreateEmployeeBody>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { employeeId, fullName, email, department } = req.body;

    if (!employeeId || !fullName || !email || !department) {
      res
        .status(400)
        .json({
          message:
            "All fields are required: employeeId, fullName, email, department",
        });
      return;
    }

    if (!isValidEmail(email)) {
      res.status(400).json({ message: "Invalid email format" });
      return;
    }

    const existing = await Employee.findOne({
      $or: [{ employeeId }, { email: email.toLowerCase() }],
    });

    if (existing) {
      const field = existing.employeeId === employeeId ? "employeeId" : "email";
      res
        .status(409)
        .json({ message: `Employee with this ${field} already exists` });
      return;
    }

    const employee = await Employee.create({
      employeeId,
      fullName,
      email,
      department,
    });
    res.status(201).json(employee);
  } catch (error) {
    next(error);
  }
};

export const getAllEmployees = async (
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 });
    res.status(200).json(employees);
  } catch (error) {
    next(error);
  }
};

export const deleteEmployee = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);

    if (!employee) {
      res.status(404).json({ message: "Employee not found" });
      return;
    }

    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    next(error);
  }
};
