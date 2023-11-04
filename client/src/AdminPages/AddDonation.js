import React from "react";
import SearchBar from "../Components/SearchBar";
import { useState, useEffect } from "react";
import axios from "../axios";
import { Popover } from "@headlessui/react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const ADMIN_INFO_URL = "/admin/admininfo";
const GET_ALL_USERS_URL = "/admin/adminget";

const AddDonation = () => {
  const [exp_arr, set_exp_arr] = useState([]);
  const [obj, setobj] = useState({});
  const [amountOfBlood, setAmountOfBlood] = useState("");
  const [reqID, setReqID] = useState("");
  const [donorID, setDonorID] = useState("");
  const [dondate, setDondate] = useState("");
  const [donationType, setDonationType] = useState("");
  const [emergencyLevel, setEmergencyLevel] = useState("");

  useEffect(() => {
    axios
      .get(ADMIN_INFO_URL)
      .then((response) => {
        set_exp_arr(response.data.result);
        console.log(obj);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const addDonationHistory = () => {
    console.log("Inside add donation history");
    axios
      .post("/admin/addDonationHistory", {
        bldGrpDonated: obj.bloodgrp,
        amount_Donated: amountOfBlood,
        request_id: reqID,
        donor_id: donorID,
        // donationType: donationType,
        // emergencyLevel: emergencyLevel,
        // dondate: dondate,
      })
      .then((response) => {
        console.log("Donation history added");
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let [Filter, setFilter] = useState("");

  console.log(exp_arr);
  const displayedData = Filter
    ? exp_arr.filter((element) =>
        element?.username.toLowerCase().includes(Filter.toLowerCase())
      )
    : exp_arr;

  const AdminCard = (props) => {
    //console.log(props)
    return (
      <div className="bg-[#E3DEC6] h-fill">
        <div className="grid grid-cols-5 font-bold text-sm flex pl-2 pt-6 pb-6">
          <div>{props.username}</div>
          <div>{props.email}</div>
          <div className="ml-20">{props.bloodgrp}</div>
          <div>{props.phonenum}</div>
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
    console.log(obj);
    setobj(obj);
  }

  return (
    <div className="h-full p-3 mr-5">
      <div className="grid grid-cols-2">
        <div>
          <h1 className="text-2xl font-bold">Add Donation Details</h1>
          <SearchBar setFilter={setFilter} />
          <div className="p-2">
            {displayedData.map((id) => (
              <AdminCard
                key={id._id}
                username={id?.username}
                email={id?.email}
                createdAt={id?.createdAt}
                bloodgrp={id.usersdetails[0]?.bldgrp}
                phonenum={id?.phonenum}
              />
            ))}
          </div>
        </div>
        <div className="p-5">
          <h1 className="font-bold text-lg">Selected user: {obj.username}</h1>
          <h1 className="font-bold text-lg">Request ID: </h1>
          <input
            type="text"
            id="req_id"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            onChange={(e) => setReqID(e.target.value)}
          ></input>

          <h1 className="font-bold text-lg">Donor ID: </h1>
          <input
            type="text"
            id="donor_id"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            onChange={(e) => setDonorID(e.target.value)}
          ></input>

          <h1 className="font-bold text-lg">Donation amount:(in ml)</h1>
          <input
            type="number"
            id="default-input"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            onChange={(e) => setAmountOfBlood(e.target.value)}
          ></input>

          <div className="mt-3">
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">
                Donation Type
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="Whole_blood"
                name="radio-buttons-group"
                onChange={(e) => setDonationType(e.target.value)}
              >
                <FormControlLabel
                  value="Whole_blood"
                  control={<Radio />}
                  label="Whole Blood"
                />
                <FormControlLabel
                  value="Single_donor_plasma"
                  control={<Radio />}
                  label="Single Donor Plasma"
                />
                <FormControlLabel
                  value="Granulocytes"
                  control={<Radio />}
                  label="Granulocytes"
                />
              </RadioGroup>
            </FormControl>
          </div>
          <div className="mt-5">
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">
                Emergency Level
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="Normal_Drive"
                name="radio-buttons-group"
                onChange={(e) => setEmergencyLevel(e.target.value)}
              >
                <FormControlLabel
                  value="Mass_Casualty"
                  control={<Radio />}
                  label="Mass_Casualty"
                />
                <FormControlLabel
                  value="Immediate"
                  control={<Radio />}
                  label="Immediate"
                />
                <FormControlLabel
                  value="Normal_Drive"
                  control={<Radio />}
                  label="Normal_Drive"
                />
              </RadioGroup>
            </FormControl>
          </div>
          {/* <div className="pb-2">
            <h1>Date of Donation:</h1>
            <DatePicker
              selected={dondate}
              onChange={(date) => setDondate(date)}
            />
          </div> */}
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
