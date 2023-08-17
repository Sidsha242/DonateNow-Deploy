import { useState } from 'react';
import React from 'react';

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import OTPInput from "react-otp-input"
import './StyledVerify.css'

import axios from '../axios';

const Register = () => {

    const [usernameReg, setUsernameReg] = useState(''); 
    const [passwordReg, setPasswordReg] = useState('');
    const [emailReg, setEmailReg] = useState('');
    const [messageReg, setMessageReg] = useState('') ;
    const [phonenumReg, setPhoneNumReg] = useState('');

    const register = () => {
        axios.post('/user/register', {
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
        try{
            axios.get('/user/login?phonenumber='+phonenumReg+'&channel=sms').then((response) => {
                console.log(response);
                setTimeout(() => {
                }, 1000)
            })  
        }catch(err){
            console.log(err);
            setMessageReg("Error with OTP");
        } 
    }

    const [OTP, setOTP] = useState("");
    function handleChange(OTP) {
      setOTP(OTP);
      console.log(OTP);
    }
    const verify = () => {
        try{
            axios.get('/user/verify?phonenumber=' + phonenumReg + '&code=' + OTP).then((response) => {
                console.log(OTP);
                console.log(response);
                if(response.data.status === 'approved'){
                    console.log('User verified');
                    register();
                    setTimeout(() => {
                        window.location.href = '/medinfo';
                    }, 1000)
                }else{
                    console.log('User not verified');
                    handleClose();
                    setMessageReg('User not verified. Try again.');
                }
                
            })
        }catch(err){
            console.log(err);
        }
    }


    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        console.log('Dialog Opened');
        setOpen(true);
    };
    
    const handleClose = () => {
        console.log('Dialog Closed');
        setOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    }



  return (
    <>
    <div className='pt-10 pb-10'>
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
                        required id="phonenumReg" name="phonenumReg" placeholder="Enter number like 91xxxxxxxxxx" value={phonenumReg} onChange={(e) => setPhoneNumReg(e.target.value)} />
                    </div>

                    <button type="submit" className="w-full text-white bg-emerald-400 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-2.5 py-2.5 text-center" onClick={()=>{ sendOTP(); handleClickOpen();}}>Sign Up</button>

                </form>
            <h2 className='font-bold text-lg'>{messageReg}</h2>
        </div>
        </div>
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Confirm Phone Number</DialogTitle>
            <DialogContent>
            <div>
                            <div class="relative bg-[#E3DEC6] px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
                    <div class="mx-auto flex w-full max-w-md flex-col space-y-16">
                    <div class="flex flex-col items-center justify-center text-center space-y-2">
                        <div class="font-semibold text-3xl">
                        <p>Phone Verification</p>
                        </div>
                        <div class="flex flex-row text-sm font-medium text-gray-400">
                        <p>We have sent a code to your phone number {phonenumReg}</p>
                        </div>
                    </div>

                    <div>
                        <div class="flex flex-col space-y-16">
                            <div class="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                            {/* <div class="w-16 h-16 ">
                                <input class="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text" name="" id=""></input>
                            </div>
                            <div class="w-16 h-16 ">
                                <input class="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text" name="" id=""></input>
                            </div>
                            <div class="w-16 h-16 ">
                                <input class="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text" name="" id=""></input>
                            </div>
                            <div class="w-16 h-16 ">
                                <input class="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text" name="" id=""></input>
                            </div> */}

                            <OTPInput
                                onChange={handleChange}
                                value={OTP}
                                inputStyle="inputStyle"
                                numInputs={4}
                                renderSeparator={<span>-</span>}
                                renderInput={(props) => <input {...props} />}
                            />
                            </div>

                            <div class="flex flex-col space-y-5">
                            <div>
                                <button onClick={() => {verify();}} class="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm">
                                Verify Account
                                </button>
                            </div>

                            <div class="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                                <p>Didn't recieve code?</p> <a class="flex flex-row items-center text-blue-600" href="http://" target="_blank" rel="noopener noreferrer">Resend</a>
                            </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
          </DialogContent>
          </Dialog>
          
        </div>
    </div>
</>
  )
}

export default Register