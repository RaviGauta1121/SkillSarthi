"use client";

import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

const FAQ = ({ title, content }) => {
  const [isFaq, setIsFaq] = useState(false);
  return (
    <div className="bg-[#1d1c1c]">
      <div
        className="flex justify-between font-bold text-xl p-5 cursor-pointer"
        onClick={() => setIsFaq(!isFaq)}
      >
        {title}
        <button>
          <IoIosArrowDown
            className={` ${isFaq && "rotate-180"} my-auto duration-500 ease-in-out`}
          />
        </button>
      </div>
      <div className={` ${isFaq ? "block" : "hidden"} p-5`}>{content}</div>
    </div>
  );
};

export default FAQ;
