import React from 'react'
import SearchBar from '../Components/SearchBar'
import { useState, useEffect } from 'react';
import axios from '../axios';

const ADMIN_INFO_URL = '/admin/admininfo';



const AddDonation = () => {
  const [exp_arr, set_exp_arr] = useState([]);

  useEffect(() => {
    axios.get(ADMIN_INFO_URL).then((response) => {
        console.log("response received");
        set_exp_arr(response.data.result);
   }).catch(error => {
    console.log(error);
  });
}, []);


  let [Filter, setFilter] = useState('');

  console.log(exp_arr);

  const displayedData = Filter ? exp_arr.filter(element => element?.username.toLowerCase().includes(Filter.toLowerCase())) : exp_arr


  return (
    <div className='h-full p-3 grid grid-cols-2 mr-5'>
      <div>
      <h1 className='text-2xl font-bold'>Add Donation Details</h1>
      <SearchBar setFilter={setFilter}/>
      <div className='p-2'>
      {displayedData.map((id) => (
                   <AdminCard state={id} username={id?.username} email={id?.email} createdAt={id?.createdAt} bloodgrp={id.usersdetails[0]?.bldgrp} phonenum={id?.phonenum}/>
                ))}
      
     
      </div>
      </div>
     
      </div>
  )
}

export default AddDonation

const AdminCard = (props) => {
  // {console.log(props)}
   return (
     <div className='bg-[#E3DEC6]'>
       <div className='grid grid-cols-5 font-bold text-sm flex pl-2 pt-6 pb-6'>
        <div>
         {props.username}
        </div>
        <div>
         {props.email}
        </div>
        <div className='ml-20'>
         {props.bloodgrp}
        </div>
        <div>
         {props.phonenum}
        </div>
        <div>
        <button class="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-1 px-1 rounded">
            Add donation
        </button>
        </div>
       </div>
     </div>
   )
 }