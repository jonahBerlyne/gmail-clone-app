import React from 'react';
import "../Styles/EmailList.css";
import { Checkbox, IconButton } from '@mui/material';
import { ArrowDropDown, Redo, MoreVert, ChevronLeft, ChevronRight, KeyboardHide, Settings } from '@mui/icons-material';

export default function EmailList() {
  return (
    <div className='email-list'>
      <div className="emailList-settings">
        <div className="emailList-settings-left">
          <Checkbox />

          <IconButton>
            <ArrowDropDown />
          </IconButton>

          <IconButton>
            <Redo />
          </IconButton>

          <IconButton>
            <MoreVert />
          </IconButton>
        </div>

        <div className="emailList-settings-right">
          <IconButton>
            <ChevronLeft />
          </IconButton>
          <IconButton>
            <ChevronRight />
          </IconButton>
          <IconButton>
            <KeyboardHide />
          </IconButton>
          <IconButton>
            <Settings />
          </IconButton>
        </div>

        <div className="emailList-sections">
          
        </div>

      </div>
    </div>
  );
}