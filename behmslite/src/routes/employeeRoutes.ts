import { Router } from "express";
import {
  createEmployee,
  getAllEmployees,
  deleteEmployee,
} from "../controllers/employeeController";

const router = Router();

router.post("/", createEmployee);
router.get("/", getAllEmployees);
router.delete("/:id", deleteEmployee);

export default router;
