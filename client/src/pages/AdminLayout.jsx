import { Outlet } from "react-router-dom";
import React from "react";
import AdminNavbar from "../components/AdminNavbar";

const AdminLayout = () => {
  return (
    <>
      <AdminNavbar></AdminNavbar>
      <main className="App bg-slate-100 font-cust1">
        <Outlet />
      </main>
    </>
  );
};

export default AdminLayout;
