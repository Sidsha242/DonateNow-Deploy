import React from "react";
import { axiosPrivate } from "../axios";

import { useAuth } from "../hooks/useAuth";

import { useEffect, useState } from "react";
import QRCode from "react-qr-code";

const DonateRequestInfo = (props) => {
  const auth = useAuth();
  useEffect(() => {
    axiosPrivate
      .get(`/user/getRequestDetails/${props.reqId}`, {
        headers: {
          Authorization: `Bearer ${auth?.auth?.accessToken}`,
        },
      })
      .then((response) => {
        //console.log(response);
        setRequestData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching donor data:", error);
      });
  }, []);

  const [requestData, setRequestData] = useState("");

  return (
    <div className="flex flex-col space-y-10">
      <div className="rounded-md p-2 grid grid-cols-2 lg:px-80">
        <div>
          <p className="underline">Donation Details:</p>
          <p className="font-bold">Request id:&nbsp;{props.reqId}</p>
          <p className="font-bold">
            Status: {requestData?.isDone ? "Completed" : "Active"}
          </p>
          <p className="font-bold">
            Blood Group: {requestData?.bldGrpRequired}
          </p>
          <p className="font-bold">Location: {requestData?.location}</p>
        </div>
        <div className="flex justify-center items-center">
          <QRCode
            size={100}
            value={`https://donatenow.onrender.com/admin/newdon/qr/${props.reqId}/${props.userID}`}
            viewBox={`0 0 256 256`}
          />{" "}
        </div>
      </div>
      <div className="flex justify-center mb-5 rounded-lg p-5">
        <iframe
          src={
            requestData?.requestInfo?.locUrl ||
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3730.3159163484042!2d74.78659287489995!3d13.353088286998426!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbca4a9c4b4ba9b%3A0xd270efcb8ce4678e!2sKasturba%20Hospital%2C%20Manipal!5e1!3m2!1sen!2sin!4v1729403165372!5m2!1sen!2sin"
          }
          title="map-loc"
          width="500"
          height="500"
          loading="lazy"
          className="rounded-[70px]"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default DonateRequestInfo;
