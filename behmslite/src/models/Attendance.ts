import mongoose, { Schema } from "mongoose";
import { IAttendance } from "../types";

const attendanceSchema = new Schema<IAttendance>(
  {
    employeeId: {
      type: String,
      required: [true, "Employee ID is required"],
      ref: "Employee",
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
    },
    status: {
      type: String,
      required: [true, "Status is required"],
      enum: {
        values: ["Present", "Absent"],
        message: "Status must be either Present or Absent",
      },
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  },
);

const Attendance = mongoose.model<IAttendance>("Attendance", attendanceSchema);

export default Attendance;
