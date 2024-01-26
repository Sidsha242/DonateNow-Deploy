import React from 'react'
import { useState, useEffect } from 'react'
import axios from '../axios';
import toast from 'react-hot-toast'

const CurrentRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    
    axios
      .get(`http://localhost:3031/user/getRequests`)
      .then((response) => {
        // console.log("got all requests");
        // console.log(response.data);
        setRequests(response.data); // Set the requests data in state
      })
      .catch((error) => {
        console.error("Error fetching requests:", error);
      });
  }, []);

   
  const deleteReq = (reqId) => {
    //console.log(reqId);
    axios.delete(`http://localhost:3031/user/delReq/${reqId}`)
        .then((response) => {
        console.log(response);
        const newList = requests.filter((item) => item.request_id !== reqId);
        setRequests(newList);
      })
      .catch((error) => 
      {
        console.log(error)
      })
  }

  return (
    <div>
      {requests.map((requests,index) => (
        <div className='flex flex-row space-x-10 p-5 bg-red-100 mt-2'> 
           <p>{requests.request_id}</p>
           <p>{requests.bldGrpRequired}</p>
           <p>{requests.amount_Required}</p>
           <button className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2' onClick={() => deleteReq(requests.request_id)}>Delete</button>
        </div>
       
      ))}
    </div>
  )
}

export default CurrentRequests