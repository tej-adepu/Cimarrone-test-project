import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./Pages/Login";
import ManagerDashboard from "./Manager/ManagerDashboard";
import EmployeeDashboard from "./Employee/components/EmployeeDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/manager/dashboard"
          element={<ManagerDashboard />}
        />

        <Route
          path="/employee/dashboard"
          element={<EmployeeDashboard />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;