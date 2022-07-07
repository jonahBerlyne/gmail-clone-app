import React from 'react';
import "../Styles/Header.css";
import { IconButton, Avatar } from '@mui/material';
import { Menu, Search, ArrowDropDown, Logout } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from '../Redux/hooks';
import { logout, selectUser } from '../Redux/Slices/userSlice';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';

export default function Header() {

  const user: any = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const logOut = async (): Promise<any> => {
    try {
      dispatch(logout());
      await signOut(auth);
    } catch (err) {
      alert(`Sign out error: ${err}`);
    }
  }

  return (
    <div className='header'>

      <div className="header-left">
        <IconButton>
          <Menu />
        </IconButton>
        <img src="/gmailLogo.png" alt="Gmail logo" />
      </div>

      <div className="header-middle">
        <Search />
        <input type="text" readOnly />
        <ArrowDropDown className="input-arrow" />
      </div>

      <div className="header-right">
        <Avatar src={user?.photoUrl ? user?.photoUrl : user?.displayName[0]} alt="Profile pic" />
        <IconButton onClick={logOut}>
          <Logout />
        </IconButton>
      </div>

    </div>
  );
}