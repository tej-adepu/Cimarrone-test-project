import { useState } from "react";
import Navbar from "./Employee/components/Navbar";
import LeaveBalance from "./Employee/components/LeaveBalance";
import LeaveHistory from "./Employee/components/LeaveHistory";
import ApplyLeaveForm from "./Employee/components/ApplyLeaveForm";
import Login from "./Pages/Login";
import ManagerDashboard from "./Manager/ManagerDashboard";

import {
  employee,
  managers,
  initialLeaves,
  initialBalance,
} from "./Employee/data/dummyData";

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
    <>
      <Login />
      <ManagerDashboard />

      <div className="min-h-screen bg-gray-50">
        <Navbar employee={employee} />

        <main className="max-w-5xl mx-auto px-4 py-6 space-y-6">
          <LeaveBalance balance={balance} />
          <LeaveHistory leaves={leaves} />
          <ApplyLeaveForm
            managers={managers}
            onSubmit={handleApplyLeave}
          />
        </main>
      </div>
    </>
  );
}

export default App;