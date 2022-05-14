import React from 'react';
import "../Styles/Header.css";
import { IconButton, Avatar } from '@mui/material';
import { Menu, Search, ArrowDropDown, Apps, Notifications } from "@mui/icons-material";

export default function Header() {
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
        <Avatar />
      </div>

    </div>
  );
}