import React from 'react'
import Axios from 'axios'
import OTPInput from "react-otp-input"
import { useState } from 'react'
import './StyledVerify.css'

const PhoneOTP = () => {
  const [OTP, setOTP] = useState("");
  function handleChange(OTP) {
    setOTP(OTP);
    console.log(OTP);
  }
  
  const verify = () => {
    Axios.get('http://localhost:3031/user/verify?phonenumber=919909926646&code=' + OTP).then((response) => {
      console.log(OTP);
      console.log(response);
      if(response.data.verified === true){
        console.log('User verified');
        setTimeout(() => {
          window.location.href = '/medinfo';
        }, 1000)
      }
      
    })
  }

  return (
    <div class="bg-[#F2EEDB] relative flex min-h-screen flex-col justify-center overflow-hidden py-12">
  <div class="relative bg-[#E3DEC6] px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
    <div class="mx-auto flex w-full max-w-md flex-col space-y-16">
      <div class="flex flex-col items-center justify-center text-center space-y-2">
        <div class="font-semibold text-3xl">
          <p>Phone Verification</p>
        </div>
        <div class="flex flex-row text-sm font-medium text-gray-400">
          <p>We have sent a code to your phone number 93*****822</p>
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
                <button onClick={verify} class="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm">
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
  )
}

export default PhoneOTP