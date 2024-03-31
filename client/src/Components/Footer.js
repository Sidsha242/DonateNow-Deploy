
import React from 'react'
import logo_fill from '../Images/Logo_fill.svg'

const Footer = () => {
  return (
    <div className='bg-[#1E2833] p-10'>
        <div className='grid grid-cols-2'>
            <img src={logo_fill}></img>
            <div className='text-2xl text-white'>
            DonateNow
        </div>
        </div>
        
    </div>
  )
}

export default Footer