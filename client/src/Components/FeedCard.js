import React from "react";
import alert1 from "../Images/warning.png";
import alert2 from "../Images/danger-icon.png";

const FeedCard = (props) => {
  const { request } = props;

  // what needs to be displayed in the card
  // 1. type of request
  // 2. blood groups required
  // 3. end date of request
  // 4. Request ID
  // 5. Emergency level
  // 6. total number of units required
  // 7. number of units donated

  return (
    <div>
      {request.type === "Alert" ? (
        <div>
          <a
            href="#"
            className="block w-3/4 p-6 mt-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 grid grid-cols-2"
          >
            <div>
              <img
                src={alert1}
                className="w-10 h-10 animate-pulse"
                alt="Alert 1"
              ></img>
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-red-700">
                Donation Required
              </h5>
              <div className="flex">
                <p className="font-bold text-xl text-gray-700">
                  Blood Groups Required:
                </p>
                <p className="ml-5 font-bold text-xl">
                  {request.bldGrpRequired}
                </p>
              </div>
              <p className="font-bold text-xl text-gray-700">
                End Date of Request: {request.endDate_of_Request}
              </p>
              <p className="font-bold text-xl text-gray-700">
                Request ID: {request.request_id}
              </p>
              <p className="font-bold text-xl text-gray-700">
                Emergency Level: {request.emergencyLevel}
              </p>
              <p className="font-bold text-xl text-gray-700">
                Total Units Required: {request.amount_Required}
              </p>
              <p className="font-bold text-xl text-gray-700">
                Units Remaining: {request.amount_Remaining}
              </p>
            </div>
            <div>
              <h5 className="mb-2 text-xl font-bold tracking-tight">
                Time since donation requested:
              </h5>
            </div>
          </a>
        </div>
      ) : (
        <div>
          <a
            href="#"
            className="block w-3/4 p-6 mt-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100"
          >
            <img
              src={alert2}
              className="w-10 h-10 animate-pulse"
              alt="Alert 2"
            ></img>
            <h5 className="mb-2 text-xl font-bold tracking-tight text-red-700">
              Mass Casualty
            </h5>
            <div className="flex">
              <p className="font-bold text-xl text-gray-700">
                Blood Groups Required:
              </p>
              <p className="ml-5 font-bold text-xl">{request.bldGrpRequired}</p>
              <p className="font-bold text-gray-700">
                End Date of Request: {request.endDate_of_Request}
              </p>
              <p className="font-bold text-gray-700">
                Request ID: {request.request_id}
              </p>
              <p className="font-bold text-gray-700">
                Emergency Level: {request.emergencyLevel}
              </p>
              <p className="font-bold text-gray-700">
                Total Units Required: {request.amount_Required}
              </p>
              <p className="font-bold text-gray-700">
                Units Remaining: {request.amount_Remaining}
              </p>
            </div>
          </a>
        </div>
      )}
    </div>
  );
};

export default FeedCard;
