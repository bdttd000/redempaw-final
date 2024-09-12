import React from "react";

const Submit = ({ text }) => {
  return (
    <input
      type="submit"
      className="outline-none cursor-pointer light-bg p-2 rounded-lg text-white input-font input-font w-4/5 2xl:w-1/2"
      value={text}
    />
  );
};

export default Submit;
