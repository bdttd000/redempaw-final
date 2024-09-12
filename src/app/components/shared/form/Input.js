import React from "react";

const Input = ({ type, name, onChange, value, placeholder }) => {
  return (
    <input
      className="text-secondary placeholder:text-color-brown border-2 border-color-brown outline-none p-2 rounded-lg bg-transparent input-font w-4/5 2xl:w-1/2"
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required
    />
  );
};

export default Input;
