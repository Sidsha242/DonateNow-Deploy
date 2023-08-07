import { useState } from 'react';
import Axios from 'axios';
import React from 'react';

const Register = () => {

    const [usernameReg, setUsernameReg] = useState(''); 
    const [passwordReg, setPasswordReg] = useState('');
    const [emailReg, setEmailReg] = useState('');
    const [messageReg, setMessageReg] = useState('') ;
    const [phonenumReg, setPhoneNumReg] = useState('');

    const register = () => {
        Axios.post('http://localhost:3031/user/register', {
            username: usernameReg, 
            email : emailReg,                             
            password: passwordReg,
            phonenum: phonenumReg

        }).then((response) => {
            setMessageReg(response.data.message);
            if(response.data.message === 'Registered Successful')
            {
                console.log(response.data.result);
                localStorage.setItem("user", JSON.stringify(response.data.result));
              
                console.log('User added');
                //  setTimeout(() => {
                //      window.location.href = '/medinfo';
                //  }, 1000)
            }
        });
    };

    const sendOTP = () => {
        Axios.get('http://localhost:3031/user/login?phonenumber=919909926646&channel=sms').then((response) => {
            console.log(response);
            setTimeout(() => {
                window.location.href = '/phoneotp';
            }, 1000) 
        })  
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }



  return (
    <>
    <div className='bg-[#F2EEDB] pt-10 pb-10'>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className='w-full bg-[#E3DEC6] rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0'>
                <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">Sign Up</h1>
            <form onSubmit={handleSubmit} className='space-y-4 md:space-y-6'>
                    <div>
                        <label htmlFor='usernameReg' className='block mb-3 items-start font-bold mt-2'>Enter Username :</label>
                        <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" 
                        required id="usernameReg" name="usernameReg" placeholder='Username...' value={usernameReg} onChange={(e) => setUsernameReg(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor='emailReg' className='block mb-3 items-start font-bold mt-2'>Enter Email :</label>
                        <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" 
                        required id="EmailReg" name="EmailReg" placeholder='test@test.com' value={emailReg} onChange={(e) => setEmailReg(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor='passwordReg' className='block mb-3 items-start font-bold mt-2'>Enter Password :</label>
                        <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" 
                        required id="passwordReg" name="passwordReg" placeholder='Password...' value={passwordReg} onChange={(e) => setPasswordReg(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor='phonenumReg' className='block mb-3 items-start font-bold mt-2'>Enter Phone Number :</label>
                        <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" 
                        required id="phonenumReg" name="phoennumReg" value={phonenumReg} onChange={(e) => setPhoneNumReg(e.target.value)} />
                    </div>
                    <button type="submit" className="w-full text-white bg-emerald-400 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-2.5 py-2.5 text-center" onClick={()=>{ sendOTP(); register();}}>Sign Up</button>
                </form>
            <h2 className='font-bold text-lg'>{messageReg}</h2>
        </div>
        </div>
        </div>
    </div>
</>
  )
}

export default Register