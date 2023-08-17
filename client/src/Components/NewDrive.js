

import React from 'react'

const NewDrive = () => {
  return (
    <div>
         <div>
        <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900">Name of the drive:</label>
        <input type="text" id="small-input" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500"/>
        </div>
        <div>
        <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900">Date:</label>
        <input type="text" id="small-input" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500"/>
        </div>
        <div className="mb-6">
        <label htmlFor="large-input" class="block mb-2 text-sm font-medium text-gray-900">Description:</label>
        <input type="text" id="large-input" className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 "/>
        </div>
        <div className="mb-6">
        <label htmlFor="base-input" className="block mb-2 text-sm font-medium text-gray-900">Location:</label>
        <input type="text" id="base-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"/>
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  Add donation Drive
</button>
    </div>
  )
}

export default NewDrive