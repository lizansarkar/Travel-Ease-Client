import React, { useEffect, useState } from 'react'
import { AuthContext } from './AuthContext'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase/firebase.init'

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)

    //first create user
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })
    }

    //signin user
    const signInUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    //observer with useeffects 
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
        })
        return () => {
            unsubscribe()
        }
    }, [])

    //user all authentication details here
    const authInfo = {
        createUser,
        signInUser,
        user,
        loading,
    }

    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    )
}
