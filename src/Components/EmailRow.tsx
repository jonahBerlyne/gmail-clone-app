import React from 'react';
import "../Styles/EmailRow.css";
import { Checkbox, IconButton } from "@mui/material";
import { StarBorderOutlined, LabelImportantOutlined, Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from '../Redux/hooks';
import { selectMail } from "../Redux/Slices/mailSlice";
import { deleteDoc, doc } from 'firebase/firestore';
import fireDB, { auth } from '../firebaseConfig';
import { getAuth } from 'firebase/auth';

interface Row {
  from: string;
  subject: string;
  msg: string;
  time: string;
  id?: any;
}

export default function EmailRow({ from, subject, msg, time, id }: Row) {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const openMail = (): void => {
    dispatch(
      selectMail({
        from, 
        subject, 
        msg, 
        time, 
        id
    }));
    navigate("/mail");
  }

  const deleteEmail = async (): Promise<any> => {
    try {
      const docRef = doc(fireDB, "email addresses", `${getAuth().currentUser?.email}`, "emails", `${id}`);
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
      <div data-testid={`openMail${id}`} className="email-row-message" onClick={openMail}>
          <h3 data-testid={`emailFrom${id}`} className="email-row-from">
            {from}
          </h3>
          <h4 data-testid={`subj${id}`}>{subject}{""}</h4>
          <span data-testid={`msg${id}`} className="email-row-description">{msg}</span>
          <p data-testid={`time${id}`} className="email-row-time">
            {time}
          </p>
      </div>

    </div>
  );
}