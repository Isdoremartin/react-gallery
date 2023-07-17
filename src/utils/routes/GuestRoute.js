import React, { useContext } from 'react'
import { Navigate, Outlet, } from 'react-router-dom';
import AppContext from '../../store/AppContext'

export default function GuestRoute() {
    const  [isLoggedIn] = useContext(AppContext);

    // const navigate = useNavigate();
    
   return(
    isLoggedIn ? <Navigate to="/" /> : <Outlet />  
   )

//    return redirect("/login")
}
