import React, { useState } from 'react';
import "../Styles/SendMail.css";
import { Button } from "@mui/material";
import { Close } from '@mui/icons-material';
import { useAppDispatch } from '../Redux/hooks';
import { closeSendMessage } from '../Redux/Slices/mailSlice';
import fireDB, { auth } from "../firebaseConfig";
import { addDoc, serverTimestamp, collection } from "firebase/firestore";
import { getAuth } from 'firebase/auth';

export default function SendMail() {

  const [to, setTo] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [msg, setMsg] = useState<string>("");

  const dispatch = useAppDispatch();

  const sendMail = async (to: string, subject: string, msg: string): Promise<any> => {
   try {
     dispatch(closeSendMessage());
     const collectionRef = collection(fireDB, "email addresses", `${to}`, "emails");
     const emailDoc = {
       "from": getAuth().currentUser?.email,
       to,
       subject,
       msg,
       "timestamp": serverTimestamp()
     };
     await addDoc(collectionRef, emailDoc);
   } catch (err) {
     alert(`Send mail error: ${err}`);
   }
  }

  return (
    <div data-testid="sendMail" className='send-mail'>
     <div className="send-mail-header">
      <h3 data-testid="newMsg">New Message</h3>
      <Close 
        className="send-mail-close" 
        onClick={() => dispatch(closeSendMessage())}
      />
     </div>

     <div className="send-mail-inputs">
      <input data-testid="to" placeholder='To' type="text" value={to} onChange={(e) => setTo(e.target.value)} maxLength={50} required />
      <input data-testid="subj" placeholder='Subject' type="text" value={subject} onChange={(e) => setSubject(e.target.value)} maxLength={50} required />
      <textarea data-testid="msg" className='send-mail-message' value={msg} onChange={(e) => setMsg(e.target.value)} required />
      <div className="send-mail-options">
        <Button 
          data-testid="sendMailBtn"
          className='send-mail-btn'
          variant="contained"
          color="primary"
          onClick={() => sendMail(to, subject, msg)}
          disabled={to === "" || subject === "" || msg === ""}
        >
          Send
        </Button>
      </div>
     </div>


    </div>
  );
}