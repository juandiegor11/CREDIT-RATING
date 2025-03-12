import React from 'react';

export const Button = ({ children, onClick, variant, className }) => {
  const baseClass = "px-4 py-2 rounded";
  const variantClass = variant === "outline" ? "border border-gray-500" : variant === "destructive" ? "bg-red-500 text-white" : "bg-blue-500 text-white";
  return (
    <button onClick={onClick} className={`${baseClass} ${variantClass} ${className}`}>
      {children}
    </button>
  );
};