import { useEffect, useState } from "react";

import Navbar from "./Navbar";
import LeaveHistory from "./Leavehistory";
import ApplyLeaveForm from "./ApplyLeaveForm";
import LeaveBalance from "./LeaveBalance";

import {
  getProfile,
  getLeaveHistory,
  getLeaveBalance
} from "../../api/employeeApi";

function EmployeeDashboard() {

  const [employee, setEmployee] =
    useState(null);

  const [leaves, setLeaves] =
    useState([]);

  const [balance, setBalance] =
  useState(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {

  try {

    const profile =
      await getProfile();

    const history =
      await getLeaveHistory();

    const leaveBalance =
      await getLeaveBalance();

    setEmployee(profile);

    setLeaves(history);

    setBalance(leaveBalance);

  } catch(error) {

    console.error(error);

  }
};

  if (!employee) {

    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">

      <Navbar employee={employee} />

      <main className="max-w-5xl mx-auto px-4 py-6 space-y-6">

        <LeaveBalance
            balance={balance}
            leaves={leaves}
        />

        <LeaveHistory
          leaves={leaves}
          refreshLeaves={loadDashboard}
      />

        <ApplyLeaveForm
          onSuccess={loadDashboard}
        />

      </main>

    </div>
  );
}

export default EmployeeDashboard;