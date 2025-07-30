"use client";
import React from "react";

export default function Loader({ 
  variant = "default", 
  message = "Loading...",
  showMessage = true 
}) {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[999999999] flex items-center justify-center">
      <div className="flex flex-col items-center space-y-6">
        
        {/* Default spinner */}
        {variant === "default" && (
          <div className="w-16 h-16 border-4 border-gray-300 border-t-violet-500 rounded-full animate-spin"></div>
        )}

        {/* Wave variant */}
        {variant === "wave" && (
          <div className="relative flex items-center justify-center">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="absolute w-16 h-16 border-2 border-violet-400/50 rounded-full animate-ping"
                style={{
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: '2s'
                }}
              ></div>
            ))}
            <div className="w-8 h-8 bg-violet-500 rounded-full"></div>
          </div>
        )}

        {/* Helix variant */}
        {variant === "helix" && (
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 animate-spin" style={{ animationDuration: '2s' }}>
              <div className="w-full h-full border-2 border-transparent border-t-violet-400 border-b-purple-400 rounded-full"></div>
            </div>
            <div className="absolute inset-2 animate-spin" style={{ animationDuration: '1.5s', animationDirection: 'reverse' }}>
              <div className="w-full h-full border-2 border-transparent border-l-cyan-400 border-r-pink-400 rounded-full"></div>
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-violet-500 rounded-full"></div>
          </div>
        )}

        {/* Quantum variant */}
        {variant === "quantum" && (
          <div className="relative w-20 h-20">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute w-3 h-3 bg-violet-400 rounded-full animate-pulse"
                style={{
                  top: `${50 + 35 * Math.sin((i * Math.PI * 2) / 8)}%`,
                  left: `${50 + 35 * Math.cos((i * Math.PI * 2) / 8)}%`,
                  transform: 'translate(-50%, -50%)',
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: '1.5s'
                }}
              ></div>
            ))}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 border-2 border-violet-400 rounded-full animate-spin"></div>
          </div>
        )}

        {/* Loading message */}
        {showMessage && (
          <div className="text-white font-medium text-lg">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}