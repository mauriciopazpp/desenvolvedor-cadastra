import React, { useState } from 'react';

interface AccordionProps {
  title: string;
  children: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="accordion">
      <div className="accordion-header" onClick={() => setIsOpen(!isOpen)}>
        <h6 className='heading-filter'>{title}</h6>
        <span className={`arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </div>
      <div className={`accordion-content ${isOpen ? 'open' : 'closed'}`}>
        {children}
      </div>
    </div>
  );
};

export default Accordion;