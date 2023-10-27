import { Outlet } from "react-router-dom";
import React from "react";
import AdminNavbar from "../Components/AdminNavbar";

const AdminLayout = () => {
  return (
    <>
      <AdminNavbar></AdminNavbar>
      <main className="App bg-sky-100">
        <Outlet />
      </main>
    </>
  );
};

export default AdminLayout;
