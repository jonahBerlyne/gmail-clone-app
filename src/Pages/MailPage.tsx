import React from 'react';
import "../Styles/Mail.css";
import { IconButton } from '@mui/material';
import { ArrowBack, MoveToInbox, Error, Delete, Email, WatchLater, CheckCircle, LabelImportant, MoreVert, UnfoldMore, Print, ExitToApp } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function MailPage() {

  const navigate = useNavigate();

  return (
    <div className='mail'>

      <div className="mail-tools">

        <div className="mail-tools-left">
          <IconButton onClick={() => navigate("/")}><ArrowBack /></IconButton>
          <IconButton><MoveToInbox /></IconButton>
          <IconButton><Error /></IconButton>
          <IconButton><Delete /></IconButton>
          <IconButton><Email /></IconButton>
          <IconButton><WatchLater /></IconButton>
          <IconButton><CheckCircle /></IconButton>
          <IconButton><LabelImportant /></IconButton>
          <IconButton><MoreVert /></IconButton>
        </div>

        <div className="mail-tools-right">
          <IconButton><UnfoldMore /></IconButton>
          <IconButton><Print /></IconButton>
          <IconButton><ExitToApp /></IconButton>
        </div>
      </div>
      
      <div className="mail-body">
        <div className="mail-body-header">
          <h2>Subject</h2>
          <LabelImportant className="mail-important" />
          <p>Title</p>
          <p className='mail-time'>3pm</p>
        </div>

        <div className="mail-message">
          <p>Message</p>
        </div>
      </div>

    </div>
  );
}