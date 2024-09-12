import React from "react";
import styles from "./styles.scss";

const Select = ({
  type,
  name,
  onChange,
  value,
  placeholder,
  children,
  defaultValue = "",
  noResize = false,
}) => {
  return (
    <select
      className={`border-2 mb-8 border-color-brown text-secondary outline-none p-2 rounded-lg bg-transparent input-font w-4/5 ${
        noResize ? "" : "2xl:w-1/2"
      } custom-select`}
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      defaultValue={defaultValue}
      required
    >
      {children}
    </select>
  );
};

export default Select;
