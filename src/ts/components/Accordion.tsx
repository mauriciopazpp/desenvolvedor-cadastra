import React, { useState } from 'react';

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  onToggle?: (isOpen: boolean) => void;
}

const Accordion: React.FC<AccordionProps> = ({ title, children, onToggle }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    if (onToggle) {
      onToggle(newState);
    }
  };

  return (
    <div className="accordion">
      <div className="accordion-header" onClick={handleToggle}>
        <h6 className='heading-filter'>{title}</h6>
        <span className={`arrow arrow-down ${isOpen ? 'open' : ''}`}></span>
      </div>
      <div className={`accordion-content ${isOpen ? 'open' : 'closed'}`}>
        {children}
      </div>
    </div>
  );
};

export default Accordion;
