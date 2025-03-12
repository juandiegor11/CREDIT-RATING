import React from 'react';

export const Dialog = ({ open, onOpenChange, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded p-4 max-w-lg w-full">
        {children}
      </div>
    </div>
  );
};

export const DialogContent = ({ children, className }) => {
  return (
    <div className={`p-4 ${className}`}>
      {children}
    </div>
  );
};

export const DialogHeader = ({ children }) => {
  return (
    <div className="mb-4">
      {children}
    </div>
  );
};

export const DialogTitle = ({ children }) => {
  return (
    <h2 className="text-xl font-bold">
      {children}
    </h2>
  );
};

export const DialogFooter = ({ children }) => {
  return (
    <div className="mt-4">
      {children}
    </div>
  );
};