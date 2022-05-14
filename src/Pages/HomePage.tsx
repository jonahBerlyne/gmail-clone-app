import React from 'react';
import "../Styles/Home.css";
import EmailList from '../Components/EmailList';

export default function HomePage() {
  return (
    <div className='home'>
      <EmailList />
    </div>
  );
}