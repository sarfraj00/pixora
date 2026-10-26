import React from 'react'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css'

const RootLayout = () => {
  return (
    <main>
      <Outlet/>
      <ToastContainer position='top-right' autoClose={5000} pauseOnHover closeOnClick/>

    </main>
  )
}

export default RootLayout
