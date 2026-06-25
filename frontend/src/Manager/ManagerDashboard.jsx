import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";

import {
  getProfile,
  getEmployees,
  getEmployeeLeaves,
  createEmployee,
  updateEmployee,
  updateLeaveStatus,
} from "../api/managerApi.js";

import OverviewPage       from "./components/OverViewPage";
import EmployeesPage      from "./components/EmployeePage";
import LeaveRequestsPage  from "./components/LeaveRequestPage";
import ManageStaffPage    from "./components/ManageStaffPage";

export default function ManagerDashboard() {
  const [activeTab, setActiveTab]         = useState("overview");
  const [employees,     setEmployees]     = useState([]);
  const [pendingLeaves, setPendingLeaves] = useState([]);
  const [loading,       setLoading]       = useState(true);
  const [error,         setError]         = useState(null);
  const [manager, setManager] = useState(null);
  const [openProfile, setOpenProfile] = useState(false);
  const dropdownRef = useRef(null);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear(); // or removeItem("token") if storing only JWT
    navigate("/");
  };

  useEffect(() => {
    loadDashboard();
  }, []);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target)
      ) {
        setOpenProfile(false);
      }
    };

    document.addEventListener(
        "mousedown",
        handleClickOutside
    );

    return () =>
        document.removeEventListener(
            "mousedown",
            handleClickOutside
        );
  }, []);

  const loadDashboard = async () => {
    setLoading(true);
    setError(null);

    try {
      const profile = await getProfile();
      setManager(profile);

      const emps = await getEmployees();
      setEmployees(emps);

      const leaveArrays = await Promise.all(
          emps.map((e) =>
              getEmployeeLeaves(e.id)
                  .then((leaves) =>
                      leaves
                          .filter((l) => l.status === "PENDING")
                          .map((l) => ({
                            ...l,
                            employee: e,
                          }))
                  )
                  .catch(() => [])
          )
      );

      setPendingLeaves(leaveArrays.flat());
    } catch (err) {
      setError(
          err.message ||
          "Failed to load dashboard data"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLeaveAction = useCallback(async (leaveId, action) => {
    const status = action === "approve" ? "APPROVED" : "REJECTED";
    try {
      await updateLeaveStatus(leaveId, status);
      setPendingLeaves((prev) => prev.filter((l) => l.id !== leaveId));
    } catch (err) {
      alert(`Failed to ${action} leave: ${err.message}`);
    }
  }, []);

  const handleEmployeeSave = useCallback(async (modal, form) => {
    try {
      if (modal.mode === "create") {
        const created = await createEmployee(form);
        setEmployees((prev) => [...prev, created]);
      } else {
        const updated = await updateEmployee(modal.data.id, form);
        setEmployees((prev) =>
            prev.map((e) => (e.id === updated.id ? updated : e))
        );
      }
    } catch (err) {
      alert(`Failed to save employee: ${err.message}`);
    }
  }, []);

  const initials = manager?.name
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();


  if (loading) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="text-center space-y-3">
            <div className="w-10 h-10 border-4 border-violet-600 border-t-transparent
            rounded-full animate-spin mx-auto" />
            <p className="text-sm text-slate-500">Loading dashboard…</p>
          </div>
        </div>
    );
  }

  if (error) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="text-center space-y-4">
            <p className="text-2xl">⚠️</p>
            <p className="text-sm font-semibold text-slate-700">{error}</p>
            <button
                onClick={loadDashboard}
                className="px-4 py-2 text-sm font-semibold bg-violet-600 text-white
              rounded-xl hover:bg-violet-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
    );
  }


  return (
      <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">

        {/* ── Top navbar ── */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">

            {/* Brand */}
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-600 to-violet-700
              flex items-center justify-center text-white text-xs font-bold">
                LM
              </div>
              <span className="font-semibold text-slate-800 text-[15px] tracking-tight">
              LeaveManager
            </span>
            </div>

            {/* Manager profile */}
            <div className="flex items-center gap-3">
              <div
                  className="relative"
                  ref={dropdownRef}
              >
                <button
                    onClick={() =>
                        setOpenProfile(!openProfile)
                    }
                    className="flex items-center gap-3"
                >
                  <div className="hidden sm:block text-right">
                    <p className="text-sm font-medium text-gray-800">
                      {manager?.name}
                    </p>

                    <p className="text-xs text-gray-500">
                      {manager?.role}
                    </p>
                  </div>

                  <div className="w-9 h-9 rounded-full bg-violet-100 flex items-center justify-center text-violet-700 font-semibold">
                    {initials}
                  </div>
                </button>

                {openProfile && (
                    <div className="absolute right-0 mt-3 w-72 bg-white border border-gray-200 rounded-xl shadow-lg p-4 z-50">

                      <div className="flex items-center gap-3 mb-3">

                        <div className="w-11 h-11 rounded-full bg-violet-600 text-white flex items-center justify-center font-bold">
                          {initials}
                        </div>

                        <div>
                          <p className="text-sm font-semibold">
                            {manager?.name}
                          </p>

                          <p className="text-xs text-gray-500">
                            {manager?.role}
                          </p>
                        </div>

                      </div>

                      <div className="border-t pt-3 space-y-2">

                        <div className="flex justify-between text-xs">
          <span className="text-gray-400">
            Manager ID
          </span>

                          <span className="font-medium">
            {manager?.managerId}
          </span>
                        </div>

                        <div className="flex justify-between text-xs">
          <span className="text-gray-400">
            Email
          </span>

                          <span className="font-medium truncate ml-4">
            {manager?.email}
          </span>
                        </div>

                        <div className="flex justify-between text-xs">
          <span className="text-gray-400">
            Role
          </span>

                          <span className="font-medium">
            {manager?.role}
          </span>
                        </div>

                        <button
                            onClick={handleLogout}
                            className="w-full mt-3 bg-red-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition"
                        >
                          Logout
                        </button>

                      </div>

                    </div>
                )}
              </div>
            </div>
          </div>

        </header>

        {/* ── Tab bar ── */}
        <div className="bg-white border-b border-slate-200 sticky top-14 z-20">
          <div className="max-w-7xl mx-auto px-6 flex gap-1">
            {[
              { key: "overview",  label: "Overview",       icon: "🏠" },
              { key: "employees", label: "Employees",      icon: "👥" },
              { key: "leaves",    label: "Leave Requests", icon: "📋" },
              { key: "manage",    label: "Manage Staff",   icon: "⚙️"  },
            ].map((t) => (
                <button
                    key={t.key}
                    onClick={() => setActiveTab(t.key)}
                    className={`flex items-center gap-2 px-4 py-3.5 text-sm font-medium border-b-2 transition-colors
                ${activeTab === t.key
                        ? "border-violet-600 text-violet-700"
                        : "border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300"
                    }`}
                >
                  <span className="text-base leading-none">{t.icon}</span>
                  {t.label}

                  {t.key === "leaves" && pendingLeaves.length > 0 && (
                      <span className="ml-0.5 bg-amber-100 text-amber-700 text-[11px] font-semibold
                  px-1.5 py-0.5 rounded-full">
                  {pendingLeaves.length}
                </span>
                  )}
                </button>
            ))}
          </div>
        </div>

        {/* ── Page content ── */}
        <main className="max-w-7xl mx-auto px-6 py-7">
          {activeTab === "overview" && (
              <OverviewPage
                  employees={employees}
                  pendingLeaves={pendingLeaves}
                  onLeaveAction={handleLeaveAction}
                  onNavigate={setActiveTab}
              />
          )}
          {activeTab === "employees" && (
              <EmployeesPage employees={employees} />
          )}
          {activeTab === "leaves" && (
              <LeaveRequestsPage
                  pendingLeaves={pendingLeaves}
                  onLeaveAction={handleLeaveAction}
              />
          )}
          {activeTab === "manage" && (
              <ManageStaffPage
                  employees={employees}
                  onSave={handleEmployeeSave}
              />
          )}
        </main>
      </div>
  );
}