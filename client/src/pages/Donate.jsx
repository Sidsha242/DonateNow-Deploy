import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import ArrowCircleLeftRoundedIcon from "@mui/icons-material/ArrowCircleLeftRounded";

import { useAuth } from "../hooks/useAuth";

import DonateInfo from "../components/DonateInfo";
import DonateRequestInfo from "../components/DonateRequestInfo";
//import DonateCaro from "../Components/DonateCaro";

const Donate = () => {
  const routeParams = useParams();
  const auth = useAuth();

  const userID = auth?.auth?.donor_id;

  return (
    <div className="p-2 font-pop">
      <Link to="/feed" className="text-xl ml-5 lg:ml-20 mb-5">
        <ArrowCircleLeftRoundedIcon className="mr-2" />
      </Link>
      <div className="flex flex-col space-y-8">
        <h1 className="font-bold text-red-500 text-4xl p-4 lg:text-7xl text-center">
          Ready to Donate?
        </h1>

        <DonateRequestInfo reqId={routeParams.id} userId={userID} />

        <div className="flex flex-col justify-center items-center space-y-1">
          <h1 className="text-3xl pl-3">Steps for Donation</h1>
          <DonateInfo />
          <h1 className="text-red-700 text-3xl font-bold font-heading text-center ">
            Congratualtions you're a hero!
          </h1>
        </div>

        {/* <div className="flex items-center justify-center">
          <DonateCaro />
        </div> */}

        <div className="flex justify-center">
          <Link
            to="/success"
            className="w-3/4 lg:w-1/2 mt-10 mb-10 flex justify-center focus:outline-none text-white bg-red-400 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-md px-5 py-2.5"
          >
            Donation Complete
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Donate;
