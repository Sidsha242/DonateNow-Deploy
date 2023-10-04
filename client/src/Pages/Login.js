import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { Link , useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';

import axios from '../axios';
const LOGIN_URL = '/user/sign_in';

const Login = () => {
    const userRef = useRef();   //to store the user data
    const errRef = useRef();    //to store the error message    

    const { persist,setPersist,setAuth } = useAuth();

    const [logemail, setEmail] = useState('');  
    const [logpassword, setPassword] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        userRef.current.focus();  //focus on the field
    }, [])
    useEffect(() => {
        setMessage('');  //clear the message
    }, [logemail, logpassword])

    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || "/";


    const handleSubmit = async(e) => {
        e.preventDefault();   
        try{
            const response = await axios.post(LOGIN_URL, 
                {
                email: logemail,                             
                password: logpassword,
                },{
                    withCredentials: true   //is required for sending cookies to server
                }
            );
            setMessage(response?.data.message);
            if(response.data.message === 'Login Successful')
            {
                console.log(response.data);
                const accessToken = response?.data?.token;
                const roles = response?.data?.roles;
                const authpassword = response?.data?.result?.password

               /* console.log(accessToken);
                console.log(roles);
                console.log(logemail);
                console.log(authpassword); */

                setAuth({ 
                    email : logemail, 
                    pass : authpassword,
                    role : roles,
                    token : accessToken })  //saved in global context

                // setEmail('');
                // setPassword('');
                navigate(from, { replace: true });
                        
            }
        }
        catch(err)
        {
            if(!err?.reponse){
                setMessage('No Server Response');
            }else if (err.response?.status === 400){
                setMessage('Missing username or password')
            } else if (err.response?.status === 401){
                setMessage('Unauthorized')
            }else{
                setMessage('Login Failed');
            }
            errRef.current.focus();
        }
    }

    const togglePersist = () => {
        setPersist(prev => !prev);
    }

    useEffect(()=>{
        localStorage.setItem("persist", persist);
    },[persist])

  return (
    <>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className='w-full bg-[#E3DEC6] rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0'>
                <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-900 md:text-3xl">Welcome to <span className="text-primary-600">Bloodonation</span></h1>
            <p ref={errRef} className={message ? "errmsg":"offscreen"} aria-live="assertive">{message}</p>    

            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">Login</h1>
            <form onSubmit={handleSubmit} className='space-y-4 md:space-y-6'>
                <div>
                    <label htmlFor='username' className='mr-2 font-bold'>Email :</label>
                    <input ref={userRef} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" 
                    required id="email" name="email" value={logemail} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label htmlFor='password' className='mr-2 font-bold'>Password :</label>
                    <input ref={userRef} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" 
                    required id="password" name="password" value={logpassword} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit" className="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-2.5 py-2.5 text-center" 
                >Login</button>
                <div className='persistCheck'>
                    <input type='checkbox' id='persist' onChange={togglePersist} checked={persist} />
                    <label htmlFor='persist'>Trust this Device</label>
                </div>
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