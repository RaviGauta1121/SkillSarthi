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
        {/* Uiverse.io circles loader */}
        {variant === "default" && (
          <div className="flex justify-center items-center">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="relative flex items-center justify-center w-5 h-5 border-2 border-gray-300 rounded-full mx-2.5 bg-transparent"
                style={{
                  animation: `circleKeys 2s ease-in-out infinite`,
                  animationDelay: `${i * 0.3}s`
                }}
              >
                <div
                  className="absolute w-4 h-4 rounded-full bg-gray-300 transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    animation: `dotKeys 2s ease-in-out infinite`,
                    animationDelay: `${i * 0.3}s`
                  }}
                ></div>
                <div
                  className="absolute w-5 h-5 rounded-full transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    animation: `outlineKeys 2s ease-in-out infinite`,
                    animationDelay: `${(i + 3) * 0.3}s`
                  }}
                ></div>
              </div>
            ))}
          </div>
        )}

        {/* Wave variant with Uiverse styling */}
        {variant === "wave" && (
          <div className="flex justify-center items-center">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="relative flex items-center justify-center w-5 h-5 border-2 border-violet-400 rounded-full mx-2.5 bg-transparent"
                style={{
                  animation: `circleKeys 2s ease-in-out infinite`,
                  animationDelay: `${i * 0.2}s`
                }}
              >
                <div
                  className="absolute w-4 h-4 rounded-full bg-violet-400 transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    animation: `dotKeys 2s ease-in-out infinite`,
                    animationDelay: `${i * 0.2}s`
                  }}
                ></div>
                <div
                  className="absolute w-5 h-5 rounded-full transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    animation: `outlineKeysViolet 2s ease-in-out infinite`,
                    animationDelay: `${(i + 2) * 0.3}s`
                  }}
                ></div>
              </div>
            ))}
          </div>
        )}

        {/* Helix variant with Uiverse styling */}
        {variant === "helix" && (
          <div className="flex justify-center items-center">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="relative flex items-center justify-center w-5 h-5 border-2 border-purple-400 rounded-full mx-1.5 bg-transparent"
                style={{
                  animation: `circleKeys 2s ease-in-out infinite`,
                  animationDelay: `${i * 0.25}s`
                }}
              >
                <div
                  className="absolute w-4 h-4 rounded-full bg-purple-400 transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    animation: `dotKeys 2s ease-in-out infinite`,
                    animationDelay: `${i * 0.25}s`
                  }}
                ></div>
                <div
                  className="absolute w-5 h-5 rounded-full transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    animation: `outlineKeysPurple 2s ease-in-out infinite`,
                    animationDelay: `${(i + 4) * 0.25}s`
                  }}
                ></div>
              </div>
            ))}
          </div>
        )}

        {/* Quantum variant with Uiverse styling */}
        {variant === "quantum" && (
          <div className="flex justify-center items-center">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="relative flex items-center justify-center w-4 h-4 border-2 border-cyan-400 rounded-full mx-1 bg-transparent"
                style={{
                  animation: `circleKeys 1.8s ease-in-out infinite`,
                  animationDelay: `${i * 0.15}s`
                }}
              >
                <div
                  className="absolute w-3 h-3 rounded-full bg-cyan-400 transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    animation: `dotKeys 1.8s ease-in-out infinite`,
                    animationDelay: `${i * 0.15}s`
                  }}
                ></div>
                <div
                  className="absolute w-4 h-4 rounded-full transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    animation: `outlineKeysCyan 1.8s ease-in-out infinite`,
                    animationDelay: `${(i + 3) * 0.2}s`
                  }}
                ></div>
              </div>
            ))}
          </div>
        )}

        {/* Loading message */}
        {showMessage && (
          <div className="text-white font-medium text-lg">
            {message}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes circleKeys {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.5);
            opacity: 0.5;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes dotKeys {
          0% {
            transform: scale(1) translate(-50%, -50%);
          }
          50% {
            transform: scale(0) translate(-50%, -50%);
          }
          100% {
            transform: scale(1) translate(-50%, -50%);
          }
        }

        @keyframes outlineKeys {
          0% {
            transform: scale(0) translate(-50%, -50%);
            outline: solid 20px rgb(209, 213, 219);
            outline-offset: 0;
            opacity: 1;
          }
          100% {
            transform: scale(1) translate(-50%, -50%);
            outline: solid 0 transparent;
            outline-offset: 20px;
            opacity: 0;
          }
        }

        @keyframes outlineKeysViolet {
          0% {
            transform: scale(0) translate(-50%, -50%);
            outline: solid 20px rgb(167, 139, 250);
            outline-offset: 0;
            opacity: 1;
          }
          100% {
            transform: scale(1) translate(-50%, -50%);
            outline: solid 0 transparent;
            outline-offset: 20px;
            opacity: 0;
          }
        }

        @keyframes outlineKeysPurple {
          0% {
            transform: scale(0) translate(-50%, -50%);
            outline: solid 20px rgb(196, 181, 253);
            outline-offset: 0;
            opacity: 1;
          }
          100% {
            transform: scale(1) translate(-50%, -50%);
            outline: solid 0 transparent;
            outline-offset: 20px;
            opacity: 0;
          }
        }

        @keyframes outlineKeysCyan {
          0% {
            transform: scale(0) translate(-50%, -50%);
            outline: solid 15px rgb(103, 232, 249);
            outline-offset: 0;
            opacity: 1;
          }
          100% {
            transform: scale(1) translate(-50%, -50%);
            outline: solid 0 transparent;
            outline-offset: 15px;
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}