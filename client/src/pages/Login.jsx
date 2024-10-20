import React from "react";
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";

import axios from "../axios";

const Login = () => {
  const { persist, setPersist, setAuth } = useAuth();

  const [logemail, setEmail] = useState("");
  const [logpassword, setPassword] = useState("");
  const [pastype, setType] = useState("password");

  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  const [loader, setloader] = useState(false);

  const togglePersist = () => {
    setPersist((prev) => !prev);
    localStorage.setItem("persist", !persist);
  };

  const handleToggle = () => {
    if (pastype === "password") {
      setType("text");
    } else {
      setType("password");
    }
  };

  const handleSubmit = async (e) => {
    setloader(true);
    e.preventDefault();
    try {
      const response = await axios.post(
        "/auth/sign_in",
        {
          email: logemail,
          password: logpassword,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response.data.message === "Login Successful") {
        togglePersist(); //
        //console.log(response.data);
        toast.success("Login Successful!");
        const accessToken = response?.data?.accessToken; //accessToken JWT from server stored into auth context
        const role = response?.data?.role;
        const authpassword = response?.data?.result?.password;
        const donor_id = response?.data?.result?.donor_id;

        setAuth({
          id: response?.data?.result?._id,
          donor_id: donor_id,
          email: logemail,
          pass: authpassword,
          role: role,
          token: accessToken,
        }); //saved in global auth context

        navigate(from, { replace: true });
      } else {
        //console.log(response);
        setloader(false);
        toast.error(response?.data?.message);
      }
    } catch (err) {
      //?
      setloader(false);
      console.log(err);
      if (!err?.reponse) {
        toast.error("Login Failed");
      } else if (err.response?.status === 400) {
        toast.error("Missing username or password");
      } else if (err.response?.status === 401) {
        toast.error("Unauthorized");
      } else {
        toast.error("Login Failed");
      }
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center px-4 mx-auto h-screen font-pop">
        {loader ? (
          <div className="flex flex-col">
            <svg
              aria-hidden="true"
              className="inline w-16 h-16 text-gray-200 animate-spin  fill-green-500"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>{" "}
            <p className="text-red-600 font-semibold">Logging In..</p>
          </div>
        ) : (
          <div className="w-full bg-red-100 rounded-lg shadow sm:max-w-md">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-3xl">
                Welcome to <span className="text-red-600">DonateNow</span>
              </h1>

              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Login
              </h1>

              <form
                onSubmit={handleSubmit}
                className="space-y-4 md:space-y-6"
                autoComplete="off"
              >
                <div>
                  <label htmlFor="username" className="mr-2 font-bold">
                    Email :
                  </label>
                  <input
                    type="text"
                    className="input-red"
                    required
                    id="email"
                    name="email"
                    value={logemail}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="mr-2 font-bold">
                    Password :
                  </label>
                  <div className="flex relative">
                    <input
                      type={pastype}
                      className="input-red"
                      required
                      id="password"
                      name="password"
                      value={logpassword}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <span
                      className="absolute right-0 p-2"
                      onClick={handleToggle}
                    >
                      {pastype === "password" ? (
                        <FiEyeOff size={22} />
                      ) : (
                        <FiEye size={22} />
                      )}
                    </span>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-red-600 hover:bg-red-200 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-2.5 py-2.5 text-center"
                >
                  Login
                </button>
              </form>

              <p className="text-sm font-light text-gray-500">
                Don't have an account yet?{" "}
                <Link
                  to="/register"
                  className="font-bold text-lg text-red-600 underline"
                >
                  SignUp
                </Link>
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Login;
