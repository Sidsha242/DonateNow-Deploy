import { useState } from "react";
import React from "react";
import { Fragment } from "react";
import axios from "../axios";
import { Dialog, Transition } from "@headlessui/react";
import toast from "react-hot-toast";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { red } from "@mui/material/colors";

import { useEffect } from "react";

const Register = () => {
  const [passwordReg, setPasswordReg] = useState("");
  const [emailReg, setEmailReg] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phonenumReg, setPhoneNumReg] = useState("");
  const [bldgrp, setBldGrp] = useState("");
  const [dob, setDob] = useState(new Date());
  const [selectedGender, setSelectedGender] = useState("");
  const [message, setMessage] = useState("");

  const [reg_otp, setOtp] = useState("");
  const [isCorrectAge, setIsCorrectAge] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
  };

  const register = () => {
    axios
      .post("/auth/register", {
        email: emailReg,
        password: passwordReg,
        firstName: firstName,
        lastName: lastName,
        phonenum: phonenumReg,
        bldgrp: bldgrp,
        dob: dob,
        sex: selectedGender,
      })
      .then((response) => {
        //console.log(response);
        setTimeout(() => {
          window.location.href = "/login";
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function registerClick() {
    setIsLoading(true);
    axios
      .get(`/otp/sendOTP/${emailReg}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((response) => {
        //console.log(response);
        if (response.status === 200) {
          toast.success("OTP Sent");
          setMessage("OTP Sent At Email");
          setIsOpen(true);
        }
      })
      .catch((error) => {
        if (error.response.status === 400) {
          setMessage("Account with this Email Already Exists");
        } else {
          toast.error("OTP Error");
          setMessage("Error In sending OTP at");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function verifyOTP(otp) {
    axios
      .get(`/otp/verifyOTP/${emailReg}/${otp}`)
      .then((response) => {
        //console.log(response);
        toast.success("Success");
        register();
        closeModal();
      })
      .catch((error) => {
        toast.error("Error");
        console.log(error);
      });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    verifyAge();
  }, [dob]);

  const verifyAge = () => {
    var today = new Date();
    var age = today.getFullYear() - dob.getFullYear();
    var m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    if (age >= 18 && age <= 65) {
      setIsCorrectAge(true);
    } else {
      setIsCorrectAge(false);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center px-2 py-5 mx-auto font-pop">
        <div className="w-full rounded-lg shadow lg:w-3/4">
          <div className="space-y-4 p-4 lg:p-6 ">
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
              Sign Up
            </h1>
            <form
              onSubmit={handleSubmit}
              className="space-y-4 md:space-y-6"
              autoComplete="off"
            >
              <div>
                <input
                  type="text"
                  className="bg-gray-50 border-2 border-red-600 sm:text-md rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3"
                  required
                  id="EmailReg"
                  name="EmailReg"
                  placeholder="Email"
                  value={emailReg}
                  onChange={(e) => setEmailReg(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="text"
                  className="bg-gray-50 border-2 border-red-600 sm:text-md rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3"
                  required
                  id="passwordReg"
                  name="passwordReg"
                  placeholder="Password..."
                  value={passwordReg}
                  onChange={(e) => setPasswordReg(e.target.value)}
                />
              </div>

              <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>

              <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
                Medical Info
              </h1>

              <div>
                <input
                  type="text"
                  className="bg-gray-50 border-2 border-red-600 sm:text-md rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3"
                  required
                  id="firstNameReg"
                  name="FirstNameReg"
                  placeholder="First Name.."
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div>
                <input
                  type="text"
                  className="bg-gray-50 border-2 border-red-600 sm:text-md rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3"
                  required
                  id="lastNameReg"
                  name="LastNameReg"
                  placeholder="Last Name.."
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>

              <div>
                <input
                  type="text"
                  className="bg-gray-50 border-2 border-red-600 sm:text-md rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3"
                  required
                  id="phonenumReg"
                  name="phonenumReg"
                  placeholder="Phone Number"
                  value={phonenumReg}
                  onChange={(e) => setPhoneNumReg(e.target.value)}
                />
              </div>

              <div className="flex flex-row space-x-5 text-2xl py-8">
                <h3 className="font-bold">Sex:</h3>
                <label>
                  <input
                    type="radio"
                    value="Male"
                    className="mr-2 w-4 h-4"
                    checked={selectedGender === "Male"}
                    onChange={handleGenderChange}
                  />
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    value="Female"
                    className="mr-2 w-4 h-4"
                    checked={selectedGender === "Female"}
                    onChange={handleGenderChange}
                  />
                  Female
                </label>
                <label>
                  <input
                    type="radio"
                    value="Other"
                    className="mr-2 w-4 h-4"
                    checked={selectedGender === "Other"}
                    onChange={handleGenderChange}
                  />
                  Other
                </label>
              </div>
              <div>
                <label
                  htmlFor="blood-group"
                  className="block mb-3 items-start font-bold mt-2 text-2xl"
                >
                  Blood Group:
                </label>
                <FormControl fullWidth>
                  <Select
                    id="blood-group"
                    value={bldgrp}
                    variant="outlined"
                    label="blood-group"
                    sx={{
                      color: red,
                      border: "3px solid red",
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        border: "0px",
                      },
                    }}
                    onChange={(e) => setBldGrp(e.target.value)}
                  >
                    <MenuItem value={"A+"} sx={{ fontSize: 22 }}>
                      A+
                    </MenuItem>
                    <MenuItem value={"A-"} sx={{ fontSize: 22 }}>
                      A-
                    </MenuItem>
                    <MenuItem value={"B+"} sx={{ fontSize: 22 }}>
                      B+
                    </MenuItem>
                    <MenuItem value={"B-"} sx={{ fontSize: 22 }}>
                      B-
                    </MenuItem>
                    <MenuItem value={"O+"} sx={{ fontSize: 22 }}>
                      O+
                    </MenuItem>
                    <MenuItem value={"O-"} sx={{ fontSize: 22 }}>
                      O-
                    </MenuItem>
                    <MenuItem value={"AB+"} sx={{ fontSize: 22 }}>
                      AB+
                    </MenuItem>
                    <MenuItem value={"AB-"} sx={{ fontSize: 22 }}>
                      AB-
                    </MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div>
                <label
                  htmlFor="dob"
                  className="block mb-3 items-start font-bold mt-2 text-xl"
                >
                  Date Of Birth:
                </label>
                <div className="border-2 border-red-500 rounded-md p-2 w-fit">
                  <input
                    type="date"
                    value={dob}
                    onChange={(date) => setDob(date)}
                  />
                </div>
              </div>
              <div className="pt-8 flex items-center justify-center">
                {isCorrectAge ? (
                  <button
                    type="submit"
                    className="w-80 text-white bg-red-700 hover:bg-red-300 font-medium rounded-lg text-lg px-2.5 py-2.5 text-center"
                    onClick={registerClick}
                  >
                    {isLoading && (
                      <svg
                        aria-hidden="true"
                        role="status"
                        class="inline w-4 h-4 me-3 text-white animate-spin"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="#E5E7EB"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentColor"
                        />
                      </svg>
                    )}
                    Register
                  </button>
                ) : (
                  <p className="text-xl font-semibold border-2 border-red-500 rounded-lg p-5">
                    *The age of the donor must be above 18 years and below 65
                    years of age.*
                  </p>
                )}
              </div>

              <p className="text-2xl font-semibold">{message}</p>
            </form>
          </div>
        </div>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    OTP sent at{emailReg}
                  </Dialog.Title>

                  <div>
                    <div>
                      <p>Enter OTP</p>
                      <div>
                        <input
                          className="input-red"
                          value={reg_otp}
                          onChange={(e) => setOtp(e.target.value)}
                        ></input>
                      </div>
                    </div>
                    <div className="mt-4">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={(e) => verifyOTP(reg_otp)}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Register;
