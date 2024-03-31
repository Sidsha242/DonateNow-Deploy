import React from 'react'
import { useParams } from "react-router-dom";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ArrowCircleLeftRoundedIcon from '@mui/icons-material/ArrowCircleLeftRounded';

const Donate = () => {
  const routeParams = useParams();
  const [request_id,setRequestId] = useState(routeParams.id  || '0');
  const [status,setStatus] = useState('')

  return (
    <div className='h-screen pt-3 pl-5'>
    <Link to='/feed' className='text-xl ml-5 lg:ml-20 mb-5'>
    <ArrowCircleLeftRoundedIcon className='mr-2'/>
      Feed</Link>
      
        <h1 className='font-bold text-red-500 text-4xl p-4 lg:text-6xl text-center font-cust1'>Ready to Donate?</h1>
        <p>Donation Request Details:</p>
        <p className='font-bold text-2xl'>Request id:{request_id}</p>
        <p className='font-bold'>Status:</p>
    </div>
  )
}

export default Donate