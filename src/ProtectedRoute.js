import React from 'react'
import { useEffect } from 'react';
import { Navigate, useLocation } from "react-router-dom"

let y = ''


const ProtectedRoute = ({ children }) => {

    let location = useLocation();



    return (
        <>
            {y && y.userRole !== "admin" ? <Navigate to="/" state={{ from: location }} replace /> : children}
        </>
    )

};

export default ProtectedRoute; 