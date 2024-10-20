import React from "react";
import dateFormat from "dateformat";

const DashProfile = (props) => {
  return (
    <div className="bg-white rounded-md p-10 mt-3 text-lg">
      <div className="flex flex-row space-x-6">
        <label className="w-32 font-bold">Full Name</label>{" "}
        <p>
          {props.firstName} {props.lastName}
        </p>
      </div>
      <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
      <div className="flex flex-row space-x-6">
        <label className="w-32 font-bold">Email</label> <p>{props.email}</p>
      </div>
      <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
      <div className="flex flex-row space-x-6">
        <label className="w-32 font-bold">Phone No.</label>{" "}
        <p>{props.phoneNum}</p>
      </div>
      <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
      <div className="flex flex-row space-x-6">
        <label className="w-32 font-bold">Gender:</label> <p>{props.sex}</p>
      </div>
      <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
      <div className="flex flex-row space-x-6">
        <label className="w-32 font-bold">Date of Birth:</label>{" "}
        <p>{dateFormat(props.dob, "mmmm dS, yyyy")}</p>
      </div>
    </div>
  );
};

export default DashProfile;
