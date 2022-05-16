import React from 'react';
import "../Styles/Mail.css";
import { IconButton } from '@mui/material';
import { ArrowBack, MoveToInbox, Error, Delete, Email, WatchLater, CheckCircle, LabelImportant, MoreVert, UnfoldMore, Print, ExitToApp } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../Redux/hooks';
import { selectOpenMail } from '../Redux/Slices/mailSlice';
import { store } from "../Redux/store";

export default function MailPage() {

  const selectedMail = useAppSelector(selectOpenMail);
  console.log(store.getState());
  const navigate = useNavigate();

  return (
    <div className='mail' key={selectedMail?.id}>

      <div className="mail-tools">

        <div className="mail-tools-left">
          <IconButton onClick={() => navigate("/")}><ArrowBack /></IconButton>
          <IconButton><MoveToInbox /></IconButton>
          <IconButton><Error /></IconButton>
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
          <div className="mail-body-header-info">
            <h2>{selectedMail?.subject}</h2>
            <p>{"<"}{selectedMail?.from}{">"}</p>
          </div>
          <LabelImportant className="mail-important" />
          <p className='mail-time'>{selectedMail?.time}</p>
        </div>

        <div className="mail-message">
          <p>{selectedMail?.msg}</p>
        </div>
      </div>

    </div>
  );
}