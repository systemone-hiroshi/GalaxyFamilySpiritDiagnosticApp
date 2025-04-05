// /src/components/UI/Button.jsx
import React from 'react';

const Button = ({ 
  children, 
  onClick, 
  type = 'primary', 
  disabled = false,
  submit = false
}) => {
  const buttonClasses = `button button-${type} ${disabled ? 'button-disabled' : ''}`;
  
  return (
    <button 
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      type={submit ? 'submit' : 'button'}
    >
      {children}
      
      <style jsx>{`
        .button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          border: none;
          outline: none;
        }
        
        .button-primary {
          background: linear-gradient(135deg, #FF9966 0%, #FF7733 100%);
          color: white;
          box-shadow: 0 4px 12px rgba(255, 153, 102, 0.3);
        }
        
        .button-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(255, 153, 102, 0.4);
        }
        
        .button-secondary {
          background-color: #f0f0f0;
          color: #333;
          border: 1px solid #ddd;
        }
        
        .button-secondary:hover {
          background-color: #e0e0e0;
        }
        
        .button-disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        
        .button-disabled:hover {
          transform: none;
          box-shadow: none;
        }
      `}</style>
    </button>
  );
};

export default Button;