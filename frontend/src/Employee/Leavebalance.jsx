const LeaveBalance = ({ balance }) => {
  const cards = [
    { label: "Total Leaves", value: balance.total, color: "bg-blue-50 text-blue-700 border-blue-100" },
    { label: "Used", value: balance.used, color: "bg-red-50 text-red-600 border-red-100" },
    { label: "Remaining", value: balance.remaining, color: "bg-green-50 text-green-700 border-green-100" },
    { label: "Pending Approval", value: balance.pending, color: "bg-yellow-50 text-yellow-700 border-yellow-100" },
  ];

  return (
    <div>
      <h3 className="text-base font-semibold text-gray-800 mb-3">Leave Balance</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {cards.map((card) => (
          <div key={card.label} className={`rounded-xl border p-4 ${card.color}`}>
            <p className="text-3xl font-bold">{card.value}</p>
            <p className="text-xs mt-1 font-medium opacity-80">{card.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaveBalance;