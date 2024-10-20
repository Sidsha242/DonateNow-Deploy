import { Link } from "react-router-dom";
import herogif from "../images/woman_donate.gif";

const Home = () => {
  return (
    <div className="font-pop">
      <div className="mt-12 lg:mt-20 p-5 lg:grid lg:grid-cols-2">
        <img src={herogif} alt="hero-gif"></img>
        <div>
          <div className="font-extrabold text-5xl mb-5 font-pop">
            Help Save <span className="text-red-600 ">Lives</span>
          </div>
          <p className="mb-10 lg:pr-20 font-pop">
            Welcome to our blood donation website where every drop couts towards
            saving lives. Join our community of heroes by registering to donate
            blood and help bridge the gap between patients in need and
            life-saving blood supplies
          </p>
          <Link
            to="/feed"
            className="font-pop text-red-500 hover:text-white border-4 border-red-500 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-full text-xl px-8 py-4 text-center me-2 mb-2 "
          >
            GET STARTED
          </Link>
        </div>
      </div>

      <div className="pr-5 mt-7">
        <div className="bg-red-600 p-10 rounded-tr-[100px]">
          <div className="text-2xl text-white mb-10 font-pop font-bold">
            Our Mission
          </div>

          <div className="text-white font-pop">
            "Our mission is to streamline the blood donation process by
            connecting blood banks with registered donors through our app. With
            just a click of a button, blood banks can send urgent requests for
            specific blood types, empowering donors to save lives efficiently
            and effectively."
          </div>
        </div>
      </div>
      <div className="mt-10">
        <div className="font-bold text-2xl text-[#3C3C3C] mb-1 pl-20 pb-10">
          How to donate
        </div>
        <div className="mb-5 pl-5">
          <ol className="relative border-l border-black pl-10">
            <li className="mb-5 ml-4">
              <div className="absolute w-3 h-3 bg-black rounded-full mt-1.5 -left-1.5 border border-white"></div>
              <p className="mb-1 text-sm font-normal leading-none text-black ">
                Step 1
              </p>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Sign Up.
              </h3>
              <Link
                to="/register"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-200 focus:text-blue-700 mt-5"
              >
                {" "}
                Sign Up
                <svg
                  className="w-3 h-3 ml-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </Link>
            </li>
            <li className="mb-10 ml-4">
              <div className="absolute w-3 h-3 bg-black rounded-full mt-1.5 -left-1.5 border border-white"></div>
              <p className="mb-1 text-sm font-normal leading-none text-black">
                Step 2
              </p>
              <h3 className="text-lg font-semibold text-gray-900 ">
                Search for donation requests
              </h3>
              <Link
                to="/feed"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-200 focus:text-blue-700 mt-5"
              >
                {" "}
                Donate Blood
                <svg
                  className="w-3 h-3 ml-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </Link>
            </li>
            <li className="ml-4">
              <div className="absolute w-3 h-3 bg-black rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
              <p className="mb-1 text-sm font-normal leading-none text-black ">
                Step 3
              </p>
              <h3 className="text-lg font-semibold text-gray-900">
                Reach the mentioned blood bank and donate.
              </h3>
            </li>
          </ol>
          <div className="text-red-500 flex flex-col lg:flex-row lg:space-x-20 mt-10 text-center">
            <div className="flex flex-col mb-8">
              <h1 className="font-bold text-9xl">20</h1>
              <p className="text-2xl">Donors</p>
            </div>
            <div className="flex flex-col">
              <h1 className="font-bold text-9xl">50</h1>
              <p className="text-2xl">Units of Blood</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
