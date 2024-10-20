import React, { useEffect, useState } from "react";
import { axiosPrivate } from "../axios";
import { Link } from "react-router-dom";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import donationDrive from "../images/donation_drive1.png";
import dateFormat from "dateformat";
import { useAuth } from "../hooks/useAuth";

const bldGrpsOptions = [
  { value: "A+", label: "A+" },
  { value: "A-", label: "A-" },
  { value: "B+", label: "B+" },
  { value: "B-", label: "B-" },
  { value: "O+", label: "O+" },
  { value: "O-", label: "O-" },
  { value: "AB+", label: "AB-" },
  { value: "AB-", label: "AB-" },
];

const Feed = () => {
  const [requests, setRequests] = useState([]);
  const [selectedbldGrp, setSelectedBldGrp] = useState("A+");
  const [filteredreq, setFilteredReqs] = useState(requests);
  const auth = useAuth();

  console.log(auth);

  useEffect(() => {
    axiosPrivate
      .get(`/user/getRequests`, {
        headers: {
          Authorization: `Bearer ${auth?.auth?.accessToken}`,
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
      requests.filter((reqst) => reqst.bldGrpRequired === bldGrp)
    );
  };

  const checkAvailable = (date) => {
    if (new Date(date).valueOf() > new Date().valueOf()) return true;
    else return false;
  };

  return (
    <div className="pl-2 pr-2 pt-2 h-full pb-10 lg:p-10 lg:px-56 font-pop">
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
      <div className="mt-10 mb-52">
        <div className="w-full mt-6 bg-blue-100 rounded-lg shadow flex flex-row">
          <div className="flex flex-col items-center justify-center">
            <img src={donationDrive} alt="drive" className="l:w-72 lg:h-44" />
            <button className="w-1/2 text-white bg-primary-700 hover:bg-red-300 font-medium rounded-lg text-lg px-2.5 py-2.5 text-center mt-1 mb-1 animate-pulse">
              Register
            </button>
          </div>
          <div className="p-5">
            <h1 className="font-bold text-2xl">Blood Donation Camp</h1>
            <div className="lg:text-xl text-emerald-700 text-xl font-semibold">
              <LocationOnIcon></LocationOnIcon>
              FC 2
            </div>
            <p className="text-xl">
              November 2nd, 2024
              <br></br>
              10:00 a.m. - 2:00 p.m.
            </p>
          </div>
        </div>
        {filteredreq.length === 0 ? (
          <p className="text-center from-stone-500 text-2xl">
            No Active Donation Requests..
          </p>
        ) : (
          filteredreq.map((request, index) => (
            <div className="mt-6 p-2 bg-red-100 rounded-lg shadow flex flex-row space-x-3 lg:space-x-20">
              <div className="flex flex-col justify-center items-center">
                <p className="bg-red-600 text-white text-6xl p-5 rounded-lg w-fit lg:text-7xl">
                  {request.bldGrpRequired}
                </p>
                {checkAvailable(request.endDate_of_Request) ? (
                  <Link to={`/donate/${request.request_id}`}>
                    <button className="text-white bg-red-700 hover:bg-red-300 font-medium rounded-lg text-lg px-2.5 py-2.5 text-center mt-5 animate-pulse">
                      Donate
                    </button>
                  </Link>
                ) : (
                  <p className="text-2xl p-2 font-bold">
                    Donation Request Expired..
                  </p>
                )}
              </div>
              <div>
                <div>
                  <div className="lg:text-xl text-emerald-700 text-xl font-semibold">
                    <LocationOnIcon></LocationOnIcon>
                    {request?.location}
                  </div>
                  <p className="text-xl flex">
                    <span className="font-bold text-primary-700">
                      {request.donationType}
                    </span>
                  </p>
                  <p className="text-xl">
                    <p className="font-bold">Validity:</p>
                    {dateFormat(request?.endDate_of_Request, "mmmm dS, yyyy")}
                    <br></br>
                    {request.endTime}
                    {parseInt(request.endTime.substring(0, 3)) <= 12
                      ? "a.m."
                      : "p.m."}
                  </p>
                  <p className="text-lg flex">
                    <p className="font-bold">Units Required:&nbsp; </p>
                    {request.amount_Required}
                  </p>
                  <p className="text-lg flex">
                    <p className="font-bold">Units Remaining:&nbsp;</p>
                    {request.amount_Remaining}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Feed;
