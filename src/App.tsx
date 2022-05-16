import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAppSelector } from './Redux/hooks';
import "./Styles/App.css";
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar/Sidebar";
import EmailListPage from './Pages/EmailListPage';
import MailPage from './Pages/MailPage';
import SendMail from './Components/SendMail';
import { selectSendMessageIsOpen } from "./Redux/Slices/mailSlice";
import { selectUser } from './Redux/Slices/userSlice';

export default function App() {

  const sendMessageIsOpen: boolean = useAppSelector(selectSendMessageIsOpen);
  const user: any = useAppSelector(selectUser);

  return (
    <Router>
      <div className="app">
      <Header />
        <div className="app-body">
          <Sidebar />
          <Routes>
            <Route path="/" element={<EmailListPage />} />
            <Route path="/mail" element={<MailPage />} />
          </Routes>
          {sendMessageIsOpen && <SendMail />}
        </div>
      </div>
    </Router>
  );
}