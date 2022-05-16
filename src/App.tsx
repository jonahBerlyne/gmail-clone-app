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
import LoginPage from './Pages/LoginPage';
import AppRoute from './Routes/AppRoute';
import AuthRoute from './Routes/AuthRoute';

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
            <Route path="/" element={<AppRoute><EmailListPage /></AppRoute>} />
            <Route path="/mail" element={<AppRoute><MailPage /></AppRoute>} />
            <Route path="/login" element={<AuthRoute><LoginPage /></AuthRoute>} />
          </Routes>
          {sendMessageIsOpen && user && <SendMail />}
        </div>
      </div>
    </Router>
  );
}