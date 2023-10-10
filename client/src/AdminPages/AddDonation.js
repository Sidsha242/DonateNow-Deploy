import React from 'react'
import SearchBar from '../Components/SearchBar'
import { useState, useEffect } from 'react';
import axios from '../axios';
import { useAuth } from '../Hooks/useAuth';
import { Popover } from '@headlessui/react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const ADMIN_INFO_URL = '/admin/admininfo';


const AddDonation = () => 
{
  const auth = useAuth();
  const [exp_arr, set_exp_arr] = useState([]);
  const [obj, setobj] = useState({});
  const [dondate, setDondate] = useState('');

  

  useEffect(() => {
    axios.get(ADMIN_INFO_URL).then((response) => {
        set_exp_arr(response.data.result);
   }).catch(error => {
    console.log(error);
  });
}, []);


  let [Filter, setFilter] = useState('');

  console.log(exp_arr);
  const displayedData = Filter ? exp_arr.filter(element => element?.username.toLowerCase().includes(Filter.toLowerCase())) : exp_arr

  const AdminCard = (props) => {
    //console.log(props)
     return (
       <div className='bg-[#E3DEC6] h-fill'>
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
          <button className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-bold py-1 px-1 rounded" onClick={() => addDonation(props) }>
              Add donation
          </button>
          </div>
         </div>
       </div>
     )
   }
   function addDonation(obj)
  {
    console.log(obj);
    setobj(obj);

  }

  return (
    <div className='h-full p-3 mr-5'>
      <div className='grid grid-cols-2'>
      <div>
      <h1 className='text-2xl font-bold'>Add Donation Details</h1>
      <SearchBar setFilter={setFilter}/>
      <div className='p-2'>
      {
        displayedData.map((id) => (
          <AdminCard key={id._id} username={id?.username} email={id?.email} createdAt={id?.createdAt} bloodgrp={id.usersdetails[0]?.bldgrp} phonenum={id?.phonenum}/>
        ))
      }
      </div>
      </div>
      <div className='p-5'>
        <h1 className='font-bold text-lg'>Selected user: { obj.username  }</h1>
        <h1 className='font-bold text-lg'>Selected user: { obj.email  }</h1>
        <h1 className='font-bold text-lg'>Donation amount:(in ml)</h1>
        <input type="text" id="default-input" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"></input>
       
        <div className='mt-3'>
        <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">Donation Type</FormLabel>
       <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="Whole"
          name="radio-buttons-group"
         >
        <FormControlLabel value="whole_blood" control={<Radio />} label="Whole Blood" />
        <FormControlLabel value="red_cells" control={<Radio />} label="Red Cells" />
        <FormControlLabel value="platelets" control={<Radio />} label="Platelets" />
        <FormControlLabel value="plasma" control={<Radio />} label="Plasma" />
      </RadioGroup>
    </FormControl>
          </div>
          <div className='pb-2'>
          <h1>Date of Donation:</h1>
          <DatePicker selected={dondate} onChange={(date) => setDondate(date)} />
          </div>
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5">
                Confirm Donation
          </button>
          </div>
      </div>
    </div>
  )

}

export default AddDonation