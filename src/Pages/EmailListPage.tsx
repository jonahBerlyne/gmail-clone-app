import React, { useState, useEffect } from 'react';
import "../Styles/EmailList.css";
import { Checkbox, IconButton } from '@mui/material';
import { ArrowDropDown, Redo, MoreVert, ChevronLeft, ChevronRight, KeyboardHide, Settings, Inbox, People, LocalOffer, Create, Logout } from '@mui/icons-material';
import Section from "../Components/Section";
import EmailRow from '../Components/EmailRow';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import fireDB, { auth } from '../firebaseConfig';
import { getAuth, signOut } from 'firebase/auth';
import { useAppDispatch } from '../Redux/hooks';
import { openSendMessage } from '../Redux/Slices/mailSlice';
import { logout } from '../Redux/Slices/userSlice';

export default function EmailListPage() {

  const [emails, setEmails] = useState<any[]>([]);
  
  useEffect(() => {
    const q = query(collection(fireDB, "email addresses", `${getAuth().currentUser?.email}`, "emails"), orderBy("timestamp", "desc"));
    const unsub = onSnapshot(q, snapshot => {
      if (!snapshot.metadata.hasPendingWrites) {
        let emailsArr: any[] = [];
        snapshot.docs.forEach(doc => {
          const emailDoc = {
            ...doc.data(),
            id: doc.id
          };
          emailsArr.push(emailDoc);
        });
        console.log(emailsArr);
        setEmails(emailsArr);
      }
    });
    return unsub;
  }, []);

  const dispatch = useAppDispatch();

  const logOut = async (): Promise<any> => {
    try {
      dispatch(logout());
      await signOut(auth);
    } catch (err) {
      alert(`Sign out error: ${err}`);
    }
  }

  return (
    <div className='email-list'>

      <div className="email-list-settings">
        <div className="email-list-settings-left">
          <div className="email-list-settings-left-icons">          
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
          <div className="email-list-settings-signout">
            <IconButton onClick={() => logOut()}>
              <Logout />
            </IconButton>
          </div>
        </div>

        <div className="email-list-settings-header">
          <p>Primary</p>
        </div>

        <div className="email-list-settings-msg">
          <IconButton onClick={() => dispatch(openSendMessage())}>
            <Create />
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
      </div>

      <div className="email-list-sections">
        <Section 
          icon={<Inbox />}
          title="Primary"
          color="red"
          testId={1}
          selected
        />
        <Section 
          icon={<People />}
          title="Social"
          color="#1A73E8"
          testId={2}
        />
        <Section 
          icon={<LocalOffer />}
          title="Promotions"
          color="green"
          testId={3}
        />
      </div>

      <div className="email-list-rows">
        {emails.map(email => {
          const date = new Date(email?.timestamp.seconds*1000);
          return (
            <EmailRow 
              from={email.from}
              subject={email.subject}
              msg={email.msg}
              time={`${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`}
              key={email.id}
              id={email.id}
            />
          );
        })}
      </div>

    </div>
  );
}