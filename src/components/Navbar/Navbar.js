import React from 'react';
import styled from './navbar.module.css';
import { Outlet } from 'react-router-dom';

const Navbar = () => {
  return (
    <>
    <div className={styled.navbar_sec}>
        <div className={styled.logo_sec}>
        <h1>ChaosWale</h1>
        </div>
    </div>
    <Outlet />
    </>
  )
}

export default Navbar;