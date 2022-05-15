import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./Styles/App.css";
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar/Sidebar";
import EmailListPage from './Pages/EmailListPage';
import MailPage from './Pages/MailPage';

export default function App() {
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
        </div>
      </div>
    </Router>
  );
}