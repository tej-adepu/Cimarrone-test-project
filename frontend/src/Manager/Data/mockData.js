// ─── Dummy data (replace with API calls once backend is ready) ───────────────

export const EMPLOYEES_INIT = [
  { id: 1, name: "Arjun Sharma",  email: "arjun.sharma@corp.com",  department: "Engineering", salary: 85000, role: "Employee", avatar: "AS" },
  { id: 2, name: "Priya Nair",    email: "priya.nair@corp.com",    department: "Design",       salary: 72000, role: "Employee", avatar: "PN" },
  { id: 3, name: "Ravi Teja",     email: "ravi.teja@corp.com",     department: "Engineering",  salary: 91000, role: "Employee", avatar: "RT" },
  { id: 4, name: "Sneha Reddy",   email: "sneha.reddy@corp.com",   department: "HR",           salary: 65000, role: "Employee", avatar: "SR" },
  { id: 5, name: "Kiran Rao",     email: "kiran.rao@corp.com",     department: "Finance",      salary: 78000, role: "Employee", avatar: "KR" },
];

export const LEAVE_RECORDS = {
  1: [
    { id: 101, reason: "Family function",     startDate: "2026-06-10", endDate: "2026-06-12", status: "Approved", appliedDate: "2026-06-05" },
    { id: 102, reason: "Medical checkup",     startDate: "2026-07-01", endDate: "2026-07-01", status: "Pending",  appliedDate: "2026-06-20" },
  ],
  2: [
    { id: 103, reason: "Vacation",            startDate: "2026-06-15", endDate: "2026-06-20", status: "Approved", appliedDate: "2026-06-01" },
    { id: 104, reason: "Personal work",       startDate: "2026-07-05", endDate: "2026-07-06", status: "Pending",  appliedDate: "2026-06-21" },
  ],
  3: [
    { id: 105, reason: "Sick leave",          startDate: "2026-06-18", endDate: "2026-06-19", status: "Rejected", appliedDate: "2026-06-17" },
    { id: 106, reason: "Home shifting",       startDate: "2026-07-10", endDate: "2026-07-11", status: "Pending",  appliedDate: "2026-06-22" },
  ],
  4: [
    { id: 107, reason: "Wedding anniversary", startDate: "2026-07-03", endDate: "2026-07-03", status: "Pending",  appliedDate: "2026-06-19" },
  ],
  5: [
    { id: 108, reason: "Child's school event",startDate: "2026-07-08", endDate: "2026-07-08", status: "Pending",  appliedDate: "2026-06-22" },
    { id: 109, reason: "Annual leave",         startDate: "2026-08-01", endDate: "2026-08-07", status: "Approved", appliedDate: "2026-06-10" },
  ],
};

// Build initial flat list of pending leaves joined with employee info
export const buildPendingLeaves = (employees, leaveRecords) =>
  Object.entries(leaveRecords).flatMap(([empId, records]) =>
    records
      .filter((r) => r.status === "Pending")
      .map((r) => ({ ...r, employee: employees.find((e) => e.id === Number(empId)) }))
  );

// ─── Style helpers ────────────────────────────────────────────────────────────

export const AVATAR_BG   = ["bg-violet-100", "bg-emerald-100", "bg-orange-100", "bg-sky-100", "bg-lime-100"];
export const AVATAR_TEXT = ["text-violet-800","text-emerald-800","text-orange-800","text-sky-800","text-lime-800"];

export const statusBadge = (status) =>
  ({
    Pending:  "bg-amber-50  text-amber-700  ring-1 ring-amber-300",
    Approved: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-300",
    Rejected: "bg-red-50    text-red-700    ring-1 ring-red-300",
  }[status] ?? "");

export const deptColor = (dept) =>
  ({
    Engineering: "bg-violet-50 text-violet-700",
    Design:      "bg-pink-50   text-pink-700",
    HR:          "bg-sky-50    text-sky-700",
    Finance:     "bg-teal-50   text-teal-700",
  }[dept] ?? "bg-gray-100 text-gray-600");

export const TABS = [
  { key: "overview",  label: "Overview",       icon: "🏠" },
  { key: "employees", label: "Employees",      icon: "👥" },
  { key: "leaves",    label: "Leave requests", icon: "📋" },
  { key: "manage",    label: "Manage staff",   icon: "⚙️"  },
];