import React from "react";

const Navbar = () => {
  return (
    <>
      <nav className="flex justify-between items-center px-12 h-12 md:mx-40">
        <div className="logo font-bold text-xl cursor-pointer">
          <span className="text-green-700">&lt;</span>
          <span className="text-white">Pass</span>
          <span className="text-green-700">Safe /&gt;</span>
        </div>

        <button>
          <img
            className="invert cursor-pointer hover:scale-125 transition-all"
            width={45}
            src="github.svg"
            alt="github"
          />
        </button>
      </nav>
    </>
  );
};

export default Navbar;
