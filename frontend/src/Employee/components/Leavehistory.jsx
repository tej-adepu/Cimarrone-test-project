import { cancelLeave } from "../../api/employeeApi";

const statusStyles = {
  APPROVED: "bg-green-100 text-green-700",
  REJECTED: "bg-red-100 text-red-600",
  PENDING: "bg-yellow-100 text-yellow-700",
  CANCELLED: "bg-gray-100 text-gray-700",
};

const LeaveHistory = ({ leaves, refreshLeaves }) => {

  const handleCancel = async (leaveId) => {

    const confirmed = window.confirm(
      "Are you sure you want to cancel this leave request?"
    );

    if (!confirmed) return;

    try {

      await cancelLeave(leaveId);

      alert("Leave cancelled successfully.");

      await refreshLeaves();

    } catch (err) {

      alert(err.message || "Failed to cancel leave.");

    }
  };

  if (leaves.length === 0) {
    return (
      <div>
        <h3 className="text-base font-semibold text-gray-800 mb-3">
          Leave History
        </h3>

        <div className="bg-white rounded-xl border border-gray-200 p-8 text-center text-gray-400 text-sm">
          No leave records found.
        </div>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-base font-semibold text-gray-800 mb-3">
        Leave History
      </h3>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto max-h-96 overflow-y-auto">

          <table className="w-full text-sm">

            <thead className="bg-gray-50 border-b border-gray-200">

              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Reason
                </th>

                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Start Date
                </th>

                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  End Date
                </th>

                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Days
                </th>

                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Status
                </th>

                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Action
                </th>
              </tr>

            </thead>

            <tbody className="divide-y divide-gray-100">

              {leaves.map((leave) => (

                <tr
                  key={leave.id}
                  className="hover:bg-gray-50 transition-colors"
                >

                  <td className="px-4 py-3 text-gray-800 font-medium max-w-[200px] truncate">
                    {leave.reason}
                  </td>

                  <td className="px-4 py-3 text-gray-600">
                    {leave.startDate}
                  </td>

                  <td className="px-4 py-3 text-gray-600">
                    {leave.endDate}
                  </td>

                  <td className="px-4 py-3">
                    <span className="inline-block bg-gray-100 text-gray-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                      {leave.days} day{leave.days > 1 ? "s" : ""}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                        statusStyles[leave.status]
                      }`}
                    >
                      {leave.status}
                    </span>
                  </td>

                  <td className="px-4 py-3">

                    {leave.status === "PENDING" ? (

                      <button
                        onClick={() => handleCancel(leave.id)}
                        className="bg-red-500 hover:bg-red-600 text-white text-xs font-medium px-3 py-1 rounded-lg transition-colors"
                      >
                        Cancel
                      </button>

                    ) : (

                      <span className="text-gray-400">-</span>

                    )}

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>
      </div>
    </div>
  );
};

export default LeaveHistory;