import React, { useContext } from 'react'
import { Navigate, Outlet, } from 'react-router-dom';
import AppContext from '../../store/AppContext'

export default function AuthRoute() {
    const  [isLoggedIn] = useContext(AppContext);

    // const navigate = useNavigate();
    
   return(
    isLoggedIn ? <Outlet /> : <Navigate to="/login" />
   )

//    return redirect("/login")
}
