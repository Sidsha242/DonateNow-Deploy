

import React from 'react'
import iphoneimg from '../Images/woman_donate.gif'

const About = () => {
  return (<>
    <div className='h-full p-5 grid grid-cols-2'>
    <div>
     <h1 className='font-bold text-5xl pt-10 font-poppins'>Hi we are DonateNow</h1> 
     </div>
     <img src={iphoneimg}></img>
      
      </div>
      <div>
      <h1 className='font-bold text-5xl pt-1 font-poppins'>Our team</h1> 
      </div>
      </>
  )
}

export default About