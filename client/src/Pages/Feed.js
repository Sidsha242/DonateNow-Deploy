import React, { useEffect, useState } from "react";
import FeedCard from "../Components/FeedCard";
import axios from "../axios";

const Feed = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
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
    <div className="pl-10 pt-10 h-full pb-10">
      <h1 className="font-bold text-4xl">My Feed</h1>
      <div className="mt-10">
      <div className="flex space-x-5">
      <div class="flex items-center mb-4">
      <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
      <label for="default-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Donation Drive</label>
      </div>
      <div class="flex items-center mb-4">
      <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
      <label for="default-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Mass Casualty</label>
      </div>
      <div class="flex items-center mb-4">
      <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
      <label for="default-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Immediate Donation</label>
      </div>
      </div>
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
