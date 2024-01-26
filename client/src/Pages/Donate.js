import React, { useEffect } from 'react'
import { useLocation, useParams } from "react-router-dom";
import { useState } from 'react';

const Donate = () => {

  const routeParams = useParams();
  const [request_id,setRequestId] = useState(routeParams.id  || '0');
  const [status,setStatus] = useState('')
    // request_id = substrig till /


  return (
    <div className='h-screen pt-3 pl-5'>
        <h1 className='font-bold text-red-500 text-6xl text-center'>Ready to Donate?</h1>
        <p className='font-bold text-2xl'>Request id:{request_id}</p>
        <div className='mt-32'>
        <form className="flex flex-col space-y-5">
        <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"/> 
        <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"/> 
        <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"/> 
        <button type="submit" className="flex sm:inline-flex justify-center items-center bg-green-500 hover:bg-green-600 active:bg-green-700 focus-visible:ring ring-green-300 text-white font-semibold text-center rounded-md outline-none transition duration-100 px-5 py-2">I agree to Donate</button>
        </form>
       
        </div>
        <div className='mt-5'>Status:{status}</div>
    </div>
  )
}

export default Donate