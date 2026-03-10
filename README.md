# HRMS Lite

A lightweight Human Resource Management System for managing employees and tracking attendance. Built with a modern full-stack TypeScript architecture — **Next.js** on the frontend and **Express.js** on the backend, backed by **MongoDB**.

---

## Tech Stack

### Backend (`behmslite/`)

| Technology | Version | Purpose                  |
| ---------- | ------- | ------------------------ |
| Node.js    | —       | Runtime                  |
| Express.js | 5.2     | REST API framework       |
| TypeScript | 5.9     | Language                 |
| Mongoose   | 9.2     | MongoDB ODM              |
| dotenv     | 17.3    | Environment variables    |
| CORS       | 2.8     | Cross-origin requests    |
| Nodemon    | —       | Hot reload (development) |

### Frontend (`fehmslite/`)

| Technology      | Version | Purpose              |
| --------------- | ------- | -------------------- |
| Next.js         | 16.1    | React framework      |
| React           | 19.2    | UI library           |
| TypeScript      | 5.0     | Language             |
| Tailwind CSS    | 4.0     | Utility-first styles |
| Axios           | 1.13    | HTTP client          |
| react-hot-toast | 2.6     | Toast notifications  |
| ESLint          | 9       | Linting              |

---

## Architecture

```
┌─────────────────────────┐        HTTP / REST        ┌─────────────────────────┐
│                         │  ◄─────────────────────►   │                         │
│   Frontend (Next.js)    │        (Axios)             │   Backend (Express)     │
│   fehmslite/            │                            │   behmslite/            │
│                         │                            │                         │
│  ┌───────────────────┐  │                            │  ┌───────────────────┐  │
│  │ Pages (App Router)│  │                            │  │ Routes            │  │
│  │  /employees       │  │                            │  │  /api/employees   │  │
│  │  /attendance      │  │                            │  │  /api/attendance  │  │
│  └────────┬──────────┘  │                            │  └────────┬──────────┘  │
│           │              │                            │           │              │
│  ┌────────▼──────────┐  │                            │  ┌────────▼──────────┐  │
│  │ Components        │  │                            │  │ Controllers       │  │
│  │  Forms / Tables   │  │                            │  │  Validation &     │  │
│  │  Loader / Error   │  │                            │  │  Business Logic   │  │
│  └────────┬──────────┘  │                            │  └────────┬──────────┘  │
│           │              │                            │           │              │
│  ┌────────▼──────────┐  │                            │  ┌────────▼──────────┐  │
│  │ API Service       │  │                            │  │ Mongoose Models   │  │
│  │  (services/api.ts)│  │                            │  │  Employee         │  │
│  └───────────────────┘  │                            │  │  Attendance       │  │
│                         │                            │  └────────┬──────────┘  │
└─────────────────────────┘                            │           │              │
                                                       │  ┌────────▼──────────┐  │
                                                       │  │ MongoDB           │  │
                                                       │  └───────────────────┘  │
                                                       └─────────────────────────┘
```

### Backend Structure

```
behmslite/src/
├── app.ts                 # Express app setup (CORS, middleware, routes)
├── server.ts              # Entry point — connects to DB, starts server
├── config/
│   └── db.ts              # MongoDB connection via Mongoose
├── controllers/
│   ├── employeeController.ts    # Employee CRUD logic
│   └── attendanceController.ts  # Attendance marking & retrieval
├── middleware/
│   └── errorHandler.ts    # Global error handling middleware
├── models/
│   ├── Employee.ts        # Employee Mongoose schema
│   └── Attendance.ts      # Attendance Mongoose schema
├── routes/
│   ├── employeeRoutes.ts  # Employee API routes
│   └── attendanceRoutes.ts# Attendance API routes
├── types/
│   └── index.ts           # Shared TypeScript interfaces
└── utils/
    └── validateEmail.ts   # Email format validator
```

### Frontend Structure

```
fehmslite/
├── app/
│   ├── layout.tsx         # Root layout (Sidebar + Toaster)
│   ├── page.tsx           # Home — redirects to /employees
│   ├── employees/
│   │   └── page.tsx       # Employee management page
│   └── attendance/
│       └── page.tsx       # Attendance tracking page
├── components/
│   ├── Sidebar.tsx        # Fixed navigation sidebar
│   ├── EmployeeForm.tsx   # Add employee form
│   ├── EmployeeTable.tsx  # Employee list table
│   ├── AttendanceForm.tsx # Mark attendance form
│   ├── AttendanceTable.tsx# Attendance records table
│   ├── EmptyState.tsx     # Placeholder for empty data
│   ├── ErrorMessage.tsx   # Error display with retry
│   └── Loader.tsx         # Spinning loader indicator
├── services/
│   └── api.ts             # Centralized Axios API client
└── types/
    └── index.ts           # Shared TypeScript interfaces
```

---

## Data Models

### Employee

| Field        | Type   | Constraints                 |
| ------------ | ------ | --------------------------- |
| `employeeId` | String | Required, Unique            |
| `fullName`   | String | Required                    |
| `email`      | String | Required, Unique, Lowercase |
| `department` | String | Required                    |
| `createdAt`  | Date   | Auto-generated              |

### Attendance

| Field        | Type   | Constraints                        |
| ------------ | ------ | ---------------------------------- |
| `employeeId` | String | Required, references Employee      |
| `date`       | Date   | Required                           |
| `status`     | String | Required, enum: `Present`/`Absent` |
| `createdAt`  | Date   | Auto-generated                     |

---

## API Endpoints

### Employees

| Method   | Endpoint             | Description              |
| -------- | -------------------- | ------------------------ |
| `GET`    | `/api/employees`     | Get all employees        |
| `POST`   | `/api/employees`     | Create a new employee    |
| `DELETE` | `/api/employees/:id` | Delete an employee by ID |

### Attendance

| Method | Endpoint                      | Description                         |
| ------ | ----------------------------- | ----------------------------------- |
| `POST` | `/api/attendance`             | Mark attendance for an employee     |
| `GET`  | `/api/attendance/:employeeId` | Get attendance records for employee |

---

## Getting Started

### Prerequisites

- **Node.js** (v18+ recommended)
- **MongoDB** (local instance or MongoDB Atlas)

### 1. Clone the repository

```bash
git clone <repository-url>
cd HRMSLITE
```

### 2. Backend Setup

```bash
cd behmslite
npm install
```

Create a `.env` file in `behmslite/`:

```env
MONGO_URI=mongodb://localhost:27017/hrmslite
PORT=5000
```

Start the development server:

```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd fehmslite
npm install
```

Optionally create a `.env.local` in `fehmslite/`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

> Defaults to `http://localhost:5000/api` if not set.

Start the development server:

```bash
npm run dev
```

The app will be available at **http://localhost:3000**.

---

## Available Scripts

### Backend (`behmslite/`)

| Script          | Command                                | Description                      |
| --------------- | -------------------------------------- | -------------------------------- |
| `npm run dev`   | `nodemon --exec ts-node src/server.ts` | Start dev server with hot reload |
| `npm run build` | `tsc`                                  | Compile TypeScript to `dist/`    |
| `npm start`     | `node dist/server.js`                  | Run production build             |

### Frontend (`fehmslite/`)

| Script          | Command      | Description             |
| --------------- | ------------ | ----------------------- |
| `npm run dev`   | `next dev`   | Start dev server        |
| `npm run build` | `next build` | Build for production    |
| `npm start`     | `next start` | Start production server |
| `npm run lint`  | `eslint`     | Run linter              |

---

## Features

- **Employee Management** — Add, view, and delete employees with validation (email format, duplicate checks)
- **Attendance Tracking** — Mark daily attendance (Present/Absent) per employee and view history
- **Toast Notifications** — Real-time feedback on actions (success/error)
- **Loading & Error States** — Dedicated UI components for loading spinners, empty states, and error messages with retry
- **Form Validation** — Client-side and server-side input validation
- **Responsive UI** — Tailwind CSS utility classes with responsive grid layouts
