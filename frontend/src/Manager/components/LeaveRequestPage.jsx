import { Avatar } from "../components/SharedComponents";

export default function LeaveRequestsPage({ pendingLeaves, onLeaveAction }) {
  return (
    <div className="space-y-4">

      {/* ── Page header ── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-slate-800">Pending leave requests</h1>
          <p className="text-sm text-slate-400">Review and respond to employee requests</p>
        </div>
        {pendingLeaves.length > 0 && (
          <span className="bg-amber-50 text-amber-700 ring-1 ring-amber-200 text-xs font-semibold px-3 py-1.5 rounded-full">
            {pendingLeaves.length} pending
          </span>
        )}
      </div>

      {/* ── Empty state ── */}
      {pendingLeaves.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 py-20 text-center">
          <div className="text-4xl mb-3">🎉</div>
          <p className="font-semibold text-slate-700">All caught up!</p>
          <p className="text-sm text-slate-400 mt-1">No pending leave requests at the moment.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {pendingLeaves.map((lv) => (
            <div
              key={lv.id}
              className="bg-white rounded-2xl border border-slate-200 px-5 py-4
                flex flex-wrap items-center gap-4 hover:shadow-sm transition-shadow"
            >
              {/* Employee info */}
              <div className="flex items-center gap-3 flex-1 min-w-[160px]">
                <Avatar initials={lv.employee.avatar} idx={lv.employee.id} size="lg" />
                <div>
                  <p className="text-sm font-semibold text-slate-800">{lv.employee.name}</p>
                  <p className="text-xs text-slate-400">{lv.employee.department}</p>
                </div>
              </div>

              {/* Reason */}
              <div className="flex-1 min-w-[140px]">
                <p className="text-xs text-slate-400 uppercase tracking-wider font-medium mb-0.5">
                  Reason
                </p>
                <p className="text-sm font-medium text-slate-700">{lv.reason}</p>
              </div>

              {/* Duration */}
              <div className="flex-1 min-w-[160px]">
                <p className="text-xs text-slate-400 uppercase tracking-wider font-medium mb-0.5">
                  Duration
                </p>
                <p className="text-sm text-slate-700">{lv.startDate} → {lv.endDate}</p>
              </div>

              {/* Applied on */}
              <div className="hidden md:block flex-1 min-w-[120px]">
                <p className="text-xs text-slate-400 uppercase tracking-wider font-medium mb-0.5">
                  Applied on
                </p>
                <p className="text-sm text-slate-500">{lv.appliedDate}</p>
              </div>

              {/* Actions */}
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => onLeaveAction(lv.id, "approve")}
                  className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-xl
                    bg-emerald-600 text-white hover:bg-emerald-700 active:scale-95 transition-all"
                >
                  ✓ Approve
                </button>
                <button
                  onClick={() => onLeaveAction(lv.id, "reject")}
                  className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-xl
                    bg-white text-red-600 border border-red-200 hover:bg-red-50 active:scale-95 transition-all"
                >
                  ✕ Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}