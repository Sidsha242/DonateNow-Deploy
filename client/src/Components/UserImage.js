import React from 'react'
import pic1 from "../Images/user-icon.png"
import { useState } from 'react';
import toast from "react-hot-toast"

import axios from "../axios";
const USERIMG_URL = "/user/upload";


const UserImage = () => {
    const [userImage, setUserImage] = useState('');
    async function handleFileChange(ev)
    {
        const files = ev.target.files;
        if(files?.length === 1)
        {
           const formData = new FormData();
           formData.append('file',files[0]);
           toast('Uploading..')
           axios.post(USERIMG_URL, formData).then(res => {
            console.log(res);
            toast.success('Upload complete!');
          })
          .catch(function (error) {
            console.log(error);
          });
            //const link = await response.json();
            //setUserImage(link);
           
        }
    }

  return (
  <>
    <div className='flex flex-col justify-center'>
       <div className="bg-gray-300 h-32 w-32 rounded-md p-2 mr-10 text-center justify-center flex items-center">
            <p className="text-gray-600">No image uploaded</p>
       </div>
    <label>
     <input type="file" className='hidden' name="file" onChange={handleFileChange}/>
     <span className='block border border-red-200 text-center rounded-lg p-1 w-20 cursor-pointer mt-2 text-white ml-5'>Edit</span>
     </label>
    </div>
  </>
  )
}

export default UserImage