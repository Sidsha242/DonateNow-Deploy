import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Axios from "axios";

import { useState } from "react";

const MedInfo = () => {
  const [bldgrp, setBldGrp] = useState("");
  const [age, setAge] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [message, setMessage] = useState("");

  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  const medinfo = async () => {
    try {
      const response = await Axios.post(
        "http://localhost:3031/user/addMedInfo",
        {
          donor_id: loggedInUser.donor_id,
          bldgrp: bldgrp,
          age: age,
          sex: selectedGender,
        }
      );

      console.log(response);
      console.log("MedInfo added");

      // Remove user from local storage
      localStorage.removeItem("user");

      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1000);
    } catch (error) {
      console.error("Error adding MedInfo:", error);
      // Handle the error, e.g., display an error message to the user
      setMessage(error.response.data.message);
    }
  };

  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="bg-[#F2EEDB]">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
        <div className="w-full mt-10 bg-[#E3DEC6] rounded-lg shadow">
          <div className="p-6 space-y-4">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900">
              Medical Info
            </h1>
            <p style={{ color: "red" }}>{message}</p>
            <form onSubmit={handleSubmit} className="space-y-4 ">
              <div>
                <h3>Select Gender:</h3>
                <label>
                  <input
                    type="radio"
                    value="Male"
                    checked={selectedGender === "Male"}
                    onChange={handleGenderChange}
                  />
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    value="Female"
                    checked={selectedGender === "Female"}
                    onChange={handleGenderChange}
                  />
                  Female
                </label>
                <label>
                  <input
                    type="radio"
                    value="Other"
                    checked={selectedGender === "Other"}
                    onChange={handleGenderChange}
                  />
                  Other
                </label>
                <p>Selected Gender: {selectedGender}</p>
              </div>
              <div>
                <label
                  htmlFor="blood-group"
                  className="block mb-3 items-start font-bold mt-2"
                >
                  Blood Group:
                </label>
                <FormControl fullWidth>
                  {/* <InputLabel id="demo-simple-select-label">Blood Group</InputLabel> */}
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
              </div>
              <div>
                <label
                  htmlFor="age"
                  className="block mb-3 items-start font-bold mt-2"
                >
                  Age:
                </label>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  required
                  id="age"
                  name="age"
                  placeholder="18-60"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="age"
                  className="block mb-3 items-start font-bold mt-2"
                >
                  Ever had TB, bronchial asthma or allergic disorder, liver
                  disease, kidney disease, fits or fainting, blue or purple
                  spots on the skin or mucous membranes, received human
                  pituitary - growth hormones etc .
                </label>
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel
                      value="yes"
                      control={<Radio />}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="no"
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              <div>
                <label
                  htmlFor="file"
                  className="block mb-3 items-start font-bold mt-2"
                >
                  Medical Certificate:
                </label>
                <input type="file" />
              </div>
              <button
                type="submit"
                className="w-80 text-white bg-emerald-400 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-2.5 py-2.5 text-center"
                onClick={medinfo}
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedInfo;
