const BASE_URL = "http://localhost:8080";

const getHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

// --------------------
// Manager Profile
// --------------------

export const getProfile = async () => {

  const response = await fetch(
    `${BASE_URL}/api/manager/profile`,
    {
      headers: getHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch profile");
  }

  return await response.json();
};

// --------------------
// Employees
// --------------------

export const getEmployees = async () => {

  const response = await fetch(
    `${BASE_URL}/api/manager/employees`,
    {
      headers: getHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch employees");
  }

  return await response.json();
};

// --------------------
// Employee Leave History
// --------------------

export const getEmployeeLeaves = async (
  employeeId
) => {

  const response = await fetch(
    `${BASE_URL}/api/manager/employees/${employeeId}/leaves`,
    {
      headers: getHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch leave history");
  }

  return await response.json();
};

// --------------------
// Create Employee
// --------------------

export const createEmployee = async (
  employee
) => {

  const response = await fetch(
    `${BASE_URL}/api/manager/employees`,
    {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(employee),
    }
  );

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return await response.json();
};

// --------------------
// Update Employee
// --------------------

export const updateEmployee = async (
  id,
  employee
) => {

  const response = await fetch(
    `${BASE_URL}/api/manager/employees/${id}`,
    {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify(employee),
    }
  );

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return await response.json();
};

// --------------------
// Approve / Reject Leave
// --------------------

export const updateLeaveStatus = async (
  leaveId,
  status
) => {

  const response = await fetch(
    `${BASE_URL}/api/manager/leaves/${leaveId}`,
    {
      method: "PUT",
      headers: getHeaders(),
      body: JSON.stringify({
        status,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return await response.json();
};