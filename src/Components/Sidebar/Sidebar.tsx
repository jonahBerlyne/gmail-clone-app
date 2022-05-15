import React from 'react';
import "../../Styles/Sidebar.css";
import { Button, IconButton } from "@mui/material";
import { Add, Inbox, Star, AccessTime, LabelImportant, NearMe, Note, ExpandMore, Person, Duo, Phone } from "@mui/icons-material";
import SidebarOption from "./SidebarOption";
import { useAppDispatch } from '../../Redux/hooks';
import { openSendMessage } from "../../Redux/Slices/mailSlice";

export default function Sidebar() {

  const dispatch = useAppDispatch();

  return (
    <div className='sidebar'>
      <Button
        startIcon={<Add />}
        style={{ fontSize: "large" }}
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
        icon={<ExpandMore />}
        title="More"
        number={17}
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