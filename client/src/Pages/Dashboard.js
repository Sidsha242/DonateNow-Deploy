import React from 'react'
import { useState, useEffect } from 'react';
import axios from '../axios';

const Dashboard = () => {


  const [usern,setUsername] = useState('');
  const [user_id,setUserid] = useState('');
  const [medata,setMedData] = useState('');


  //  useEffect(() => {
  //   Axios.get(`http://localhost:3031/getmedinfo/${user_id}`, {
  //    }).then((response) => {
  //         console.log(response);
  //        console.log("response received");
  //         //setMedData(response.data);
  //    });

  //  }, []);


  return (
    <div>
       <div className='bg-[#F2EEDB]'>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
        <h1 className='font-bold text-5xl'>Hi {usern} </h1>
            <div className='w-full mt-10 pl-5 bg-[#E3DEC6] rounded-lg shadow h-screen'>
                <div className='grid grid-cols-2 p-6 space-y-4 mt-10'>
                <div>
                <h1 className='text-xl font-bold'>Blood Donated:</h1>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                <div className="bg-red-600 h-2.5 rounded-full" style={{width: "45%"}}></div>
                </div>
                </div>
                <div className='bg-[#F2EEDB] shadow w-min p-5 rounded-xl mx-auto'>
                    <h1 className='text-9xl font-bold'>AB+</h1>
                </div>
              </div>
              <div>
              <div className='grid grid-cols-2 p-6 space-y-4 mt-10'>
                <div>
                <h1 className='text-2xl font-bold'>Donation History:</h1>
                </div>
                <div className='bg-[#F2EEDB] shadow w-96 p-5 rounded-xl mx-auto'>
                    <p className='font-bold p-5 text-lg'>
                      Nearest Hospital:<br></br>
                      KMC Hospital
                      Madhav Nagar, Near Tiger circle Manipal - 576104 Karnataka, India
                    </p>
                </div>
              </div>
              </div>

      </div>
      </div>
      </div>

    </div>
  )
}

export default Dashboard