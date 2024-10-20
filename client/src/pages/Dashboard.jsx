import React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

import blood_bag from "../images/blood_bag.svg";
import { axiosPrivate } from "../axios";

import Loading from "../components/Loading";
import DashTitle from "../components/DashTitle";
import DashProfile from "../components/DashProfile";
import DonationTable from "../components/DonationTable";
import DashRegen from "../components/DashRegen";

const Dashboard = () => {
  const auth = useAuth();
  const userID = auth?.auth?.donor_id;
  const [loading, setLoading] = useState(true);

  const [userData, setUserData] = useState("");

  useEffect(() => {
    axiosPrivate
      .get(`/user/getDetailsOfUser/${userID}`, {
        headers: {
          Authorization: `Bearer ${auth?.auth?.accessToken}`,
        },
      })
      .then((response) => {
        setLoading(false);
        setUserData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching donor data:", error);
      });
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <DashTitle
        userImage={userData?.image}
        user_id={userData?.donor_id}
        firstName={userData?.firstName}
      />
      <div className="bg-red-100 pt-4 pb-10 mb-10 font-pop px-1 py-2 lg:p-10 lg:mt-10 space-y-4 lg:mx-28 rounded-lg">
        <div className="text-red-600 flex flex-row space-x-3">
          <div className="bg-white rounded-md p-3 flex flex-col space-y-10">
            <div className="font-bold text-3xl">Blood Group: </div>
            <div className="text-4xl border-2 border-black p-3 rounded-full flex items-center justify-center">
              {userData?.bldgrp}
            </div>
          </div>
          <div className="relative bg-white rounded-md p-4 text-center">
            <img src={blood_bag} alt="blood_bag" className="h-40 w-40"></img>
            <div className="w-full absolute top-0 left-0 text-center mt-16">
              <p className="text-4xl text-white font-bold">
                {userData?.totalAmountDonated}
              </p>
            </div>
            <p className="text-red-400 text-lg mt-2">Total Units Donated</p>
          </div>
          <div className="relative bg-white rounded-md p-8 text-center flex flex-col hidden lg:block w-full">
            <p>Learn more about Donating blood</p>
          </div>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-3 mt-2 space-y-3 lg:space-y-0">
          <DashRegen lastDonatationDate={userData?.lastDonationDate} />

          <DonationTable user_id={userData?.donor_id} />
        </div>

        <h1 className="text-2xl font-bold">Profile Info</h1>
        <DashProfile
          firstName={userData?.firstName}
          lastName={userData?.lastName}
          email={userData?.email}
          phoneNum={userData?.phonenum}
          sex={userData?.sex}
          dob={userData?.dob}
        />
      </div>
    </div>
  );
};

export default Dashboard;
