import React from 'react';
import "../Styles/SendMail.css";
import { Button } from "@mui/material";
import { Close } from '@mui/icons-material';
import { useForm } from "react-hook-form";
import { useAppDispatch } from '../Redux/hooks';
import { closeSendMessage } from '../Redux/Slices/mailSlice';

export default function SendMail() {

  const dispatch = useAppDispatch();

  const {
   register,
   handleSubmit,
   watch,
   formState: { errors }
  } = useForm();

  const onSubmit = (formData: any) => {
   console.log(formData);
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

     <form onSubmit={handleSubmit(onSubmit)}>
      <input placeholder='To' type="text" {...register("toRequired", { required: true })} />
      {errors.toRequired && <p className="send-mail-error">Input required</p>}
      <input placeholder='Subject' type="text" {...register("subjectRequired", { required: true })} />
      {errors.subjectRequired && <p className="send-mail-error">Input required</p>}
      <input placeholder='Message...' className='send-mail-message' type="text" {...register("messageRequired", { required: true })} />
      {errors.messageRequired && <p className="send-mail-error">Input required</p>}
     </form>

     <div className="send-mail-options">
      <Button className='send-mail-btn'>Send</Button>
     </div>

    </div>
  );
}