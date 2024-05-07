import React from 'react';
import Navbar from './../Navbar/Navbar';
import Footer from './../Footer/Footer';
import { Outlet } from 'react-router-dom';
import { Offline, Online } from "react-detect-offline";

export default function Layout() {
  return (
    <div>
      <Navbar />
      <Offline>
        <div className='network'>
          <i className='fas fa-wifi'></i>
          Only shown offline (surprise!)
        </div>
      </Offline>
      <div className="container">
        <Outlet />
      </div>
    </div>
  )
}
