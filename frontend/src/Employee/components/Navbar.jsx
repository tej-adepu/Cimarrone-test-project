import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ employee }) => {

  const [open, setOpen] =
    useState(false);

  const dropdownRef =
    useRef(null);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear(); // clears JWT and user data
    navigate("/");
  };

  useEffect(() => {

    const handleClickOutside = (
      event
    ) => {

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(
          event.target
        )
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

  }, []);

  if (!employee) {
    return null;
  }

  const initials = employee.name
    ?.split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-10 shadow-sm">

      <div className="flex items-center gap-2">

        <div className="w-7 h-7 bg-blue-600 rounded-md flex items-center justify-center">
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>

        <span className="font-semibold text-gray-800 text-lg">
          Leave Management
        </span>

      </div>

      <div
        className="relative"
        ref={dropdownRef}
      >

        <button
          onClick={() =>
            setOpen(!open)
          }
          className="flex items-center gap-3"
        >

          <div className="hidden sm:block text-right">

            <p className="text-sm font-medium text-gray-800">
              {employee.name}
            </p>

            <p className="text-xs text-gray-500">
              {employee.role}
            </p>

          </div>

          <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold">
            {initials}
          </div>

        </button>

        {open && (

          <div className="absolute right-0 mt-3 w-72 bg-white border border-gray-200 rounded-xl shadow-lg p-4 z-20">

            <div className="flex items-center gap-3 mb-3">

              <div className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                {initials}
              </div>

              <div>

                <p className="text-sm font-semibold">
                  {employee.name}
                </p>

                <p className="text-xs text-gray-500">
                  {employee.role}
                </p>

              </div>

            </div>

            <div className="border-t pt-3 space-y-2">

              <div className="flex justify-between text-xs">
                <span className="text-gray-400">
                  Employee ID
                </span>

                <span className="font-medium">
                  {employee.id}
                </span>
              </div>

              <div className="flex justify-between text-xs">
                <span className="text-gray-400">
                  Department
                </span>

                <span className="font-medium">
                  {employee.department}
                </span>
              </div>

              <div className="flex justify-between text-xs">
                <span className="text-gray-400">
                  Email
                </span>

                <span className="font-medium truncate ml-4">
                  {employee.email}
                </span>
              </div>

              <div className="flex justify-between text-xs">
                <span className="text-gray-400">
                  Manager
                </span>

                <span className="font-medium">
                  {employee.managerName}
                </span>
              </div>

              <button
                  onClick={handleLogout}
                  className="w-full mt-3 bg-red-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition"
              >
                Logout
              </button>

            </div>

          </div>

        )}

      </div>

    </nav>
  );
};

export default Navbar;