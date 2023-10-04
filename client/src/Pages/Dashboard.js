import React from 'react'
import { useState, useEffect } from 'react';
import axios from '../axios';

import img1 from '../Images/donate_icon.png'
import img2 from "../Images/blood-donation.svg"
import gif1 from '../Images/woman_donate.gif'
import CountUp from 'react-countup';

import { motion } from "framer-motion"

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
            <div className='w-full mt-10 p-5 bg-[#E3DEC6] rounded-lg shadow h-full'>
              <div className='mt-5 flex flex-row'>
                <div className='bg-red-500 rounded-md w-80 p-5 basis-1/3'>
                <motion.div className='' initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{duration: 0.9,delay: 0.5,ease: [0, 0.71, 0.2, 1.01]}}>
                  <div className='text-white font-poppins text-2xl'>25th September 2023</div>
                  <div className='text-slate-100'>Last Donated</div>
                  </motion.div>
                </div>
                  <div className='bg-red-500 rounded-md w-80 p-5 basis-1/3 ml-5 flex'>
                  <motion.div className='' initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{duration: 0.9,delay: 0.6,ease: [0, 0.71, 0.2, 1.01]}}>
                    <div className='grid grid-cols-2'>
                    <div className='text-white font-poppins text-2xl'>Find a drive</div>
                    <img src={img1} className='w-20 h-20 ml-20'></img>
                    </div>
                    </motion.div>
                  </div>
                  <div className='bg-red-500 rounded-md w-80 p-5 basis-1/3 ml-5 flex'>
                  <motion.div className='' initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{duration: 0.9,delay: 0.7,ease: [0, 0.71, 0.2, 1.01]}}>
                  <div className='grid grid-cols-2'>
                    <div className='text-white font-poppins text-2xl'>Donate Now</div>
                    <img src={img2} className='w-20 h-20 ml-20'></img>
                    </div>
                    </motion.div>
                  </div>
              
                <div>
                  


                </div>
              </div>
                <div className='grid grid-cols-2 p-6 space-y-4 mt-10'>
                <div className='rounded-md bg-[#FF69B4] pl-10 pt-8'>
                <div className='flex'>
                <div className='text-white text-8xl font-poppins'>
                <CountUp end={100} duration={10} /> 
                </div><div className='text-white text-3xl'>ml</div>
                </div>

                <h1 className='text-2xl text-white font-bold'>of Blood Donated</h1>
                </div>
                <div className='bg-[#F2EEDB] shadow w-min p-8 rounded-xl mx-auto'>
                    <h1 className='text-9xl font-bold'>AB+</h1>
                </div>
              </div>
              <div>
              <div className='grid grid-cols-2 p-6 space-y-4 mt-10'>
                <div>
                <h1 className='text-3xl font-bold'>Donation History:</h1>
                <div>
                  <TableHeader/>
                  <hr className='bg-black h-2'></hr>
                  <TableRow/>
                  <TableRow/>
                </div>
                </div>
                <div>
                  <div className='bg-[#9900FF] text-white font-bold text-lg rounded-md pl-5 pt-2 w-80 h-12 mx-auto mb-5 flex'>
                    Zip Code:
                  <input type="text" id="small-input" className="w-1/2 p-2 text-gray-900 ml-5 h-9 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500" />
                  </div>
                  <div className='bg-[#F2EEDB] shadow w-96 p-2 rounded-xl mx-auto'>
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

    </div>
  )
}

export default Dashboard

const TableHeader = () => {
  // {console.log(props)}
   return (
     <div>
       <div className='grid grid-cols-3 gap-4 font-bold text-lg flex pt-5 pb-5'>
        <div>
         Donation Date
        </div>
        <div>
         Amount Donated
        </div>
        <div>
        Plasma/Platelets/Red cells/Whole blood
        </div>
       </div>
     </div>
   )
 }

 const TableRow = () => {
  // {console.log(props)}
   return (
     <div>
       <div className='grid grid-cols-3 gap-4 text-md flex pl-3 pt-5 pb-5 font-poppins'>
        <div>
         14/09/23
        </div>
        <div>
         500ml
        </div>
        <div>
        Plasma
        </div>
       </div>
     </div>
   )
 }