import express from "express";
import cors from "cors";
import employeeRoutes from "./routes/employeeRoutes";
import attendanceRoutes from "./routes/attendanceRoutes";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

// Middleware
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

// Routes
app.use("/api/employees", employeeRoutes);
app.use("/api/attendance", attendanceRoutes);

// Global error handler
app.use(errorHandler);

export default app;
