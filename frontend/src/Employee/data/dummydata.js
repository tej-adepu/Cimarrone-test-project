export const employee = {
  id: "EMP-2041",
  name: "Abhinav Reddy",
  role: "Software Engineer Intern",
  department: "Engineering",
  email: "abhinav.reddy@company.com",
  joinDate: "Jan 2024",
  manager: "Ravi Kumar",
};

export const managers = [
  { id: "1", name: "Ravi Kumar", role: "Engineering Manager" },
  { id: "2", name: "Sneha Rao", role: "Team Lead" },
  { id: "3", name: "Arjun Mehta", role: "Project Manager" },
];

export const initialLeaves = [
  {
    id: 1,
    reason: "Family function — cousin's wedding",
    startDate: "2024-03-10",
    endDate: "2024-03-12",
    days: 3,
    status: "Approved",
  },
  {
    id: 2,
    reason: "Medical appointment and recovery",
    startDate: "2024-04-05",
    endDate: "2024-04-05",
    days: 1,
    status: "Approved",
  },
  {
    id: 3,
    reason: "Personal work — travel to hometown",
    startDate: "2024-05-20",
    endDate: "2024-05-22",
    days: 3,
    status: "Rejected",
  },
  {
    id: 4,
    reason: "Sick leave — fever and rest",
    startDate: "2024-06-15",
    endDate: "2024-06-16",
    days: 2,
    status: "Pending",
  },
];

export const initialBalance = {
  total: 18,
  used: 6,
  remaining: 12,
  pending: 2,
};