import React from "react";
import alert1 from "../Images/warning.png";
import alert2 from "../Images/danger-icon.png";
import img1 from "../Images/Donation.svg"
import { Link } from "react-router-dom";

function Card(request) {

  const data = request.request;

  if (data.emergencyLevel === "Normal_Drive") 
  {    
    return <DonationDrive request={data} />;  
  
  }  
  else if (data.emergencyLevel === "Mass_Casualty")
  {
    return <MassCasualty request={data} />;
  }
  else if(data.emergencyLevel === "Immediate")
  {
    return <ImmediateDonation request={data} />
  }
}

const FeedCard = (props) => {

  const{ request } = props;
  

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
        <Card request={request} />
    </div>
  );
};

export default FeedCard;


const DonationDrive = (request) => {
  const data = request.request

  const end_date = data?.endDate_of_Request.substring(0,10);
  const end_time = data?.endDate_of_Request.substring(12,16);

  return (
    <Link to={`/donate/${data.request_id}`} >
      <div className="w-11/12 mt-6 bg-white border-gray-200 rounded-lg shadow">
            <div className="p-2 text-xl font-bold text-[#4200FF]">
              Donation Drive
            </div>
            <div className="bg-blue-600 p-6 grid grid-cols-8 space-x-10 text-white font-semibold text-lg">
            <div>
              <p>
                Blood Groups Required:
              </p>
              <p>{data.bldGrpRequired}</p>
            </div>
              <p>
                End Date of Request: {end_date}
              </p>
              <p>
                End Time: {end_time}
              </p>
              <p>
                Request ID: {data.request_id}
              </p>
              <p>
                Total Units Required: {data.amount_Required}ml
              </p>
              <p>
                Units Remaining: {data.amount_Remaining}ml
              </p>
            </div>
            </div>
    </Link>
  )
}


const MassCasualty = (request) => {
  const data = request.request

  const end_date = data?.endDate_of_Request.substring(0,10);
  const end_time = data?.endDate_of_Request.substring(12,16);
  return (
    <Link to={`/donate/${data.request_id}`} >
      <div className="w-11/12 mt-6 bg-white border-gray-200 rounded-lg shadow">
            <div className="p-2 text-xl font-bold text-red-600">
              Mass Casualty
            </div>
            <div className="bg-red-500 p-6 grid grid-cols-8 space-x-10 text-white font-semibold text-lg">
            <div>
              <p>
                Blood Groups Required:
              </p>
              <p>{data.bldGrpRequired}</p>
            </div>
              <p>
                End Date of Request: {end_date}
              </p>
              <p>
                End Time: {end_time}
              </p>
              <p>
                Request ID: {data.request_id}
              </p>
              <p>
                Total Units Required: {data.amount_Required}ml
              </p>
              <p>
                Units Remaining: {data.amount_Remaining}ml
              </p>
            </div>
            </div>
    </Link>
  )
}

const ImmediateDonation = (request) => {
  const data = request.request

  const end_date = data?.endDate_of_Request.substring(0,10);
  const end_time = data?.endDate_of_Request.substring(12,16);
  
  return (
    <Link to={`/donate/${data.request_id}`}>
      <div className="w-11/12 mt-6 bg-white border-gray-200 rounded-lg shadow">
            <div className="p-2 text-xl font-bold text-red-600">
              Immediate Donation
            </div>
            <div className="bg-red-500 p-6 grid grid-cols-8 space-x-10 text-white font-semibold text-lg">
            <div>
              <p>
                Blood Groups Required:
              </p>
              <p>{data.bldGrpRequired}</p>
            </div>
              <p>
                End Date of Request: {end_date}
              </p>
              <p>
                End Time: {end_time}
              </p>
              <p>
                Request ID: {data.request_id}
              </p>
              <p>
                Total Units Required: {data.amount_Required}ml
              </p>
              <p>
                Units Remaining: {data.amount_Remaining}ml
              </p>
            </div>
            </div>
    </Link>
  )
}

