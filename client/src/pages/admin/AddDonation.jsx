import React from "react";
import SearchBar from "../../components/SearchBar";
import { useState, useEffect } from "react";
import dateFormat from "dateformat";

import toast from "react-hot-toast";
import { useAuth } from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const AddDonation = () => {
  const [exp_arr, set_exp_arr] = useState([]);
  const [requestArr, setRequestArr] = useState([]);
  const [obj, setobj] = useState({});
  const [request, setRequest] = useState({});
  const [amountOfBlood, setAmountOfBlood] = useState("");

  const auth = useAuth();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    axiosPrivate
      .get("/admin/adminget", {
        headers: {
          Authorization: `Bearer ${auth?.auth?.token}`,
        },
      })
      .then((response) => {
        set_exp_arr(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axiosPrivate
      .get("/admin/requestinfo", {
        headers: {
          Authorization: `Bearer ${auth?.auth?.token}`,
        },
      })
      .then((response) => {
        setRequestArr(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const addDonationHistory = () => {
    axiosPrivate
      .post(
        "/admin/addDonationHistory",
        {
          amount_Donated: amountOfBlood,
          request_id: request.request_id,
          donor_id: obj.donor_id,
        },
        {
          headers: {
            Authorization: `Bearer ${auth?.auth?.token}`,
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

  let [Filter, setFilter] = useState("");

  const displayedData = Filter
    ? exp_arr.filter((element) =>
        element?.username.toLowerCase().includes(Filter.toLowerCase())
      )
    : exp_arr;

  const AdminCard = (props) => {
    return (
      <div className="bg-gray-300 h-fill">
        <div className="grid grid-cols-5 font-bold text-sm pl-2 pt-6 pb-6">
          <div>{props?.donor_id}</div>
          <div>{props?.firstName}</div>
          <div>{props?.bloodgrp}</div>
          <div>{props?.phonenum}</div>
          <div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-1 px-1 rounded"
              onClick={() => addDonation(props)}
            >
              Add donation
            </button>
          </div>
        </div>
      </div>
    );
  };
  function addDonation(obj) {
    setobj(obj);
  }

  const RequestCard = (props) => {
    return (
      <div className="bg-gray-300 h-fill">
        <div className="grid grid-cols-5 font-bold text-sm pl-2 pt-6 pb-6">
          <div>{props?.request_id}</div>
          <div>{props?.bldGrpRequired}</div>
          <div className="pr-10">
            {dateFormat(props.end_date, "mmmm dS, yyyy")}
          </div>
          <div>{props.donationType}</div>
          <div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-1 px-1 rounded"
              onClick={() => addRequest(props)}
            >
              Add Request
            </button>
          </div>
        </div>
      </div>
    );
  };
  function addRequest(request) {
    setRequest(request);
  }

  return (
    <div className="h-full pt-10 pl-3">
      <div className="flex flex-row w-full space-x-16">
        <div className="flex-auto">
          <div>
            <h1 className="text-2xl font-bold">Add Donation Details</h1>
            <SearchBar setFilter={setFilter} />
            <div className="p-2">
              {displayedData.map((id) => (
                <AdminCard
                  key={id._id}
                  firstName={id?.firstName}
                  donor_id={id?.donor_id}
                  createdAt={id?.createdAt}
                  bloodgrp={id?.bldgrp}
                  phonenum={id?.phonenum}
                />
              ))}
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold">Donation Requests</h1>
            <div className="p-2">
              {requestArr.map((request) => (
                <RequestCard
                  key={request._id}
                  request_id={request?.request_id}
                  donationType={request?.donationType}
                  end_date={request?.endDate_of_Request}
                  bldGrpRequired={request?.bldGrpRequired}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="pt-5 pl-2 pb-2 pr-20 border-2 border-blue-600 rounded-md h-fit">
          <h1 className="font-bold text-lg">Selected user: {obj?.username}</h1>
          <h1 className="font-bold text-lg">Donor ID: {obj?.donor_id}</h1>
          <h1 className="font-bold text-lg">
            Request ID: {request?.request_id}
          </h1>

          <h1 className="font-bold text-lg">Donation amount:(in ml)</h1>
          <input
            type="number"
            id="default-input"
            className="input-red w-1/2"
            onChange={(e) => setAmountOfBlood(e.target.value)}
          ></input>
          <button
            onClick={addDonationHistory}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5"
          >
            Confirm Donation
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddDonation;
