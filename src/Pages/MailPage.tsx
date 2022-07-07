import React, { useEffect } from 'react';
import "../Styles/Mail.css";
import { IconButton } from '@mui/material';
import { ArrowBack, MoveToInbox, Error, Email, WatchLater, CheckCircle, LabelImportant, MoreVert, UnfoldMore, Print, ExitToApp } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../Redux/hooks';
import { selectMail, selectOpenMail } from '../Redux/Slices/mailSlice'; 

export default function MailPage() {

  const selectedMail = useAppSelector(selectOpenMail);
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    if (selectedMail) {
      localStorage.setItem("mail", JSON.stringify(selectedMail));
    } else {
      const mail = JSON.parse(localStorage.getItem("mail") || "{}");
      if (mail) dispatch(
        selectMail({
            from: mail.from, 
            subject: mail.subject, 
            msg: mail.msg, 
            time: mail.time, 
            id: mail.id
        })
      );
    }
  }, [selectedMail]);

  const navigate = useNavigate();

  const goBackToEmailList = (): void => {
    localStorage.removeItem("mail");
    navigate("/");
  }

  return (
    <div data-testid="mail" className='mail' key={selectedMail?.id}>

      {selectedMail && 
        <>        
          <div className="mail-tools">

            <div className="mail-tools-left">
              <IconButton onClick={() => goBackToEmailList()}><ArrowBack /></IconButton>
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
                <h2 data-testid="mailSubj">{selectedMail?.subject}</h2>
                <p data-testid="mailFrom">{"<"}{selectedMail?.from}{">"}</p>
              </div>
              <div className='mail-time'>          
                <p data-testid="mailTime">{selectedMail?.time}</p>
              </div>
            </div>

            <div data-testid="mailMsg" className="mail-message">
              <p>{selectedMail?.msg}</p>
            </div>
          </div>
        </>      
      }


    </div>
  );
}