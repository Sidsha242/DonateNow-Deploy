import React from 'react';
import Axios from 'axios';
import { useState, useEffect } from 'react';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const Login = () => {
    const [logemail, setEmail] = useState('');  
    const [logpassword, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const login = () => {
        Axios.post('http://localhost:3031/user/sign_in', {
            email: logemail,                             
            password: logpassword,
        }).then((response) => {
            setMessage(response.data.message);
            if(response.data.message === 'Login Successful')
            {
                localStorage.setItem("user", JSON.stringify(response.data.result));
              
                console.log('User added');
                 setTimeout(() => {
                     window.location.href = '/dashboard';
                 }, 1000)

            }

        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();   
    }
  return (
    <>
            <div className='bg-[#F2EEDB]'>
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className='w-full bg-[#E3DEC6] rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
                        <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Login</h1>
                    <form onSubmit={handleSubmit} className='space-y-4 md:space-y-6'>
                        <div>
                            <label htmlFor='username' className='mr-2 font-bold'>Email :</label>
                            <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            required id="email" name="email" value={logemail} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor='password' className='mr-2 font-bold'>Password :</label>
                            <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            required id="password" name="password" value={logpassword} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <button type="submit" className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-2.5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" 
                        onClick={login}>Login</button>
                    </form>
                    <h2 className='font-bold text-lg'>{message}</h2>

                    <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                      Don’t have an account yet? <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500"><Link to="/register" className='font-bold'>SignUp</Link></a>
                  </p>
                    
                </div>
                </div>
                </div>
            </div>
        </>
  )
}

export default Login