// components/Cards/MeteorCard.js
"use client";

import { useEffect, useState } from "react";

export const Meteors = ({ number = 20 }) => {
  const [meteors, setMeteors] = useState([]);

  useEffect(() => {
    const meteorArray = Array.from({ length: number }, (_, i) => ({
      id: i,
      left: Math.floor(Math.random() * 100) + "%",
      animationDelay: Math.random() * 0.6 + 0.2 + "s",
      animationDuration: Math.floor(Math.random() * 8 + 2) + "s",
    }));
    setMeteors(meteorArray);
  }, [number]);

  return (
    <>
      {meteors.map((meteor) => (
        <span
          key={meteor.id}
          className="animate-meteor-effect absolute top-1/2 left-1/2 h-0.5 w-0.5 rounded-full bg-slate-500 shadow-[0_0_0_1px_#ffffff10] rotate-[215deg] before:content-[''] before:absolute before:top-1/2 before:transform before:-translate-y-1/2 before:w-12 before:h-px before:bg-gradient-to-r before:from-slate-500 before:to-transparent"
          style={{
            top: 0,
            left: meteor.left,
            animationDelay: meteor.animationDelay,
            animationDuration: meteor.animationDuration,
          }}
        ></span>
      ))}
      <style jsx>{`
        @keyframes meteor-effect {
          from {
            transform: translateY(-100vh) translateX(0);
            opacity: 1;
          }
          to {
            transform: translateY(100vh) translateX(-50px);
            opacity: 0;
          }
        }
        .animate-meteor-effect {
          animation: meteor-effect linear infinite;
        }
      `}</style>
    </>
  );
};