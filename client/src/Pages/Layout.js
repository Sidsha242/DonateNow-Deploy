import { Outlet } from 'react-router-dom'
import React from 'react'
import Navbar from '../Components/Navbar'

const Layout = () => {
  return (
    <>
    <Navbar></Navbar>
    <main className='App bg-[#F2EEDB]'>
        <Outlet />
    </main>
    </>
  )
}

export default Layout