import { Outlet } from "react-router-dom";
import React from "react";
import Navbar from "../components/Navbar";
import { Toaster } from "react-hot-toast";
import Footer from "../components/Footer";

const Layout = () => {
  return (
    <>
      <Toaster />
      <Navbar></Navbar>
      <main className="App">
        <Outlet />
      </main>
      <Footer></Footer>
    </>
  );
};

export default Layout;
