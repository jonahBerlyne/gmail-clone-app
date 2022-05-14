import React from 'react';
import Header from '../Components/Header';
import Sidebar from '../Components/Sidebar/Sidebar';

export default function AppRoute({ children }: { children: any }) {
  return (
    <div>
      <Header />
      <div className="app-body">
        <Sidebar />
      </div>
      {children}
    </div>
  );
}