import { Outlet } from "react-router-dom";
import React from "react";
import Navbar from "../Components/Navbar";
import { Toaster } from 'react-hot-toast'

const Layout = () => {
  return (
    <>
     <Toaster />
      <Navbar></Navbar>
      <main className="App bg-[#F2EEDB]">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;

// outlet component is used to render all the child routes of a parent route
// it represents all the children of layout component
