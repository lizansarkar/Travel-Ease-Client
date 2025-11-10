import React, { use } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Navigate } from 'react-router';

export default function PrivateRoute({children}) {
    const {user} = use(AuthContext)

    if(!user) {
        return <Navigate to="/register"></Navigate>
    }

    return children;
}
