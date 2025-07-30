import React from "react";
import { Meteors } from "@/components/Cards/MeteorCard";
import Link from "next/link";

export default function MeteorsDemo() {
  const cardData = {
    title: "Doubts Title",
    description:
      "Description of Doubts will be provided here but in emphasised form",
  };

  // Create an array with 5 elements to map over
  const cardsArray = Array(5).fill(cardData);

  return (
    <div className="h-screen w-screen pt-16 bg-gray-950">
      {" "}
      <div className="flex flex-wrap gap-4">
        {cardsArray.map((data, index) => (
          <div key={index} className="w-full relative max-w-xs">
            <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] bg-red-500 rounded-full blur-3xl" />
            <div className="relative shadow-xl bg-gray-900 border border-gray-800 px-4 py-8 h-full overflow-hidden rounded-2xl flex flex-col justify-end items-start">
              <div className="h-5 w-5 rounded-full border flex items-center justify-center mb-4 border-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-2 w-2 text-gray-300"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25"
                  />
                </svg>
              </div>

              <h1 className="font-bold text-xl text-white mb-4 relative z-50 bg-gray-900">
                {data.title}
              </h1>

              <p className="font-normal text-base text-slate-500 mb-4 relative bg-gray-900 z-50">
                {data.description}
              </p>

              <button className="border px-3 py-1 rounded-md border-gray-500 text-gray-300 text-sm">
                Read
              </button>

              {/* Meaty part - Meteor effect */}
              <Meteors number={15} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
