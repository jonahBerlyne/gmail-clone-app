import React from 'react';
import "../../Styles/Sidebar.css";

interface Option {
  icon: any;
  title: string;
  number?: number;
  selected?: boolean;
  onClick?: () => Promise<any>;
  testId: number;
};

export default function SidebarOption({ icon, title, number, selected, onClick, testId }: Option) {
  return (
    <div className={`sidebar-option ${selected && "sidebar-option-active"}`} onClick={onClick}>
      {icon}
      <h3 data-testid={`title${testId}`}>{title}</h3>
      <p data-testid={`emails${testId}`}>{number}</p>
    </div>
  );
}