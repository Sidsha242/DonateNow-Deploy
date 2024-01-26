
'use client';
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";


export default function UserTabs() {
  const path = useLocation(); //to find which path is active
  return (
    <div className="flex font-semibold mx-auto gap-2 justify-center flex-wrap pt-5 pb-2 bg-red-700">
      <Link 
      className="bg-red-400 text-white rounded-full py-2 px-4"
      to="/dashboard">
      Profile
      </Link>
      <Link className="bg-red-400 text-white rounded-full py-2 px-4" to="/donhistory">MyDonations</Link>
      <Link className="bg-red-400 text-white rounded-full py-2 px-4"to="/leaderboard">LeaderBoard</Link>
    </div>
  );
}
