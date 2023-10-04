
import React from 'react'
import { useState, useEffect } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import axios from '../axios';

const ADMIN_INFO_URL = '/admin/admininfo';

const AdminDash = () => {

    var hash = new Object();

    const [exp_arr, set_exp_arr] = useState([]);

    const [piedata, setpiedata] = useState([]);

    const labels = []
    const datasets = []

    const data02 = [
      { name: "Group A", value: 2400 },
      { name: "Group B", value: 4567 },
      { name: "Group C", value: 1398 },
      { name: "Group D", value: 9800 },
      { name: "Group E", value: 3908 },
      { name: "Group F", value: 4800 }
    ];




    useEffect(() => {
        axios.get(ADMIN_INFO_URL).then((response) => {
            console.log("response received");
            setpiedata(response.data.piedata);
            set_exp_arr(response.data.result);
       }).catch(error => {
        console.log(error);
      });
    }, []);


    
  return (
    <>
    <div className='p-5'>
    <h1 className='font-bold text-4xl'>Admin page</h1>
            <div>
                  <PieChart
                  series={[
                    {
                      outerRadius: 80,

                      data: piedata,
                    },
                  ]}
                  height={300}
                  legend={{ hidden: true }}
                />
            <h1 className='font-bold text-2xl mt-10'>Users:</h1>
            <div className='ml-20 pt-10 pb-20 overflow-scroll' >

                      {exp_arr.map((id) => (
                          <AdminCard state={id} username={id?.username} email={id?.email} createdAt={id?.createdAt} bloodgrp={id.usersdetails[0]?.bldgrp} phonenum={id?.phonenum}/>
                      ))}

            </div>
            
      </div>
      </div>
      </>
  )
}

export default AdminDash



const AdminCard = (props) => {
    // {console.log(props)}
     return (
       <div className='bg-[#E3DEC6]'>
         <div className='grid grid-cols-5 gap-9 font-bold text-md flex pl-3 pt-5 pb-5'>
          <div>
           {props.username}
          </div>
          <div>
           {props.email}
          </div>
          <div>
           {props.createdAt}
          </div>
          <div>
           {props.bloodgrp}
          </div>
          <div>
           {props.phonenum}
          </div>
         </div>
       </div>
     )
   }