import { useState } from "react";
import { Avatar, EmployeeModal } from "./SharedComponents";
import { deptColor } from "../Data/mockData";

const EMPTY_FORM = { name: "", email: "", department: "", salary: "", role: "Employee" };

export default function ManageStaffPage({ employees, onSave }) {
  const [modal, setModal] = useState({ open: false, mode: "create", data: null });
  const [form, setForm]   = useState(EMPTY_FORM);

  const openCreate = () => {
    setForm(EMPTY_FORM);
    setModal({ open: true, mode: "create", data: null });
  };

  const openEdit = (emp) => {
    setForm({ name: emp.name, email: emp.email, department: emp.department, salary: emp.salary, role: emp.role });
    setModal({ open: true, mode: "edit", data: emp });
  };

  const closeModal = () => setModal({ open: false, mode: "create", data: null });

  const handleSave = () => {
    onSave(modal, form);
    closeModal();
  };

  return (
    <div className="space-y-5">

      {/* ── Page header ── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-slate-800">Manage staff</h1>
          <p className="text-sm text-slate-400">Add, edit, and manage employee records</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-xl
            bg-violet-600 text-white hover:bg-violet-700 active:scale-95 transition-all shadow-sm"
        >
          + Add employee
        </button>
      </div>

      {/* ── Employees table ── */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
              {["Employee", "Department", "Annual salary", "Role", "Actions"].map((h) => (
                <th key={h} className="text-left px-6 py-3.5 font-semibold border-b border-slate-100">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {employees.map((emp) => (
              <tr key={emp.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <Avatar initials={emp.avatar} idx={emp.id} size="sm" />
                    <div>
                      <p className="font-semibold text-slate-800">{emp.name}</p>
                      <p className="text-xs text-slate-400">{emp.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${deptColor(emp.department)}`}>
                    {emp.department}
                  </span>
                </td>
                <td className="px-6 py-4 text-slate-700 font-medium">
                  ₹{Number(emp.salary).toLocaleString("en-IN")}
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-violet-50 text-violet-700">
                    {emp.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => openEdit(emp)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold
                      rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100
                      hover:border-slate-300 transition-colors"
                  >
                    ✏️ Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Modal (rendered via shared component) ── */}
      <EmployeeModal
        modal={modal}
        form={form}
        setForm={setForm}
        onSave={handleSave}
        onClose={closeModal}
      />
    </div>
  );
}