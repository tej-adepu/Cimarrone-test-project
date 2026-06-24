import { useState, useRef, useEffect } from "react";

const Navbar = ({ employee }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-10 shadow-sm">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 bg-blue-600 rounded-md flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <span className="font-semibold text-gray-800 text-lg tracking-tight">Leave Management</span>
      </div>

      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setOpen((prev) => !prev)}
          className="flex items-center gap-3 cursor-pointer focus:outline-none"
        >
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-gray-800">{employee.name}</p>
            <p className="text-xs text-gray-500">{employee.role}</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold text-sm">
            {employee.name.split(" ").map((n) => n[0]).join("")}
          </div>
        </button>

        {open && (
          <div className="absolute right-0 mt-3 w-72 bg-white border border-gray-200 rounded-xl shadow-lg p-4 z-20">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-11 h-11 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-base shrink-0">
                {employee.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">{employee.name}</p>
                <p className="text-xs text-gray-500">{employee.role}</p>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-3 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Employee ID</span>
                <span className="text-gray-700 font-medium">{employee.id}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Department</span>
                <span className="text-gray-700 font-medium">{employee.department}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Email</span>
                <span className="text-gray-700 font-medium truncate ml-4">{employee.email}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Manager</span>
                <span className="text-gray-700 font-medium">{employee.manager}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Joined</span>
                <span className="text-gray-700 font-medium">{employee.joinDate}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;