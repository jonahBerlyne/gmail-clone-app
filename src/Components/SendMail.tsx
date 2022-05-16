import React, { useState } from 'react';
import "../Styles/SendMail.css";
import { Button } from "@mui/material";
import { Close } from '@mui/icons-material';
import { useAppDispatch } from '../Redux/hooks';
import { closeSendMessage } from '../Redux/Slices/mailSlice';
import fireDB, { auth } from "../firebaseConfig";
import { addDoc, serverTimestamp, collection } from "firebase/firestore";

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
       "from": auth.currentUser?.email,
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
    <div className='send-mail'>
     <div className="send-mail-header">
      <h3>New Message</h3>
      <Close 
        className="send-mail-close" 
        onClick={() => dispatch(closeSendMessage())}
      />
     </div>

     <div className="send-mail-inputs">
      <input placeholder='To' type="text" value={to} onChange={(e) => setTo(e.target.value)} maxLength={50} required />
      <input placeholder='Subject' type="text" value={subject} onChange={(e) => setSubject(e.target.value)} maxLength={50} required />
      <textarea className='send-mail-message' value={msg} onChange={(e) => setMsg(e.target.value)} required />
      <div className="send-mail-options">
        <Button 
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