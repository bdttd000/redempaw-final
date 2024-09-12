import Link from "next/link";
import React from "react";

const Redirect = ({ href, text }) => {
  return (
    <Link
      href={href}
      className="outline-none light-bg p-2 rounded-lg text-white input-font w-4/5 2xl:w-1/2"
    >
      {text}
    </Link>
  );
};

export default Redirect;
