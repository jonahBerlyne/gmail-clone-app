import React from 'react';
import "../Styles/Home.css";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar/Sidebar";

export default function HomePage() {
  return (
    <div className='home'>
      <Header />
      <Sidebar />
    </div>
  );
}