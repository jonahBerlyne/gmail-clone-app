import React from 'react';
import "../../Styles/Sidebar.css";
import { Button, IconButton } from "@mui/material";
import { Add, Inbox, Star, AccessTime, LabelImportant, NearMe, Note, ExpandMore, Person, Duo, Phone, Logout } from "@mui/icons-material";
import SidebarOption from "./SidebarOption";
import { useAppDispatch } from '../../Redux/hooks';
import { openSendMessage } from "../../Redux/Slices/mailSlice";
import { logout } from "../../Redux/Slices/userSlice";
import { signOut } from 'firebase/auth';
import { auth } from '../../firebaseConfig';

export default function Sidebar() {

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
    <div className='sidebar'>
      <Button
        startIcon={<Add />}
        style={{ 
          fontSize: "large"
        }}
        color="primary"
        className="sidebar-compose"
        onClick={() => dispatch(openSendMessage())}
      >
        Compose
      </Button>
      <SidebarOption 
        icon={<Inbox />}
        title="Inbox"
        number={54}
        selected={true}
      />
      <SidebarOption 
        icon={<Star />}
        title="Starred"
        number={23}
      />
      <SidebarOption 
        icon={<AccessTime />}
        title="Snoozed"
        number={82}
      />
      <SidebarOption 
        icon={<LabelImportant />}
        title="Important"
        number={44}
      />
      <SidebarOption 
        icon={<NearMe />}
        title="Sent"
        number={5}
      />
      <SidebarOption 
        icon={<Note />}
        title="Drafts"
        number={2}
      />
      <SidebarOption 
        icon={<Logout />}
        title="Sign out"
        onClick={logOut}
      />
      <SidebarOption 
        icon={<ExpandMore />}
        title="More"
      />

      <div className="sidebar-footer">
        <div className="sidebar-footer-icons">
          <IconButton>
            <Person />
          </IconButton>
          <IconButton>
            <Duo />
          </IconButton>
          <IconButton>
            <Phone />
          </IconButton>
        </div>
      </div>

    </div>
  );
}