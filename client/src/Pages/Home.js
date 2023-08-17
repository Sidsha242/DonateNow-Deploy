import React from 'react'
import './Home.css'
import { Link } from 'react-router-dom';

const Home = () => {

    return (
        <div className='bg-red-700 h-full'>
            <div className='grid grid-cols-2 p-5'>
                <div className="title-cont pt-28 pl-10 container-title mx-auto">
                    <h1 className='title text-8xl text-white'>Help Save Lives</h1>
                </div>
                {/* <div>
                    <img
                        className="h-80 w-92 rounded-full"
                        src={img2}
                        alt="Workflow"
                    />
                </div> */}
            </div>
            <div className='pl-10 pb-10 pt-20'>
                <ol className="relative border-l border-black">
                    <li className="mb-10 ml-4">
                        <div className="absolute w-3 h-3 bg-black rounded-full mt-1.5 -left-1.5 border border-white"></div>
                        <p className="mb-5 text-sm font-normal leading-none text-white">Step 1</p>
                        <Link className="mt-5 text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-lg px-2.5 py-2.5 text-center" to='/register'>Sign Up.</Link>
                    </li>
                    <li className="mb-10 ml-4">
                        <div className="absolute w-3 h-3 bg-black rounded-full mt-1.5 -left-1.5 border border-white"></div>
                        <p className="mb-1 text-sm font-normal leading-none text-white">Step 2</p>
                        <h3 className="text-lg font-semibold text-white ">Register with your medical information</h3>
                    </li>
                    <li className="ml-4">
                        <div className="absolute w-3 h-3 bg-black rounded-full mt-1.5 -left-1.5 border border-white"></div>
                        <p className="mb-1 text-sm font-normal leading-none text-white ">Step 3</p>
                        <h3 className="text-lg font-semibold text-white ">Wait to receive donation message</h3>
                    </li>
                </ol>
            </div>
        </div>

    )
}

export default Home