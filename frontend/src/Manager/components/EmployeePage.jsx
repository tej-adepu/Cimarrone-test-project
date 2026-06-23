import { useState } from "react";
import { Avatar } from "./SharedComponents";
import { LEAVE_RECORDS, statusBadge, deptColor } from "../Data/mockData";

export default function EmployeesPage({ employees }) {
  const [selectedEmp, setSelectedEmp] = useState(null);
  const [search, setSearch] = useState("");

  const filtered = employees.filter(
    (e) =>
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.department.toLowerCase().includes(search.toLowerCase())
  );

  const toggleEmployee = (emp) =>
    setSelectedEmp((prev) => (prev?.id === emp.id ? null : emp));

  return (
    <div className="space-y-5">

      {/* ── Page header ── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-slate-800">Employees</h1>
          <p className="text-sm text-slate-400">{employees.length} team members</p>
        </div>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔍</span>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name or department…"
            className="pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-xl bg-white
              focus:outline-none focus:ring-2 focus:ring-violet-300 w-64"
          />
        </div>
      </div>

      {/* ── Employee card grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((emp) => (
          <div
            key={emp.id}
            onClick={() => toggleEmployee(emp)}
            className={`bg-white rounded-2xl border cursor-pointer p-5 hover:shadow-md transition-all
              ${selectedEmp?.id === emp.id
                ? "border-violet-400 ring-2 ring-violet-100"
                : "border-slate-200"
              }`}
          >
            <div className="flex items-center gap-3 mb-3">
              <Avatar initials={emp.avatar} idx={emp.id} size="lg" />
              <div className="min-w-0">
                <p className="text-sm font-semibold text-slate-800 truncate">{emp.name}</p>
                <p className="text-xs text-slate-400 truncate">{emp.email}</p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${deptColor(emp.department)}`}>
                {emp.department}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                ₹{Number(emp.salary).toLocaleString("en-IN")}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ── Leave history panel (shown when an employee is selected) ── */}
      {selectedEmp && (
        <div className="bg-white rounded-2xl border border-violet-200 mt-2">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <Avatar initials={selectedEmp.avatar} idx={selectedEmp.id} />
              <div>
                <p className="text-sm font-semibold text-slate-800">{selectedEmp.name}</p>
                <p className="text-xs text-slate-400">Leave history · {selectedEmp.department}</p>
              </div>
            </div>
            <button
              onClick={() => setSelectedEmp(null)}
              className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-slate-100
                text-slate-400 text-base transition-colors"
            >
              ✕
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 text-xs uppercase text-slate-500 tracking-wider">
                  {["Reason", "Start date", "End date", "Applied on", "Status"].map((h) => (
                    <th key={h} className="text-left px-6 py-3 font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {(LEAVE_RECORDS[selectedEmp.id] || []).map((lv) => (
                  <tr key={lv.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-3.5 font-medium text-slate-700">{lv.reason}</td>
                    <td className="px-6 py-3.5 text-slate-500">{lv.startDate}</td>
                    <td className="px-6 py-3.5 text-slate-500">{lv.endDate}</td>
                    <td className="px-6 py-3.5 text-slate-400">{lv.appliedDate}</td>
                    <td className="px-6 py-3.5">
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full
                          ${statusBadge(lv.status)}`}
                      >
                        {lv.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}