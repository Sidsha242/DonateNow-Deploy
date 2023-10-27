import React from "react";
import FeedCard from "../Components/FeedCard";

const Feed = () => {
  return (
    <div className="pl-10 pt-10 h-screen">
      <h1 className="font-bold text-4xl">My Feed</h1>
      <div className="mt-10">
        <FeedCard type="Alert"></FeedCard>
        <FeedCard type="Mass"></FeedCard>
      </div>
    </div>
  );
};

export default Feed;
