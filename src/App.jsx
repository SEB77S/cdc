import React from "react";
import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./layout/DashboardLayout";
import Home from "./pages/Home";

/* Carga unicamente cuando se abre el modulo */
const AdminCRM = React.lazy(() => import("./pages/admin-CRM/AdminCRM"));
const UploadData = React.lazy(() => import("./pages/upload-data/UploadData"));
const GroupSalesVolaris = React.lazy(() =>
  import("./pages/group-sales-volaris/GroupSalesVolaris")
);
import "./App.css";
import Login from "./pages/login/Login";
import useAutoLogin from "./hooks/useAutoLogin";

function App() {
  useAutoLogin();
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Home />} />
        <Route path="admin-crm" element={<AdminCRM />} />
        <Route path="upload-data" element={<UploadData />} />
        <Route path="group-sales-volaris" element={<GroupSalesVolaris />} />
      </Route>
    </Routes>
  );
}

export default App;
