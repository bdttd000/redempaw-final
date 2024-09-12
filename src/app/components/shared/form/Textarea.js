import React from "react";

const Textarea = ({ name, onChange, value, placeholder, rows = 5 }) => {
  return (
    <textarea
      className="text-secondary placeholder:text-color-brown border-2 border-color-brown outline-none p-2 rounded-lg bg-transparent input-font w-4/5 2xl:w-1/2"
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      rows={rows}
      required
    />
  );
};

export default Textarea;
