import React from 'react';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar/Sidebar';
import "../Styles/App.css";

export default function AppRoute({ children }: { children: any }) {
  return (
    <div className='app'>
      <Header />
      <div className="app-body">
        <Sidebar />
        {children}
      </div>
    </div>
  );
}