import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { onAuthStateChanged, User } from 'firebase/auth';
import { useDispatch } from "react-redux";
import { AppDispatch, store } from '../Redux/store';
import { login } from "../Redux/Slices/userSlice";
import { doc, getDoc } from "firebase/firestore";
import fireDB, { auth } from "../firebaseConfig";

export default function AppRoute ({children}: {children: any}) {
 const [pending, setPending] = useState<boolean>(true);
 const [currentUser, setCurrentUser] = useState<any>(null);
 const dispatch = useDispatch<AppDispatch>();

 useEffect(() => {
  const unsub = onAuthStateChanged(
   auth,
   user => {
    if (user) {
      setCurrentUser(user);
      dispatch(login({
        email: user?.email,
        name: user?.displayName,
        photoUrl: user?.photoURL
      }));
    } else {
      setCurrentUser(null);
    }
    setPending(false);
   },
   err => {
    alert(`Error: ${err}`);
    setPending(false);
   }
  );

  return unsub;
 }, []);

 if (pending) return null;

 if (currentUser) {
  return children;
 } else {
   return <Navigate to="/login" />;
 }
}