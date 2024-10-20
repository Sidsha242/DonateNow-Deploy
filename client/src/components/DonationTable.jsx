import React from "react";
import { useState, useEffect } from "react";
import axiosPrivate from "../axios";
import { Link } from "react-router-dom";

import { useAuth } from "../hooks/useAuth";

const DonationTable = (props) => {
  const [donations, setDonations] = useState([]);
  const auth = useAuth();

  useEffect(() => {
    axiosPrivate
      .get(`/user/getAllDonationsofUser/${props.user_id}`, {
        headers: {
          Authorization: `Bearer ${auth?.auth?.accessToken}`,
        },
      })
      .then((response) => {
        setDonations(response.data);
      })
      .catch((error) => {
        console.error("Error fetching donation data:", error);
      });
  }, []);

  return (
    <div className="rounded-md bg-white p-4">
      <h1 className="text-2xl font-bold">Donation History</h1>
      <TableHeader />
      {donations.length === 1 && <TableRow props={donations[0]}></TableRow>}
      {donations.length > 1 &&
        donations.map((donation) => {
          return <TableRow props={donation}></TableRow>;
        })}
      {donations.length === 0 && (
        <div className="text-center font-light text-md">No donations yet</div>
      )}
      {donations.length > 3 ? (
        <Link className="bg-gray-200 p-2 rounded-md text-lg" to="/donhistory">
          See more
        </Link>
      ) : (
        <p> </p>
      )}
    </div>
  );
};

export default DonationTable;

const TableHeader = () => {
  return (
    <div>
      <div className="grid grid-cols-3 font-bold text-lg pt-2 pb-3">
        <div>Date</div>
        <div>Amount Donated</div>
        <div>Donation Id</div>
      </div>
    </div>
  );
};

const TableRow = (props) => {
  const lastDonated = props.props.dateOfDonation;
  let last_don = lastDonated?.slice(0, 10);
  last_don = last_don?.split("-").reverse().join("-");
  return (
    <div className="grid grid-cols-3 gap-2 text-md pl-3 pt-5 pb-5">
      <div>{last_don}</div>
      <div>{props.props.amount_Donated}</div>
      <div>{props.props.donation_id}</div>
    </div>
  );
};
