import React from "react";
import { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { InputLabel } from "@mui/material";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import { useAuth } from "../../hooks/useAuth";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const EditRequest = () => {
  const routeParams = useParams();
  const request_id = routeParams.id || "0";

  const [bldgrp, setBldGrp] = useState("");
  const [enddate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [donationType, setDonationType] = useState("");
  const [emergencyLevel, setEmergencyLevel] = useState("");
  const [amountOfBlood, setAmountOfBlood] = useState("");
  const [location, setLocation] = useState("");
  const [locUrl, setlocUrl] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const auth = useAuth();
  const axiosPrivate = useAxiosPrivate();

  const editRequest = () => {
    axiosPrivate
      .put(
        "/admin/editRequest",
        {
          request_id: request_id,
          bldGrpRequired: bldgrp,
          amount_Required: amountOfBlood,
          amount_Remaining: amountOfBlood,
          endDate_of_Request: enddate,
          endTime: endTime,
          location: location,
          locUrl: locUrl,
          title: title,
          donationType: donationType,
          emergencyLevel: emergencyLevel,
        },
        {
          headers: {
            Authorization: `Bearer ${auth?.auth?.token}`,
          },
        }
      )
      .then((response) => {
        toast.success("Request Edited!");
        setMessage("Request Created Successfully");
        //console.log(response?.data?.result?.requet_id);
        //setReqId(response?.data?.result?.request_id);
      })
      .catch((error) => {
        setMessage("Error");
        console.log(error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="p-10 h-full">
      <h1 className="text-2xl font-bold">Edit Request</h1>
      <p>Request Id: {request_id}</p>

      <form onSubmit={handleSubmit} className="space-y-4 ">
        <div className="mt-5 text-xl font-bold">
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">
              Type of Request
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="Donation"
              name="radio-buttons-group"
              onChange={(e) => setEmergencyLevel(e.target.value)}
            >
              <FormControlLabel
                value="donation"
                control={<Radio />}
                label="Donation"
              />
              <FormControlLabel
                value="drive"
                control={<Radio />}
                label="Drive"
              />
              <FormControlLabel
                value="casualty"
                control={<Radio />}
                label="Mass Casualty"
              />
            </RadioGroup>
          </FormControl>
        </div>

        <label
          htmlFor="blood-group"
          className="block mb-3 items-start font-bold mt-2"
        >
          Blood Group:
        </label>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Blood Group</InputLabel>
          <Select
            id="blood-group"
            value={bldgrp}
            label="blood-group"
            onChange={(e) => setBldGrp(e.target.value)}
          >
            <MenuItem value={"A+"}>A+</MenuItem>
            <MenuItem value={"A-"}>A-</MenuItem>
            <MenuItem value={"B+"}>B+</MenuItem>
            <MenuItem value={"B-"}>B-</MenuItem>
            <MenuItem value={"O+"}>O+</MenuItem>
            <MenuItem value={"O-"}>O-</MenuItem>
            <MenuItem value={"AB+"}>AB+</MenuItem>
            <MenuItem value={"AB-"}>AB-</MenuItem>
          </Select>
        </FormControl>

        <h1 className="font-bold text-lg">Blood group selected:{bldgrp}</h1>
        <label
          htmlFor="bldAmount"
          className="block mb-2 text-sm font-lg font-bold"
        >
          Amount of blood to be donated:
        </label>
        <input
          type="number"
          id="bldAmount"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 "
          placeholder="100"
          onChange={(e) => setAmountOfBlood(e.target.value)}
          required
        ></input>

        <h1>End Date of Donation:</h1>
        <input type="date" onChange={(e) => setEndDate(e.target.value)}></input>

        <div>
          <label htmlFor="password" className="mr-2 font-bold">
            End Time :
          </label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          ></input>
        </div>
        <label
          htmlFor="location"
          className="block mb-2 text-sm font-lg font-bold"
        >
          Location of Donation:
        </label>
        <input
          type="text"
          id="location"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 "
          placeholder="KMC Hospital"
          onChange={(e) => setLocation(e.target.value)}
          required
        ></input>

        <label
          htmlFor="locationUrl"
          className="block mb-2 text-sm font-lg font-bold"
        >
          Google Maps Link:
        </label>
        <input
          type="text"
          id="location"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 "
          placeholder="https://maps.app.goo.gl/gJchueVcYryLveSz9"
          onChange={(e) => setlocUrl(e.target.value)}
        ></input>

        <label htmlFor="title" className="block mb-2 text-lg font-lg font-bold">
          Title for Drive (Only for drives - Not for donations):
        </label>
        <input
          type="text"
          id="title"
          className="input-red w-3/4"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        ></input>

        <div>
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
                label="Whole blood"
              />
              <FormControlLabel
                value="Single_donor_plasma"
                control={<Radio />}
                label="Single donor plasma"
              />
              <FormControlLabel
                value="Granulocytes"
                control={<Radio />}
                label="Granulocytes"
              />
            </RadioGroup>
          </FormControl>
        </div>

        <button
          type="submit"
          className="w-full mt-5 text-white bg-emerald-400 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-2.5 py-2.5 text-center"
          onClick={editRequest}
        >
          Edit Request
        </button>
        <h2>{message}</h2>
      </form>
    </div>
  );
};

export default EditRequest;
