import React from "react";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const FeedCard = (request) => {
  const checkAvailable = (date) => {
    if (new Date(date).valueOf() > new Date().valueOf()) return true;
    else return false;
  };
  return (
    <div>
      {request?.request?.emergencyLevel === "donation" && (
        <div
          className={
            "w-full p-2 pl-3 lg:p-8 font-pop rounded-[50px] flex flex-row space-x-4 lg:space-x-20 text-white bg-red-600"
          }
        >
          <div className="flex flex-col justify-center">
            <div className="text-xl text-white font-semibold">
              <LocationOnIcon></LocationOnIcon>
              {request.request?.location}
            </div>
            <p className="font-bold">Validity:</p>
            <p>
              {dateFormat(
                request?.request?.endDate_of_Request,
                "mmmm dS, yyyy"
              )}
              <br></br>
              {request?.request?.endTime}
              {parseInt(request?.request?.endTime.substring(0, 3)) <= 12
                ? "a.m."
                : "p.m."}
            </p>
          </div>
          <div className="flex flex-col space-y-5 p-2 items-center">
            <p className="text-white text-8xl rounded-lg">
              {request?.request?.bldGrpRequired}
            </p>
            {checkAvailable(request?.request?.endDate_of_Request) ? (
              <Link to={`/donate/${request.request.request_id}`}>
                <button className="text-red-600 bg-white hover:bg-red-300 font-medium rounded-full text-xl px-10 py-3 text-center mt-5 animate-pulse">
                  Donate
                </button>
              </Link>
            ) : (
              <p className="text-xl font-bold">Donation Request Expired..</p>
            )}
          </div>
        </div>
      )}

      {request?.request?.emergencyLevel === "drive" && (
        <div
          className={
            "w-full p-2 lg:p-8 font-pop rounded-2xl flex flex-row space-x-3 lg:space-x-4 lg:space-x-20 text-white bg-blue-600"
          }
        >
          <div className="flex flex-col justify-center">
            <div className="text-xl text-white font-semibold">
              <LocationOnIcon></LocationOnIcon>
              {request.request?.location}
            </div>
            <p>
              {dateFormat(
                request?.request?.endDate_of_Request,
                "mmmm dS, yyyy"
              )}
              <br></br>
              {request?.request?.endTime}
              {parseInt(request?.request?.endTime.substring(0, 3)) <= 12
                ? "a.m."
                : "p.m."}
            </p>
          </div>
          <div className="flex flex-col space-y-5 p-2 items-center">
            <p className="text-white text-3xl rounded-lg">
              {request?.request?.title}
            </p>
            {checkAvailable(request?.request?.endDate_of_Request) ? (
              <Link to={`/donate/${request.request.request_id}`}>
                <button className="text-red-600 bg-white hover:bg-red-300 font-medium rounded-full text-xl px-10 py-3 text-center mt-5 animate-pulse">
                  Register
                </button>
              </Link>
            ) : (
              <p className="text-xl font-bold">Donation Drive has Ended..</p>
            )}
          </div>
        </div>
      )}

      {request?.request?.emergencyLevel === "casualty" && (
        <div
          className={
            "w-full p-2 pl-3 lg:p-8 font-pop rounded-[50px] flex flex-row space-x-3 lg:space-x-4 lg:space-x-20 text-white bg-black"
          }
        >
          <div className="flex flex-col justify-center">
            <div className="text-xl text-white font-semibold">
              <LocationOnIcon></LocationOnIcon>
              {request.request?.location}
            </div>

            <p>
              {dateFormat(
                request?.request?.endDate_of_Request,
                "mmmm dS, yyyy"
              )}
              <br></br>
              {request?.request?.endTime}
              {parseInt(request?.request?.endTime.substring(0, 3)) <= 12
                ? "a.m."
                : "p.m."}
            </p>
          </div>
          <div className="flex flex-col space-y-5 p-2 items-center">
            <p className="text-white text-3xl rounded-lg lg:text-5xl">
              {request?.request?.title}
            </p>
            {checkAvailable(request?.request?.endDate_of_Request) ? (
              <Link to={`/donate/${request.request.request_id}`}>
                <button className="text-red-600 bg-white hover:bg-red-300 font-medium rounded-full text-xl px-10 py-3 text-center mt-5 animate-pulse">
                  Donate
                </button>
              </Link>
            ) : (
              <p className="text-xl font-bold">Donation Request Expired..</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedCard;
