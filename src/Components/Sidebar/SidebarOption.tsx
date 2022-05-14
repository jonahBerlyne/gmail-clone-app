import React from 'react';
import "../../Styles/Sidebar.css";

interface Option {
  icon: any;
  title: string;
  number: number;
  selected?: boolean;
};

export default function SidebarOption({ icon, title, number, selected }: Option) {
  return (
    <div className={`sidebar-option ${selected && "sidebar-option-active"}`}>
      {icon}
      <h3>{title}</h3>
      <p>{number}</p>
    </div>
  );
}