import React from 'react';
import { useState } from 'react';
import { Link , useNavigate } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';

import axios from '../axios';

const Login = () => {
    const { setAuth } = useAuth();

    const [logemail, setEmail] = useState('');  
    const [logpassword, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate();


    const handleSubmit = async(e) => {
        e.preventDefault();   
        try{
            const response = await axios.post('/user/sign_in', 
             {
                email: logemail,                             
                password: logpassword,
             });
                       setMessage(response.data.message);
                       if(response.data.message === 'Login Successful')
                       {
                           console.log(response.data);
                           const accessToken = response?.data?.token;
                           const roles = response?.data?.roles;
                           const authpassword = response?.data?.result?.password

                           console.log(accessToken);
                           console.log(roles);
                           console.log(logemail);
                           console.log(authpassword);

                           setAuth({ 
                                  email : logemail, 
                                   pass : authpassword,
                                   role : roles,
                                  token : accessToken })  //saved in global context

                                  navigate("/");
                                 
                       }

           }
           catch(err)
           {
               if(!err?.reponse)
               {
                   setMessage('No Server Response');
               }
               else if (err.response?.status === 400)
               {
                   setMessage('Missing username or password')
               }
               else
               {
                   setMessage('Login Failed');
               }

           }
    }

  return (
    <>
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <div className='w-full bg-[#E3DEC6] rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0'>
                        <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">Login</h1>
                    <form onSubmit={handleSubmit} className='space-y-4 md:space-y-6'>
                        <div>
                            <label htmlFor='username' className='mr-2 font-bold'>Email :</label>
                            <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" 
                            required id="email" name="email" value={logemail} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor='password' className='mr-2 font-bold'>Password :</label>
                            <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" 
                            required id="password" name="password" value={logpassword} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <button type="submit" className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-2.5 py-2.5 text-center" 
                        >Login</button>
                    </form>
                    <h2 className='font-bold text-lg'>{message}</h2>

                    <p className="text-sm font-light text-gray-500">
                      Don't have an account yet? <Link to="/register" className='font-bold font-medium text-primary-600 hover:underline'>SignUp</Link>
                  </p>
                    
                </div>
                </div>
                </div>
        </>
  )
};

export default Login