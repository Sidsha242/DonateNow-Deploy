

import React from 'react'
import alert1 from '../Images/warning.png'
import alert2 from '../Images/danger-icon.png'

const FeedCard = (props) => {
  return (
    <div>
      { props.type == 'Alert' ? 
      <div>
          <a href="#" className="block w-3/4 p-6 mt-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 grid grid-cols-2">
          <div>
          <img src={alert1} className='w-10 h-10 animate-pulse'></img>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-red-700">Donation Required</h5>
          <div className='flex'><p className="font-bold text-xl text-gray-700">Blood Groups Required:</p><p className='ml-5 font-bold text-xl'>A+</p></div>
          </div>
          <div>
          <h5 className="mb-2 text-xl font-bold tracking-tight ">Time since donation requested:</h5>
          </div>
          </a> 
      </div>
       : 
      <div>
          <a href="#" className="block w-3/4 p-6 mt-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
          <img src={alert2} className='w-10 h-10 animate-pulse'></img>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-red-700">Mass Casulty</h5>
          <div className='flex'><p className="font-bold text-xl text-gray-700">Blood Groups Required:</p><p className='ml-5 font-bold text-xl'>A+</p><p className='ml-5 font-bold text-xl'>O-</p></div>
          </a> 
      </div>
      }
    </div>
  )
}

export default FeedCard