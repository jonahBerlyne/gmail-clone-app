import React from 'react';
import "../../Styles/Sidebar.css";

interface Option {
  icon: any;
  title: string;
  number?: number;
  selected?: boolean;
  onClick?: () => Promise<any>;
};

export default function SidebarOption({ icon, title, number, selected, onClick }: Option) {
  return (
    <div className={`sidebar-option ${selected && "sidebar-option-active"}`} onClick={onClick}>
      {icon}
      <h3>{title}</h3>
      <p>{number}</p>
    </div>
  );
}