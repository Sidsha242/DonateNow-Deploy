import React from "react";
import { useState, useEffect } from "react";
import axios from "../axios";
import { useAuth } from "../Hooks/useAuth";


import CountUp from "react-countup";

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

import { motion } from "framer-motion";
import UserTabs from "../Components/UserTabs";
import ProfileForm from "../Components/ProfileForm";

const Dashboard = () => {
  const auth = useAuth();

  const [medData, setMedData] = useState("");
  const [donations, setDonations] = useState([]);

  const userID = auth?.auth?.donor_id;
  console.log(auth);
  useEffect(() => {
    console.log("Fetching data for user_id:", userID); // Log user_id before making the request

    axios
      .get(`http://localhost:3031/user/getDetailsOfUser/${userID}`, {
        headers: {
          Authorization: `Bearer ${auth?.auth?.token}`,
        },
      })
      .then((response) => {
        console.log("got all details of the user");
        setMedData(response.data); // Assuming response.data is an array of donor data
      })
      .catch((error) => {
        console.error("Error fetching donor data:", error);
      });
  }, []); // Only run this effect when user_id changes

  console.log(medData);
  const user = medData;
  const bldAmount = medData?.medInfo?.totalAmountDonated || 0;
  const lastDonated = medData?.medInfo?.lastDonationDate;

  useEffect(() => {
    async function fetchData() {
      axios
        .get(`http://localhost:3031/user/getAllDonationsofUser/${userID}`, {
          headers: {
            Authorization: `Bearer ${auth?.auth?.token}`,
          },
        })
        .then((response) => {
          console.log("got all donation history of the user");
          console.log(response.data);
          // const data = await response.json();
          setDonations(response.data);
          console.log(donations);
        })
        .catch((error) => {
          console.error("Error fetching donation data:", error);
        });
    }
    fetchData();
  }, []); // Only run this effect when user_id changes

  return (
    <div>
      <div className="bg-red-700 rounded-b-3xl pb-16">
      <UserTabs/>
        <div className="flex flex-col items-center justify-center pt-5">
          <h1 className="text-5xl mt-10 text-white"><span className="font-poppins">Hi</span> <span className="font-bold">{user?.username}</span> </h1>
          </div>
        </div>
          <div className="w-full mt-10 pl-5 pr-5 pb-5">
            <div className="grid grid-cols-2 mt-10">
              <div className="rounded-md bg-white pl-10 grid grid-cols-2">
              <div className="pt-8">
                  <div className="flex">
                    <div className="text-red-500 text-8xl font-poppins">
                      <CountUp end={bldAmount} duration={10} />
                    </div>
                    <div className="text-red-500 text-3xl">ml</div>
                  </div>
                  <h1 className="text-2xl text-red-500 font-bold">
                    of Blood Donated
                  </h1>
              </div>
              <div  className="mt-3 mb-3" style={{ width: 200, height: 200 }}>
                <CircularProgressbar value={bldAmount/100} maxValue={1}
                 styles={buildStyles({
                  rotation: 0.25,
                  strokeLinecap: 'butt',
                  pathTransitionDuration: 0.5,
                  pathColor: `rgb(239 68 68)`,
                  trailColor: '#d6d6d6',
                  backgroundColor: '#3e98c7',})} />
              </div>
              </div>
              <div className="bg-[#F2EEDB] shadow w-min p-8 rounded-xl mx-auto">
                <h2 className="font-poppins font-semibold font-lg">Your Blood Group:</h2>
                <h1 className="text-9xl font-bold">{user?.medInfo?.bldgrp}</h1>
              </div>
            </div>
            <ProfileForm/>
            </div>
          </div>
  );
};

export default Dashboard;

// const TableHeader = () => {
//   // {console.log(props)}
//   return (
//     <div>
//       <div className="grid grid-cols-3 gap-4 font-bold text-lg flex pt-5 pb-5">
//         <div>Donation Date</div>
//         <div>Amount Donated</div>
//         <div>Plasma/Platelets/Red cells/Whole blood</div>
//       </div>
//     </div>
//   );
// };

// const TableRow = () => {
//   // {console.log(props)}
//   return (
//     <div>
//       <div className="grid grid-cols-3 gap-4 text-md flex pl-3 pt-5 pb-5 font-poppins">
//         <div>14/09/23</div>
//         <div>500ml</div>
//         <div>Plasma</div>
//       </div>
//     </div>
//   );
// };
