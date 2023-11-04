import React, { useEffect, useState } from "react";
import FeedCard from "../Components/FeedCard";
import axios from "../axios";

const Feed = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    console.log("Feed route hit");
    axios
      .get(`http://localhost:3031/user/getRequests`)
      .then((response) => {
        console.log("got all requests");
        console.log(response.data);
        setRequests(response.data); // Set the requests data in state
      })
      .catch((error) => {
        console.error("Error fetching requests:", error);
      });
  }, []);

  return (
    <div className="pl-10 pt-10 h-screen">
      <h1 className="font-bold text-4xl">My Feed</h1>
      <div className="mt-10">
        {/* <FeedCard type="Alert"></FeedCard>
        <FeedCard type="Mass"></FeedCard> */}

        {requests.map((request, index) => (
          <FeedCard key={index} request={request} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
