import React from 'react'
import { useState } from 'react';
import axios from '../axios';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';

const MSG_URL = '/admin/sendMsg';

const SendMessage = () => {

    const [bldgrp, setBldGrp] = useState(''); 
    const [smsText, setSmsText] = useState('');

  const sendMessage = () =>{
    console.log('Inside send message');
    axios.post(MSG_URL, 
    {
      smsText : smsText,                             
      bldgrp: bldgrp,
    }).then((response) => 
    {
      console.log('Message sent');
    }).catch(error => 
    {
      console.log(error);
    })
  };

  const [bloodArray,setBloodArray] = useState([]);;
  const handleChange = (e) => {
    const value = e.target.value;
    const checked = e.target.checked;
    // console.log(value, checked);
    // console.log(bloodArray);
    if(checked){
      setBloodArray([...bloodArray, value]);
    }else{
      setBloodArray(bloodArray.filter((e)=>(e!==value)));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  }


  return (
    <div className='p-10 h-screen'>

    <h1 className='text-2xl font-bold'>Send message</h1>

    <form onSubmit={handleSubmit} className='space-y-4 '>
      <div>
        <label htmlFor='blood-group' className='block mb-3 items-start font-bold mt-2'>Blood Group:</label>
          {/* <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Blood Group</InputLabel>
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
          </FormControl> */}

          {/* <select id="blood-group" value={bldgrp} onChange={(e) => setBldGrp(e.target.value)} className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400'>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select> */}

          <div className="mb-4">
            <input type="checkbox" value="A+" onChange={handleChange}></input>
            <label style={{"color": "black"}}>A+</label> &nbsp;
            <input type="checkbox" value="A-" onChange={handleChange}></input> 
            <label style={{"color": "black"}}>A-</label> &nbsp;
            <input type="checkbox" value="B+" onChange={handleChange}></input>
            <label style={{"color": "black"}}>B+</label> &nbsp;
            <input type="checkbox" value="B-" onChange={handleChange}></input>
            <label style={{"color": "black"}}>B-</label> &nbsp;
            <input type="checkbox" value="O+" onChange={handleChange}></input>
            <label style={{"color": "black"}}>O+</label> &nbsp;
            <input type="checkbox" value="O-" onChange={handleChange}></input>
            <label style={{"color": "black"}}>O-</label> &nbsp;
            <input type="checkbox" value="AB+" onChange={handleChange}></input>
            <label style={{"color": "black"}}>AB+</label> &nbsp;
            <input type="checkbox" value="AB-" onChange={handleChange}></input> 
            <label style={{"color": "black"}}>AB-</label> &nbsp;
          </div>

          <h1 className='font-bold text-lg'>Blood group selected:{bldgrp}</h1>
          <div className='mt-5'>
          <textarea id="message" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" placeholder="Type sms here.." 
          value={smsText} onChange={(e) => setSmsText(e.target.value)}></textarea>
          </div>
          <button type="submit" className="w-full mt-5 text-white bg-emerald-400 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-2.5 py-2.5 text-center" onClick={sendMessage}>Send Message</button>
      </div>
    </form>
    </div>
  )
}

export default SendMessage