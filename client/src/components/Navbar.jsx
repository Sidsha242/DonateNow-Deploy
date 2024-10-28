import React, { useEffect } from "react";
import { useState } from "react";
import { Transition } from "@headlessui/react";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";

import logo from "../images/Logo2.svg";
import BellIcon from "./BellIcon";

const Navbar = () => {
  const [isloggedIn, setLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { auth } = useAuth();

  useEffect(() => {
    if (auth?.token !== undefined) {
      setLoggedIn(true);
    }
  }, [auth]);

  return (
    <div>
      <nav className="font-pop bg-transparent mb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex flex-row space-x-12 lg:space-x-96 items-center mr-2">
                <Link to="/" className="flex">
                  <img src={logo} alt="nav-logo"></img>
                  <h1 className="text-4xl ml-2 inline-block font-bold text-red-600">
                    DonateNow
                  </h1>
                </Link>
                <div className="w-8 h-8 animate-pulse">
                  <Link to="/feed">
                    <BellIcon />
                  </Link>
                </div>
              </div>

              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link
                    to="/about"
                    className=" hover:bg-[#FA9884] px-3 py-2 rounded-md"
                  >
                    About
                  </Link>
                  <Link
                    to="/dashboard"
                    className=" hover:bg-[#FA9884]  px-3 py-2 rounded-md"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/admin/dash"
                    className=" hover:bg-[#FA9884]  px-3 py-2 rounded-md"
                  >
                    Admin
                  </Link>

                  {isloggedIn ? (
                    <Link
                      to="/logout"
                      className="bg-[#FF7878] hover:bg-[#FA9884]  py-2 px-4 rounded"
                    >
                      Log Out
                    </Link>
                  ) : (
                    <Link
                      to="/login"
                      className="bg-[#FF7878] hover:bg-[#FA9884]  py-2 px-4 rounded"
                    >
                      Log In
                    </Link>
                  )}
                </div>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        <Transition
          show={isOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="md:hidden" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1 flex flex-col">
              <Link
                to="/about"
                className=" hover:bg-[#FA9884] px-3 py-2 rounded-md"
              >
                About
              </Link>
              <Link
                to="/dashboard"
                className=" hover:bg-[#FA9884]  px-3 py-2 rounded-md"
              >
                Profile
              </Link>
              <Link
                to="/admin/dash"
                className=" hover:bg-[#FA9884]  px-3 py-2 rounded-md sm:hidden"
              >
                Admin
              </Link>

              {isloggedIn ? (
                <Link
                  to="/logout"
                  className="bg-[#FF7878] hover:bg-[#FA9884]  text-white py-2 px-4 rounded font-semibold"
                >
                  Log Out
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="bg-[#FF7878] hover:bg-[#FA9884]  text-white py-2 px-4 rounded font-semibold"
                >
                  Log In
                </Link>
              )}
            </div>
          </div>
        </Transition>
      </nav>
    </div>
  );
};

export default Navbar;
