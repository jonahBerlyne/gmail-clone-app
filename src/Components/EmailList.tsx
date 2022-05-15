import React from 'react';
import "../Styles/EmailList.css";
import { Checkbox, IconButton } from '@mui/material';
import { ArrowDropDown, Redo, MoreVert, ChevronLeft, ChevronRight, KeyboardHide, Settings, Inbox, People, LocalOffer } from '@mui/icons-material';
import Section from "./Section";
import EmailRow from './EmailRow';

export default function EmailList() {
  return (
    <div className='email-list'>

      <div className="email-list-settings">
        <div className="email-list-settings-left">
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

        <div className="email-list-settings-right">
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

        <div className="email-list-sections">
          <Section 
            icon={<Inbox />}
            title="Primary"
            color="red"
            selected
          />
          <Section 
            icon={<People />}
            title="Social"
            color="#1A73E8"
          />
          <Section 
            icon={<LocalOffer />}
            title="Promotions"
            color="green"
          />
        </div>

      </div>

      <div className="email-list-rows">
        <EmailRow 
          title="Example title"
          subject='Example subject'
          description='Example description'
          time="8pm"
        />
      </div>

    </div>
  );
}