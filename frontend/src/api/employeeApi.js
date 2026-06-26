import BASE_URL, { getVariables } from "./api";

const getHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const getProfile = async () => {

  const response = await fetch(
    `${BASE_URL}/api/profile`,
    {
      headers: getHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch profile");
  }

  return await response.json();
};

export const getLeaveHistory = async () => {

  const response = await fetch(
    `${BASE_URL}/api/employee/leave/history`,
    {
      headers: getHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch leave history");
  }

  return await response.json();
};

export const applyLeave = async (leaveData) => {

  const response = await fetch(
    `${BASE_URL}/api/employee/leave/apply`,
    {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(leaveData),
    }
  );

  if (!response.ok) {

    const message = await response.text();

    throw new Error(message);
  }

  return await response.json();
};

export const getLeaveBalance =
  async () => {

    const response = await fetch(
      `${BASE_URL}/api/employee/leave/balance`,
      {
        headers: getHeaders(),
      }
    );

    if (!response.ok) {
      throw new Error(
        "Failed to fetch leave balance"
      );
    }

    return await response.json();
};