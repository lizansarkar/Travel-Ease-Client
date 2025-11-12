import React, { use } from 'react'
import { Navigate } from 'react-router';
import LoadingSpinner from '../components/LoadingSpinner';
import { AuthContext } from '../context/AuthContext';

export default function PrivateRoute({children}) {
    // const navigate = useNavigate();
    const {user, loading} = use(AuthContext);

    if(loading) {
        return <LoadingSpinner></LoadingSpinner>
    }

    if (user) {
        return children; 
    }

    if(!user) {
        return <Navigate to="/register"></Navigate>;
    }

    return children;
}
