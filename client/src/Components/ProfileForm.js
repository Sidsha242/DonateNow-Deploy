import React from 'react'

const ProfileForm = () => {
  return (
        <div className="mt-10 mb-10 text-xl">
        <form class="max-w-xl mx-auto">
        <div class="mb-4 flex flex-row space-x-5">
            <div>
            <label for="fname" className="block mb-2 text-sm font-medium text-gray-900 ">First Name</label>
            <input type="fname" id="fname" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required/>
            </div>
            <div>
            <label for="lname" className="block mb-2 text-sm font-medium text-gray-900 ">Last Name</label>
            <input type="lname" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required/>
            </div>
        </div>
        <div className='mb-4'>
        <label for="adrs" className="block mb-2 text-sm font-medium text-gray-900 ">Address</label>
        <input type="adrs" id="adrs" className="p-8 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full" required/>
        </div>
        <div className="mb-5 flex flex-row space-x-2">
        <div>
        <label for="age" className="block mb-2 text-sm font-medium text-gray-900 ">Age</label>
        <input type="age" id="age" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 " required/>
        </div>
        <div>
        <label for="weight" className="block mb-2 text-sm font-medium text-gray-900 ">Weight(Optional)</label>
        <input type="weight" id="weight" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 " required/>
        </div>
        </div>
        <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </form>
    </div>
  )
}

export default ProfileForm