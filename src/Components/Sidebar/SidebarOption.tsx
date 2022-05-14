import React from 'react';
import "../../Styles/SidebarOption.css";

interface Option {
  icon: any;
  title: string;
  number: number;
};

export default function SidebarOption({ icon, title, number }: Option) {
  return (
    <div>SidebarOption</div>
  );
}