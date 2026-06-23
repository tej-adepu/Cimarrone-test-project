import { Avatar } from "./SharedComponents";
import { deptColor } from "../Data/mockData";

export default function OverviewPage({ employees, pendingLeaves, onLeaveAction, onNavigate }) {
  const stats = [
    {
      label: "Total employees",
      value: employees.length,
      icon: "👤",
      light: "bg-violet-50 text-violet-600",
    },
    {
      label: "Pending requests",
      value: pendingLeaves.length,
      icon: "⏳",
      light: "bg-amber-50 text-amber-600",
    },
    {
      label: "Approved this month",
      value: 6,
      icon: "✅",
      light: "bg-emerald-50 text-emerald-600",
    },
    {
      label: "Departments",
      value: [...new Set(employees.map((e) => e.department))].length,
      icon: "🏢",
      light: "bg-sky-50 text-sky-600",
    },
  ];

  return (
    <div className="space-y-6">

      {/* ── Stat cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-2xl border border-slate-200 p-5 flex items-start
              justify-between hover:shadow-sm transition-shadow"
          >
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-wider font-medium mb-1.5">
                {s.label}
              </p>
              <p className="text-3xl font-bold text-slate-800">{s.value}</p>
            </div>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${s.light}`}>
              {s.icon}
            </div>
          </div>
        ))}
      </div>

      {/* ── Two-column lower panels ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

        {/* Pending approvals */}
        <div className="bg-white rounded-2xl border border-slate-200">
          <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-slate-100">
            <h2 className="text-sm font-semibold text-slate-700">Pending approvals</h2>
            <button
              onClick={() => onNavigate("leaves")}
              className="text-xs text-violet-600 hover:text-violet-800 font-medium"
            >
              View all →
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {pendingLeaves.slice(0, 4).map((lv) => (
              <div key={lv.id} className="flex items-center gap-3 px-5 py-3">
                <Avatar initials={lv.employee.avatar} idx={lv.employee.id} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800 truncate">{lv.employee.name}</p>
                  <p className="text-xs text-slate-400">{lv.reason} · {lv.startDate}</p>
                </div>
                <div className="flex gap-1.5 shrink-0">
                  <button
                    onClick={() => onLeaveAction(lv.id)}
                    className="text-xs px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700
                      border border-emerald-200 hover:bg-emerald-100 font-medium transition-colors"
                  >
                    ✓ Approve
                  </button>
                  <button
                    onClick={() => onLeaveAction(lv.id)}
                    className="text-xs px-3 py-1.5 rounded-lg bg-red-50 text-red-600
                      border border-red-200 hover:bg-red-100 font-medium transition-colors"
                  >
                    ✕ Reject
                  </button>
                </div>
              </div>
            ))}
            {pendingLeaves.length === 0 && (
              <div className="py-10 text-center text-slate-400 text-sm">🎉 No pending requests</div>
            )}
          </div>
        </div>

        {/* Team snapshot */}
        <div className="bg-white rounded-2xl border border-slate-200">
          <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-slate-100">
            <h2 className="text-sm font-semibold text-slate-700">Team overview</h2>
            <button
              onClick={() => onNavigate("employees")}
              className="text-xs text-violet-600 hover:text-violet-800 font-medium"
            >
              View all →
            </button>
          </div>
          <div className="divide-y divide-slate-100">
            {employees.map((emp) => (
              <div key={emp.id} className="flex items-center gap-3 px-5 py-3">
                <Avatar initials={emp.avatar} idx={emp.id} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800">{emp.name}</p>
                  <p className="text-xs text-slate-400">{emp.email}</p>
                </div>
                <span
                  className={`text-[11px] font-semibold px-2.5 py-1 rounded-full
                    ${deptColor(emp.department)}`}
                >
                  {emp.department}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}