import React from "react";
import { Link } from "react-router-dom";
import successgif from "../images/success.gif";

const Success = () => {
  return (
    <div className="h-screen p-10 font-pop text-center">
      <div className="flex flex-col items-center p-5 justify-center ">
        <h1 className="font-bold text-xl">Thank You For Your Donation</h1>
        <br />
        <img src={successgif} alt="success"></img>
        <Link
          className="focus:outline-none text-white text-xl font-bold mt-5 bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 rounded-lg px-5 py-2.5 mr-2 mb-2"
          to="/dashboard"
        >
          Profile
        </Link>
      </div>
    </div>
  );
};

export default Success;
