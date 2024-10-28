import { Link } from "react-router-dom";

import React from "react";

const AdminNavbar = () => {
  return (
    <div>
      <div className="mx-auto px-3 sm:px-5 bg-slate-100 lg:px-6 flex items-center justify-between h-12">
        <div className="mt-10 ml-10 flex items-baseline space-x-3">
          <Link
            to="/admin/dash"
            className="bg-gray-400 px-3 py-2 rounded-md text-lg font-semibold hover:bg-gray-200"
          >
            Dashboard
          </Link>
          <Link
            to="/admin/cretreq"
            className="bg-gray-400 px-3 py-2 rounded-md text-lg font-semibold hover:bg-gray-200"
          >
            CreateRequest
          </Link>
          <Link
            to="/admin/newdon"
            className="bg-gray-400 px-3 py-2 rounded-md text-lg font-semibold hover:bg-gray-200"
          >
            AddDonation
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
