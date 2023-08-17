import { Link } from 'react-router-dom'
import React from 'react'

const LinkPage = () => {
  return (
    <div className='pt-10 pl-10 h-screen'>
      <h1 className='text-2xl font-bold'>Link Page</h1>
         <div className='mt-6'>
         <Link to="/admin" className="font-semibold">
          Admin Page
         </Link>
         </div>
         <div className='mt-6'>
         <Link to="/mod" className=" font-semibold mt-5">
          Moderator Page
         </Link>
         </div>
    </div>
  )
}

export default LinkPage