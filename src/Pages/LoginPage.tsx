import React from 'react';
import "../Styles/Auth.css";
import { Button } from '@mui/material';
import { googleProvider, auth } from '../firebaseConfig'; 
import { signInWithPopup } from 'firebase/auth';
import { useAppDispatch } from '../Redux/hooks';
import { login } from "../Redux/Slices/userSlice";

export default function LoginPage() {

  const dispatch = useAppDispatch();

  const signIn = async (): Promise<any> => {
    try {
      const user = await signInWithPopup(auth, googleProvider);
      dispatch(login({
        email: user.user?.email,
        name: user.user?.displayName,
        photoUrl: user.user?.photoURL
      }));
    } catch (err) {
      alert(`Login error: ${err}`);
    }
  }

  return (
    <div className='login'>
      <div className="login-container">
        <img src="/gmailLogo.png" alt="Gmail logo" />
        <Button
          variant="contained"
          color="primary"
          onClick={signIn}
          sx={{ fontWeight: 400 }}
        >
          Login
        </Button>
      </div>
    </div>
  );
}