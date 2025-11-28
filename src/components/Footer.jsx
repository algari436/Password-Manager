import React from "react";

const Footer = () => {
  return (
    <div className="footer flex w-full font-extrabold text-white md:text-xl gap-4 justify-center p-4">
      <div className="logo font-bold md:text-xl md:mx-20">
        <span className="text-green-700">&lt;</span>
        <span className="text-white">Pass</span>
        <span className="text-green-700">Safe /&gt;</span>
      </div>
      <div className="text md:mx-20">
        Created by <span className="text-green-700">Aryan Baadlas</span>
      </div>
    </div>
  );
};

export default Footer;
