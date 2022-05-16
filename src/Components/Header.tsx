import React from 'react';
import "../Styles/Header.css";
import { IconButton, Avatar } from '@mui/material';
import { Menu, Search, ArrowDropDown, Apps, Notifications } from "@mui/icons-material";
import { useAppSelector } from '../Redux/hooks';
import { selectUser } from '../Redux/Slices/userSlice';

export default function Header() {

  const user: any = useAppSelector(selectUser);

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
        <input type="text" />
        <ArrowDropDown className="input-arrow" />
      </div>

      <div className="header-right">
        <IconButton>
          <Apps />
        </IconButton>
        <IconButton>
          <Notifications />
        </IconButton>
        <Avatar src={user?.photoUrl} alt="Profile pic" />
      </div>

    </div>
  );
}