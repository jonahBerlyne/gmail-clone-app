import React from 'react';
import "../Styles/Section.css";

interface SectionInterface {
  icon: any;
  title: string;
  color: string;
  testId: number;
  selected?: boolean;
};

export default function Section({ icon, title, color, testId, selected }: SectionInterface) {
  return (
    <div 
      className={`section ${selected && "section-selected"}`} 
      style={{
        borderBottom: `3px solid ${color}`,
        color: `${selected && color}`
      }}
    >
      {icon}
      <h4 data-testid={`sectionTitle${testId}`}>{title}</h4>
    </div>
  );
}