import React, { SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {}

export const Select: React.FC<SelectProps> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <select
      className={`px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white ${className}`}
      {...props}
    >
      {children}
    </select>
  );
};
