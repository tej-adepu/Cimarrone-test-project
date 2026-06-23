import { AVATAR_BG, AVATAR_TEXT } from "../Data/mockData";

// ─── Avatar ───────────────────────────────────────────────────────────────────
export function Avatar({ initials, idx, size = "md" }) {
  const sz =
    size === "lg" ? "w-11 h-11 text-sm"
    : size === "sm" ? "w-7 h-7 text-xs"
    : "w-9 h-9 text-xs";

  return (
    <div
      className={`${sz} rounded-full flex items-center justify-center font-semibold shrink-0
        ${AVATAR_BG[idx % 5]} ${AVATAR_TEXT[idx % 5]}`}
    >
      {initials}
    </div>
  );
}

// ─── Employee Create / Edit Modal ─────────────────────────────────────────────
const FORM_FIELDS = [
  { label: "Full name",         key: "name",       type: "text",   placeholder: "e.g. Arjun Sharma"  },
  { label: "Email address",     key: "email",      type: "email",  placeholder: "e.g. arjun@corp.com" },
  { label: "Department",        key: "department", type: "text",   placeholder: "e.g. Engineering"   },
  { label: "Annual salary (₹)", key: "salary",     type: "number", placeholder: "e.g. 85000"         },
];

export function EmployeeModal({ modal, form, setForm, onSave, onClose }) {
  if (!modal.open) return null;

  const isCreate = modal.mode === "create";

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md border border-slate-200 overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <div>
            <h2 className="text-base font-semibold text-slate-800">
              {isCreate ? "Add new employee" : "Update employee"}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              {isCreate
                ? "Fill in the details to onboard a new team member"
                : "Edit the employee's information below"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400
              hover:bg-slate-100 hover:text-slate-600 transition-colors text-lg"
          >
            ✕
          </button>
        </div>

        {/* Form fields */}
        <div className="px-6 py-5 space-y-4">
          {FORM_FIELDS.map((f) => (
            <div key={f.key}>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                {f.label}
              </label>
              <input
                type={f.type}
                placeholder={f.placeholder}
                value={form[f.key]}
                onChange={(e) => setForm((prev) => ({ ...prev, [f.key]: e.target.value }))}
                className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl bg-slate-50
                  focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-300
                  focus:border-violet-400 transition-all placeholder:text-slate-400"
              />
            </div>
          ))}

          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
              Role
            </label>
            <select
              value={form.role}
              onChange={(e) => setForm((prev) => ({ ...prev, role: e.target.value }))}
              className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-xl bg-slate-50
                focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet-300
                focus:border-violet-400 transition-all"
            >
              <option value="Employee">Employee</option>
              <option value="Manager">Manager</option>
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2.5 px-6 py-4 bg-slate-50 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-600 rounded-xl border
              border-slate-200 hover:bg-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="px-5 py-2 text-sm font-semibold bg-violet-600 text-white rounded-xl
              hover:bg-violet-700 active:scale-95 transition-all shadow-sm"
          >
            {isCreate ? "Add employee" : "Save changes"}
          </button>
        </div>
      </div>
    </div>
  );
}