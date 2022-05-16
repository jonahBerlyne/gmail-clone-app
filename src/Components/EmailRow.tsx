import React from 'react';
import "../Styles/EmailRow.css";
import { Checkbox, IconButton } from "@mui/material";
import { StarBorderOutlined, LabelImportantOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

interface Row {
  title: string;
  subject: string;
  description: string;
  time: string;
  id?: any;
}

export default function EmailRow({ title, subject, description, time, id }: Row) {

  const navigate = useNavigate();

  return (
    <div key={id} className='email-row' onClick={() => navigate("/mail")}>

      <div className="email-row-options">
        <Checkbox />
        <IconButton>
          <StarBorderOutlined />
        </IconButton>
        <IconButton>
          <LabelImportantOutlined />
        </IconButton>
      </div>

      <h3 className="email-row-title">
        {title}
      </h3>

      <div className="email-row-message">
        <h4>{subject}{""}</h4>
        <span className="email-row-description">-{description}</span>
      </div>

      <p className="email-row-time">
        {time}
      </p>

    </div>
  );
}