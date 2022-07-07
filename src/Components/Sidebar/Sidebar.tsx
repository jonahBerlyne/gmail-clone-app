import React from 'react';
import "../../Styles/Sidebar.css";
import { Button, IconButton } from "@mui/material";
import { Add, Inbox, Star, AccessTime, LabelImportant, NearMe, Note, ExpandMore, Person, Duo, Phone } from "@mui/icons-material";
import SidebarOption from "./SidebarOption";
import { useAppDispatch } from '../../Redux/hooks';
import { openSendMessage } from "../../Redux/Slices/mailSlice";
import { logout } from "../../Redux/Slices/userSlice";
import { signOut } from 'firebase/auth';
import { auth } from '../../firebaseConfig';

export default function Sidebar() {

  const dispatch = useAppDispatch();

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
        testId={1}
      />
      <SidebarOption 
        icon={<Star />}
        title="Starred"
        number={23}
        testId={2}
      />
      <SidebarOption 
        icon={<AccessTime />}
        title="Snoozed"
        number={82}
        testId={3}
      />
      <SidebarOption 
        icon={<LabelImportant />}
        title="Important"
        number={4}
        testId={4}
      />
      <SidebarOption 
        icon={<NearMe />}
        title="Sent"
        number={77}
        testId={5}
      />
      <SidebarOption 
        icon={<Note />}
        title="Drafts"
        number={2}
        testId={6}
      />
      <SidebarOption 
        icon={<ExpandMore />}
        title="More"
        testId={7}
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