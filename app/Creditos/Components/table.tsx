import React from 'react';

export const Table = ({ children }) => {
  return (
    <table className="min-w-full bg-white">
      {children}
    </table>
  );
};

export const TableHeader = ({ children }) => {
  return (
    <thead>
      {children}
    </thead>
  );
};

export const TableRow = ({ children }) => {
  return (
    <tr>
      {children}
    </tr>
  );
};

export const TableHead = ({ children }) => {
  return (
    <th className="py-2 px-4 border-b">
      {children}
    </th>
  );
};

export const TableBody = ({ children }) => {
  return (
    <tbody>
      {children}
    </tbody>
  );
};

export const TableCell = ({ children }) => {
  return (
    <td className="py-2 px-4 border-b">
      {children}
    </td>
  );
};