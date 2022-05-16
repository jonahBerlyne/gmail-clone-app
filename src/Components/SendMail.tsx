import React from 'react';
import "../Styles/SendMail.css";
import { Button } from "@mui/material";
import { Close } from '@mui/icons-material';
import { useForm } from "react-hook-form";
import { useAppDispatch } from '../Redux/hooks';
import { closeSendMessage } from '../Redux/Slices/mailSlice';
import fireDB from "../firebaseConfig";
import { addDoc, serverTimestamp, collection } from "firebase/firestore";

export default function SendMail() {

  const dispatch = useAppDispatch();

  const {
   register,
   handleSubmit,
   watch,
   formState: { errors }
  } = useForm();

  const sendMail = async (formData: any): Promise<any> => {
   try {
     const collectionRef = collection(fireDB, "emails");
     const emailDoc = {
       "to": formData.to,
       "subject": formData.subject,
       "message": formData.message,
       "timestamp": serverTimestamp()
     };
     await addDoc(collectionRef, emailDoc);
     dispatch(closeSendMessage());
   } catch (err) {
     alert(`Send mail error: ${err}`);
   }
  }

  return (
    <div className='send-mail'>
     <div className="send-mail-header">
      <h3>Message</h3>
      <Close 
        className="send-mail-close" 
        onClick={() => dispatch(closeSendMessage())}
      />
     </div>

     <form onSubmit={handleSubmit(sendMail)}>
      <input placeholder='To' type="text" {...register("to", { required: true })} />
      {errors.to && <p className="send-mail-error">Input required</p>}
      <input placeholder='Subject' type="text" {...register("subject", { required: true })} />
      {errors.subject && <p className="send-mail-error">Input required</p>}
      <input placeholder='Message...' className='send-mail-message' type="text" {...register("message", { required: true })} />
      {errors.message && <p className="send-mail-error">Input required</p>}
     </form>

     <div className="send-mail-options">
      <Button className='send-mail-btn'>Send</Button>
     </div>

    </div>
  );
}