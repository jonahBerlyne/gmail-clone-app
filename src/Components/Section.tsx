import React from 'react';
import "../Styles/Section.css";

interface SectionInterface {
  icon: any;
  title: string;
  color: string;
  selected?: boolean;
};

export default function Section({ icon, title, color, selected }: SectionInterface) {
  return (
    <div 
      className={`section ${selected && "section-selected"}`} 
      style={{
        borderBottom: `3px solid ${color}`,
        color: `${selected && color}`
      }}
    >
      {icon}
      <h4>{title}</h4>
    </div>
  );
}