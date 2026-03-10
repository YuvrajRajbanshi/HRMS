import { Router } from "express";
import {
  markAttendance,
  getAttendanceByEmployee,
} from "../controllers/attendanceController";

const router = Router();

router.post("/", markAttendance);
router.get("/:employeeId", getAttendanceByEmployee);

export default router;
