import React from 'react';
import "../Styles/EmailRow.css";
import { Checkbox, IconButton } from "@mui/material";
import { StarBorderOutlined, LabelImportantOutlined, Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from '../Redux/hooks';
import { selectMail } from "../Redux/Slices/mailSlice";
import { deleteDoc, doc } from 'firebase/firestore';
import fireDB, { auth } from '../firebaseConfig';

interface Row {
  title: string;
  subject: string;
  message: string;
  time: string;
  id?: any;
}

export default function EmailRow({ title, subject, message, time, id }: Row) {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const openMail = (): void => {
    dispatch(
      selectMail({
        title, 
        subject, 
        message, 
        time, 
        id
    }));
    navigate("/mail");
  }

  const deleteEmail = async (): Promise<any> => {
    try {
      const docRef = doc(fireDB, "email addresses", `${auth.currentUser?.email}`, "emails", `${id}`);
      await deleteDoc(docRef);
    } catch (err) {
      alert(`Tweet deletion error: ${err}`);
    }
  }

  return (
    <div key={id} className='email-row'>

      <div className="email-row-options">
        <Checkbox />
        <IconButton>
          <StarBorderOutlined />
        </IconButton>
        <IconButton>
          <LabelImportantOutlined />
        </IconButton>
        <IconButton onClick={deleteEmail}>
          <Delete />
        </IconButton>
      </div>

      <div className="email-row-content" onClick={openMail}>

      {/* <h3 className="email-row-title">
        {title}
      </h3> */}

      <div className="email-row-message">
        <h4>{subject}{""}</h4>
        <span className="email-row-description">-{message}</span>
      </div>

      <p className="email-row-time">
        {time}
      </p>

      </div>

    </div>
  );
}