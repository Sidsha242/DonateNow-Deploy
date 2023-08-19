import { useState, useEffect } from 'react';
import React from 'react'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import NewDrive from '../Components/NewDrive';

import axios from '../axios';

const Admin = () => {
  const [exp_arr, set_exp_arr] = useState([]);

  const [bldgrp, setBldGrp] = useState(''); 

  const [smsText, setSmsText] = useState('');



  useEffect(() => {
    axios.get(`http://localhost:3031/admin/admininfo`, {
   }).then((response) => {
        console.log(response.data)
        console.log(response.data[0].usersdetails[0].bldgrp);
        console.log("response received");
        set_exp_arr(response.data);
   });
}, []);


const sendMessage = () =>{
  console.log('Inside send message');
  axios.post('http://localhost:3031/sendMsg', {
    smsText : smsText,                             
    bldgrp: bldgrp,

}).then((response) => {
  console.log('Message sent');

})};


const handleSubmit = (e) => {
  e.preventDefault();
}


  return (
    <>
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
                                  <h1 className='font-bold text-lg'>Blood group selected:{bldgrp}</h1>
                                  <div className='mt-5'>
                                  <textarea id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" placeholder="Type sms here.." 
                                  value={smsText} onChange={(e) => setSmsText(e.target.value)}></textarea>
                                  </div>
                                  <button type="submit" className="w-full mt-5 text-white bg-emerald-400 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-2.5 py-2.5 text-center" onClick={sendMessage}>Send Message</button>
                          </div>
                          </form>
            </div>
            
            <h1 className='font-bold text-2xl mt-10'>Users:</h1>
            <div className='ml-20 pt-10 pb-20 overflow-scroll' >

                      {exp_arr.map((id) => (
                          <AdminCard state={id} username={id.username} email={id.email} createdAt={id.createdAt} bloodgrp={id.usersdetails[0].bldgrp} phonenum={id.phonenum}/>
                      ))}

                  </div>
            
            </div>
            <hr class="h-px my-8 bg-black border-0"></hr>
            <div className='mt-10 ml-20 mr-20 pb-20'>
              <h1 className='font-bold text-xl mb-10'>Add new Donation Drive</h1>
              
                <NewDrive />
        </div>
      </>
  )
}

export default Admin



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
