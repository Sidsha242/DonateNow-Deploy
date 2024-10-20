import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosPrivate from "../../axios";
import toast from "react-hot-toast";
import { useAuth } from "../../hooks/useAuth";
import DashProfile from "../../components/DashProfile";

const AddDonationQr = () => {
  const routeParams = useParams();

  const reqid = routeParams.reqid;
  const userid = routeParams.userid;
  const [amountOfBlood, setAmountOfBlood] = useState(0);
  const [userData, setUserData] = useState("");
  const [requestData, setRequestData] = useState("");

  const auth = useAuth();

  useEffect(() => {
    axiosPrivate
      .get(`/user/getDetailsOfUser/${userid}`, {
        headers: {
          Authorization: `Bearer ${auth?.auth?.accessToken}`,
        },
      })
      .then((response) => {
        setUserData(response.data);
        //console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching donor data:", error);
      });

    axiosPrivate
      .get(`/user/getRequestDetails/${reqid}`, {
        headers: {
          Authorization: `Bearer ${auth?.auth?.accessToken}`,
        },
      })
      .then((response) => {
        setRequestData(response.data);
        //console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching donor data:", error);
      });
  });

  const addDonationHistory = () => {
    //console.log(amountOfBlood);
    axiosPrivate
      .post(
        "/admin/addDonationHistory",
        {
          amount_Donated: amountOfBlood,
          request_id: reqid,
          donor_id: userid,
        },
        {
          headers: {
            Authorization: `Bearer ${auth?.auth?.accessToken}`,
          },
        }
      )
      .then((response) => {
        toast.success("Donation Added!");
      })
      .catch((error) => {
        toast.error("Error");
        console.log(error);
      });
  };

  return (
    <div className="p-4 h-screen font-pop">
      <h1 className="font-bold text-lg">Donor ID: {userid}</h1>
      <h1 className="font-bold text-lg">Request ID: {reqid}</h1>
      <h1 className="font-bold text-lg">Request ID: {requestData?.bldgrp}</h1>
      <h1 className="font-bold text-lg">
        Request ID: {requestData?.donationType}
      </h1>

      <h1 className="font-bold text-lg">Donation amount:</h1>
      <input
        type="number"
        id="default-input"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        onChange={(e) => setAmountOfBlood(e.target.value)}
      ></input>

      <button
        onClick={addDonationHistory}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5"
      >
        Confirm Donation
      </button>
      <div className="mt-5">
        <h1 className="text-2xl">User Info</h1>
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

export default AddDonationQr;
