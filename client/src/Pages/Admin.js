import Axios from 'axios';
import { useState, useEffect } from 'react';
import React from 'react'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Admin = () => {
  const [exp_arr, set_exp_arr] = useState([]);

  const [bldgrp, setBldGrp] = useState(''); 

  useEffect(() => {
    Axios.get(`http://localhost:3031/admin/admininfo`, {
   }).then((response) => {
        console.log(response.data[0].usersdetails[0].bldgrp);
        console.log("response received");
        set_exp_arr(response.data);
   });
}, []);


const handleSubmit = (e) => {
  e.preventDefault();
}


  return (
    <div className='bg-[#F2EEDB]'>
      <div className='p-10'>
      <h1 className='font-bold text-4xl'>Admin page</h1>
      <div>

      <form onSubmit={handleSubmit} className='space-y-4 '>
                    <div>
                        <label htmlFor='blood-group' className='block mb-3 items-start font-bold mt-2'>Blood Group:</label>
                        <FormControl fullWidth>
                            {/* <InputLabel id="demo-simple-select-label">Blood Group</InputLabel> */}
                            <Select
                                id="blood-group"
                                value={bldgrp}
                                label="blood-group"
                                onChange={(e) => setBldGrp(e.target.value)}
                            >
                                <MenuItem value={'A+'}>A+</MenuItem>
                                <MenuItem value={'A-'}>A-</MenuItem>
                                <MenuItem value={'B+'}>B+</MenuItem>
                                <MenuItem value={'B-'}>B-</MenuItem>
                                <MenuItem value={'O+'}>O+</MenuItem>
                                <MenuItem value={'O-'}>O-</MenuItem>
                                <MenuItem value={'AB+'}>AB+</MenuItem>
                                <MenuItem value={'AB-'}>AB-</MenuItem>

                            </Select>
                            </FormControl>
                    </div>
                    </form>
        
      </div>
      <h1 className='font-bold text-lg'>Blood group selected:{bldgrp}</h1>
      <h1 className='font-bold text-2xl mt-10'>Users:</h1>
      <div className='ml-20 pt-10 pb-20' >

                {exp_arr.map((id) => (
                    <AdminCard state={id} username={id.username} email={id.email} createdAt={id.createdAt} bloodgrp={id.usersdetails[0].bldgrp}/>
                ))}

            </div>
      
      </div>
      </div>
  )
}

export default Admin



const AdminCard = (props) => {
 // {console.log(props)}
  return (
    <div className='bg-[#E3DEC6]'>
      <div className='grid grid-cols-4 font-bold text-md flex pl-3 pt-5 pb-5'>
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
      </div>
    </div>
  )
}
