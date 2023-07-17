import React from "react";
import Gallery from "../page/gallery";
import Home from "../page/Home";
import Login from "../page/login";
import AuthRoute from "./routes/AuthRoute";

export default [
    {
        path: "/",
        exact: true,
        component: () => <Home />,
    },
    {
        path: "/login",
        
        component: () => <Login />,
    },
    {
        path: "/gallery",
        // element: () => <AuthRoute />,
        component: () => <Gallery />,
    },
]