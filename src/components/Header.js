import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import AppContext from '../store/AppContext';

export default function Header() {
    
    const [isLoggedIn, user] = useContext(AppContext);

    const navigate = useNavigate();

    

    //logout function
    function logout() {
        const auth = getAuth();
        signOut(auth).then(() => {
            
            navigate("/login")
        // Sign-out successful.
        }).catch((error) => {
        // An error happened.
        });
    }
  return (
    <nav className='p-5 bg-indigo-800 text-white flex justify-between'>
        <ul className='flex justify-between px-10'>
            
                <li className='mr-5'>
                    <NavLink to="/" exact >Home</NavLink>
                </li>
                <li className='mr-5'>
                    <NavLink to="/gallery" activeClassName="text-red-100 !bg-red-700">Gallery</NavLink>
                </li> 
                <li className='mr-5'>
                    <NavLink to="/flow" activeClassName="text-red-100 !bg-red-700">Tensorflow</NavLink>
                </li> 
            
        
        </ul>
        <ul className='flex justify-between px-10'>
          <li className='mr-5'>      
            {
              isLoggedIn ? ( 
              <button onClick={logout}>Logout</button>):(

              <NavLink to="/login" activeClassName="text-red-100 !bg-red-700">Login</NavLink>
            )}
        </li>
        <li className={` ${isLoggedIn ? "" : "mr-5"}`}>
           {
              !isLoggedIn && ( 
             

              <NavLink to="/signup" activeClassName="text-red-100 !bg-red-700">SignUp</NavLink>
            )}      
        </li>
        
        </ul>
    </nav>
  )
}
