import React from 'react';

export const Input = ({ placeholder, name, value, onChange, className }) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      className={`p-2 border rounded ${className}`}
    />
  );
};