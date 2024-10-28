import React, { useEffect, useState } from "react";

import { useAuth } from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

import FeedCard from "../components/FeedCard";

const bldGrpsOptions = [
  { value: "A+", label: "A+" },
  { value: "A-", label: "A-" },
  { value: "B+", label: "B+" },
  { value: "B-", label: "B-" },
  { value: "O+", label: "O+" },
  { value: "O-", label: "O-" },
  { value: "AB+", label: "AB+" },
  { value: "AB-", label: "AB-" },
];

const Feed = () => {
  const [requests, setRequests] = useState([]);
  const [selectedbldGrp, setSelectedBldGrp] = useState("A+");
  const [filteredreq, setFilteredReqs] = useState(requests);
  const auth = useAuth();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    axiosPrivate
      .get(`/user/getRequests`, {
        headers: {
          Authorization: `Bearer ${auth?.auth?.token}`,
        },
      })
      .then((response) => {
        setRequests(response.data);
        setFilteredReqs(response.data);
      })
      .catch((error) => {
        console.error("Error fetching requests:", error);
      });
  }, []);

  const filterByBldGrp = (bldGrp) => {
    setSelectedBldGrp(bldGrp);
    setFilteredReqs(
      requests.filter(
        (reqst) =>
          reqst.bldGrpRequired === bldGrp &&
          reqst?.emergencyLevel === "donation"
      )
    );
  };

  return (
    <div className="pl-2 pr-2 pt-2 h-full pb-10 lg:p-10 lg:px-72 font-pop">
      <h1 className="font-bold text-4xl">Donation Requests</h1>
      <div className="mt-5">
        <p className="text-xl">Select Blood Group: </p>
        <select
          value={selectedbldGrp}
          onChange={(e) => filterByBldGrp(e.target.value)}
          className="text-xl p-2"
        >
          {bldGrpsOptions.map((option, i) => {
            return (
              <option value={option.value} key={i} className="text-lg font-pop">
                {option.label}
              </option>
            );
          })}
        </select>
      </div>
      <div className="mt-10 mb-52 lg:mx-40 flex flex-col space-y-3">
        {filteredreq.length === 0 ? (
          <p className="text-center from-stone-500 text-2xl">
            No Active Donation Requests..
          </p>
        ) : (
          filteredreq.map((request, index) => (
            <FeedCard request={request} key={index} />
          ))
        )}
      </div>
    </div>
  );
};

export default Feed;
