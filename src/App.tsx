import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppRoute from './Routes/AppRoute';
import HomePage from './Pages/HomePage';
import Mail from './Components/Mail';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppRoute><HomePage /></AppRoute>} />
        <Route path="/mail" element={<AppRoute><Mail /></AppRoute>} />
      </Routes>
    </Router>
  );
}