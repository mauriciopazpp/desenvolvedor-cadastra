import React from 'react';

interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'terciary';
  className?: string;
  extraClasses?: string;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, variant = 'primary', className, extraClasses }) => {
  const baseClass = extraClasses ? `btn ${extraClasses}` : 'btn';
  const variantClass = `btn-${variant}`;
  const buttonClass = `${baseClass} ${variantClass} ${className || ''}`;

  return (
    <button onClick={onClick} className={buttonClass} >
      <span>{label}</span>
    </button>
  );
};

export default Button;
