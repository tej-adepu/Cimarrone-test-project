const EmployeeCard = ({ employee }) => {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 shadow-sm">
      <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xl shrink-0">
        {employee.name.split(" ").map((n) => n[0]).join("")}
      </div>

      <div className="flex-1 min-w-0">
        <h2 className="text-lg font-semibold text-gray-900">{employee.name}</h2>
        <p className="text-sm text-gray-500">{employee.role} · {employee.department}</p>
      </div>

      <div className="flex flex-wrap gap-6 text-sm">
        <div>
          <p className="text-gray-400 text-xs uppercase tracking-wide mb-0.5">Employee ID</p>
          <p className="font-medium text-gray-700">{employee.id}</p>
        </div>
        <div>
          <p className="text-gray-400 text-xs uppercase tracking-wide mb-0.5">Email</p>
          <p className="font-medium text-gray-700">{employee.email}</p>
        </div>
        <div>
          <p className="text-gray-400 text-xs uppercase tracking-wide mb-0.5">Joined</p>
          <p className="font-medium text-gray-700">{employee.joinDate}</p>
        </div>
        <div>
          <p className="text-gray-400 text-xs uppercase tracking-wide mb-0.5">Manager</p>
          <p className="font-medium text-gray-700">{employee.manager}</p>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;