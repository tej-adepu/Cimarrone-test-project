import { useState } from "react";

import { EMPLOYEES_INIT, LEAVE_RECORDS, buildPendingLeaves, TABS } from "./Data/mockData";

import OverviewPage       from "./components/OverViewPage";
import EmployeesPage      from "./components/EmployeePage";
import LeaveRequestsPage  from "./components/LeaveRequestPage";
import ManageStaffPage    from "./components/ManageStaffPage";

export default function ManagerDashboard() {
  const [activeTab, setActiveTab]         = useState("overview");
  const [employees, setEmployees]         = useState(EMPLOYEES_INIT);
  const [pendingLeaves, setPendingLeaves] = useState(() =>
    buildPendingLeaves(EMPLOYEES_INIT, LEAVE_RECORDS)
  );

  // ── Leave action (approve / reject both just remove from pending list for now) ──
  const handleLeaveAction = (id) =>
    setPendingLeaves((prev) => prev.filter((l) => l.id !== id));

  // ── Employee create / update ──
  const handleEmployeeSave = (modal, form) => {
    if (modal.mode === "create") {
      setEmployees((prev) => [
        ...prev,
        {
          id: Date.now(),
          ...form,
          salary: Number(form.salary),
          avatar: form.name
            .split(" ")
            .map((w) => w[0])
            .join("")
            .slice(0, 2)
            .toUpperCase(),
        },
      ]);
    } else {
      setEmployees((prev) =>
        prev.map((e) =>
          e.id === modal.data.id ? { ...e, ...form, salary: Number(form.salary) } : e
        )
      );
    }
  };

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
            <span className="text-xs text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">
              Tue, 23 Jun 2026
            </span>
            <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-violet-600
                flex items-center justify-center text-white text-xs font-semibold">
                MG
              </div>
              <div className="hidden sm:block">
                <p className="text-xs font-medium text-slate-700 leading-none">Meghna Gupta</p>
                <p className="text-[11px] text-slate-400 leading-none mt-0.5">Manager</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── Tab bar ── */}
      <div className="bg-white border-b border-slate-200 sticky top-14 z-20">
        <div className="max-w-7xl mx-auto px-6 flex gap-1">
          {TABS.map((t) => (
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

              {/* Badge on Leave requests tab */}
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