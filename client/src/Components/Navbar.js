import React, { useEffect } from 'react'
import { useState } from "react";
import { Transition } from "@headlessui/react";
import useAuth from '../Hooks/useAuth';

import { Link } from 'react-router-dom';


const Navbar = () => {
    const [isloggedIn, setLoggedIn] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const { auth } = useAuth();

    useEffect(()=>{
        if(auth?.accessToken !== undefined)
        {
            console.log(auth);
            setLoggedIn(true);
            console.log("isLoggedin: "+isloggedIn);
        }
    },[auth])
   

    return (
        <div>
            <nav className="bg-red-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <Link to="/">
                                    <h1 className='text-4xl ml-2 font-bold text-[#F2EEDB] inline-block'>DonateNow</h1>
                                </Link>
                            </div>
                            <div className="hidden md:block">
                                <div className="ml-10 flex items-baseline space-x-4">
                                    <Link to="/about" className="text-[#F2EEDB] hover:bg-[#FA9884] hover:text-white px-3 py-2 rounded-md text-lg font-semibold">
                                            About
                                    </Link>
                                    <Link to="/dashboard" className="text-[#F2EEDB] hover:bg-[#FA9884] hover:text-white px-3 py-2 rounded-md text-lg font-semibold">
                                            Donate
                                    </Link>
                                    <Link to="/admin/dash" className="text-[#F2EEDB] hover:bg-[#FA9884] hover:text-white px-3 py-2 rounded-md text-lg font-semibold">
                                            Admin
                                    </Link>
                                    {
                                        isloggedIn ? 
                                        <Link to="/logout" className="text-[#F2EEDB] hover:bg-[#FA9884] text-white font-bold py-2 px-4 rounded">
                                                Log Out
                                        </Link>
                                         :
                                        <Link to="/login" className="text-[#F2EEDB] hover:bg-[#FA9884] text-white font-bold py-2 px-4 rounded">
                                        Log In
                                        </Link> 
                                    }
                                     <Link to="/feed">
                                     <button className="inline-block relative">
                                       <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" stroke="currentColor">
                                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                        </svg>
                                       <span className="animate-ping absolute top-1 right-0.5 block h-1 w-1 rounded-full ring-2 ring-green-400 bg-green-600"></span>
                                    </button>
                                    </Link>
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
                    {(ref) => (
                        <div className="md:hidden" id="mobile-menu">
                            <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                                    <Link to="/about" className="text-[#F2EEDB] hover:bg-[#FA9884] hover:text-white px-3 py-2 rounded-md text-lg font-semibold">
                                            About
                                    </Link>
                                    <Link to="/dashboard" className="text-[#F2EEDB] hover:bg-[#FA9884] hover:text-white px-3 py-2 rounded-md text-lg font-semibold">
                                            Donate
                                    </Link>
                                    {isloggedIn && <Link to="/logout" className="text-[#F2EEDB] hover:bg-[#FA9884] text-white font-bold py-2 px-4 rounded">
                                                Log Out
                                    </Link>}
                                     <Link to="/login" className="text-[#F2EEDB] hover:bg-[#FA9884] text-white font-bold py-2 px-4 rounded">
                                     Log In
                                     </Link>
                                     <Link to="/feed" className='text-[#F2EEDB] hover:bg-[#FA9884] text-white font-bold py-2 px-4 rounded'>
                                      Notifications
                                    </Link>
                            </div>
                        </div>
                    )}
                </Transition>
            </nav>
        </div>
    )
}

export default Navbar