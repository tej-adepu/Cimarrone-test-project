import { useState } from "react";

const ApplyLeaveForm = ({ managers, onSubmit }) => {
  const [form, setForm] = useState({
    reason: "",
    startDate: "",
    endDate: "",
    managerId: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const getDays = () => {
    if (!form.startDate || !form.endDate) return 0;
    const start = new Date(form.startDate);
    const end = new Date(form.endDate);
    const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
    return diff > 0 ? diff : 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.reason.trim()) return setError("Please enter a reason for the leave.");
    if (!form.startDate) return setError("Please select a start date.");
    if (!form.endDate) return setError("Please select an end date.");
    if (new Date(form.endDate) < new Date(form.startDate)) return setError("End date cannot be before start date.");
    if (!form.managerId) return setError("Please select a manager.");

    onSubmit({ ...form, days: getDays() });
    setSubmitted(true);
    setForm({ reason: "", startDate: "", endDate: "", managerId: "" });
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div>
      <h3 className="text-base font-semibold text-gray-800 mb-3">Apply for Leave</h3>
      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
        {submitted && (
          <div className="mb-4 bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-2.5 rounded-lg flex items-center gap-2">
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Leave request submitted successfully!
          </div>
        )}

        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-2.5 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
              Reason for Leave
            </label>
            <textarea
              name="reason"
              value={form.reason}
              onChange={handleChange}
              rows={3}
              placeholder="e.g. Medical appointment, Family function..."
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                Start Date
              </label>
              <input
                type="date"
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                End Date
              </label>
              <input
                type="date"
                name="endDate"
                value={form.endDate}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {getDays() > 0 && (
            <p className="text-xs text-blue-600 font-medium -mt-2">
              Duration: {getDays()} day{getDays() > 1 ? "s" : ""}
            </p>
          )}

          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
              Send Request To
            </label>
            <select
              name="managerId"
              value={form.managerId}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              <option value="">Select a manager</option>
              {managers.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} — {m.role}
                </option>
              ))}
            </select>
          </div>

          <div className="pt-1">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors w-full sm:w-auto"
            >
              Submit Leave Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyLeaveForm;