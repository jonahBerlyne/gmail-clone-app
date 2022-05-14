import React from 'react';
import "../../Styles/Sidebar.css";
import { Button } from "@mui/material";
import { Add, Inbox } from "@mui/icons-material";
import SidebarOption from "./SidebarOption";

export default function Sidebar() {
  return (
    <div className='sidebar'>
      <Button
        startIcon={<Add />}
        style={{ fontSize: "large" }}
        className="sidebar-compose"
      >
        Compose
      </Button>
      <SidebarOption 
        icon={<Inbox />}
        title="Inbox"
        number={54}
      />
    </div>
  );
}