import { useState } from "react";
import Navbar from "./Employee/Navbar";
import LeaveBalance from "./Employee/LeaveBalance";
import LeaveHistory from "./Employee/LeaveHistory";
import ApplyLeaveForm from "./Employee/ApplyLeaveForm";

const employee = {
  id: "EMP-2041",
  name: "Abhinav Reddy",
  role: "Software Engineer Intern",
  department: "Engineering",
  email: "abhinav.reddy@company.com",
  joinDate: "Jan 2024",
  manager: "Ravi Kumar",
};

const managers = [
  { id: "1", name: "Ravi Kumar", role: "Engineering Manager" },
  { id: "2", name: "Sneha Rao", role: "Team Lead" },
  { id: "3", name: "Arjun Mehta", role: "Project Manager" },
];

const initialLeaves = [
  {
    id: 1,
    reason: "Family function — cousin's wedding",
    startDate: "2024-03-10",
    endDate: "2024-03-12",
    days: 3,
    status: "Approved",
  },
  {
    id: 2,
    reason: "Medical appointment and recovery",
    startDate: "2024-04-05",
    endDate: "2024-04-05",
    days: 1,
    status: "Approved",
  },
  {
    id: 3,
    reason: "Personal work — travel to hometown",
    startDate: "2024-05-20",
    endDate: "2024-05-22",
    days: 3,
    status: "Rejected",
  },
  {
    id: 4,
    reason: "Sick leave — fever and rest",
    startDate: "2024-06-15",
    endDate: "2024-06-16",
    days: 2,
    status: "Pending",
  },
];

const initialBalance = {
  total: 18,
  used: 6,
  remaining: 12,
  pending: 2,
};

function App() {
  const [leaves, setLeaves] = useState(initialLeaves);
  const [balance, setBalance] = useState(initialBalance);

  const handleApplyLeave = (newLeave) => {
    const entry = {
      id: Date.now(),
      reason: newLeave.reason,
      startDate: newLeave.startDate,
      endDate: newLeave.endDate,
      days: newLeave.days,
      status: "Pending",
    };
    setLeaves((prev) => [entry, ...prev]);
    setBalance((prev) => ({
      ...prev,
      pending: prev.pending + newLeave.days,
      remaining: prev.remaining - newLeave.days,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar employee={employee} />

      <main className="max-w-5xl mx-auto px-4 py-6 space-y-6">
        <LeaveBalance balance={balance} />
        <LeaveHistory leaves={leaves} />
        <ApplyLeaveForm managers={managers} onSubmit={handleApplyLeave} />
      </main>
    </div>
  );
}

export default App;