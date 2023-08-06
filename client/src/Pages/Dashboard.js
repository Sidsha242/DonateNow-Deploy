import React from 'react'
import { useState, useEffect } from 'react';
import Axios from 'axios';

const Dashboard = () => {


  const [usern,setUsername] = useState('');
  const [user_id,setUserid] = useState('');
  const [medata,setMedData] = useState('');


  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    setUsername(loggedInUser.username);
    setUserid(loggedInUser._id);
    Axios.get(`http://localhost:3031/getmedinfo/${user_id}`, {
    }).then((response) => {
         console.log(response);
         console.log("response received");
         //setMedData(response.data);
    });

  }, []);



  

  return (
    <div>
       <div className='bg-[#F2EEDB]'>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
        <h1 className='font-bold text-5xl'>Hi {usern} </h1>
            <div className='w-full mt-10 bg-[#E3DEC6] rounded-lg shadow h-screen'>
                <div className='grid grid-cols-2 p-6 space-y-4 mt-10'>
                <div>
                <h1 className='text-xl font-bold'>Blood Donated:</h1>
                <div class="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
                <div class="bg-red-600 h-2.5 rounded-full dark:bg-red-500" style={{width: "45%"}}></div>
                </div>
                </div>
                <div className='bg-[#F2EEDB] shadow w-min p-5 rounded-xl mx-auto'>
                    <h1 className='text-9xl font-bold'>AB+</h1>
                </div>

                </div>

      </div>
      </div>
      </div>

    </div>
  )
}

export default Dashboard