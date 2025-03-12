import React from 'react';

export const Card = ({ children }) => {
  return (
    <div className="bg-white shadow rounded p-4">
      {children}
    </div>
  );
};

export const CardContent = ({ children }) => {
  return (
    <div className="p-4">
      {children}
    </div>
  );
};