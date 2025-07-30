"use client";
import React from "react";
import { BackgroundGradient } from "@/components/Cards/GradientCard";
import Image from "next/image";

export default function BackgroundGradientDemo() {
  return (
    <div className="w-screen flex justify-center bg-gray-950 h-screen pt-16">
      <div>
        <BackgroundGradient className="rounded-[22px] max-w-xs p-4 sm:p-10 bg-zinc-900 text-white">
          <Image
            src="/images/img.png"
            alt="jordans"
            height="400"
            width="400"
            className="object-contain"
          />
          <p className="font-extrabold sm:text-xl mt-4 mb-2 bg-clip-text text-transparent  bg-gradient-to-r from-cyan-500 to-blue-500">
            One Time Mentorship
          </p>

          <ul className="text-sm text-neutral-400">
            <li>Chat session</li>
            <li>Audio/video session</li>
            <li>Resume review session</li>
          </ul>

          <button className="rounded-full pl-4 pr-1 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-xs font-bold dark:bg-zinc-800">
            <span>Basic</span>
            <span className="bg-zinc-700 rounded-full text-[0.6rem] px-2 py-0 text-white">
              &#8377; 255
            </span>
          </button>
        </BackgroundGradient>
      </div>
      <div className="mx-2">
        <BackgroundGradient className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-zinc-900">
          <Image
            src="/images/img.png"
            alt="jordans"
            height="400"
            width="400"
            className="object-contain"
          />
          <p className="font-extrabold sm:text-xl mt-4 mb-2 bg-clip-text text-transparent  bg-gradient-to-r from-cyan-500 to-blue-500">
            Full Time Mentorship
          </p>

          <ul className="text-sm text-neutral-400">
            <li>Unlimited Chat with Mentor</li>
            <li>Multiple Audio/Video Session</li>
            <li>Multiple Resume Review Session</li>
            <li>Multiple Mock Interviews Session</li>
            <li>Job Referal From Mentor</li>
          </ul>
          <button className="rounded-full pl-4 pr-1 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-xs font-bold dark:bg-zinc-800">
            <span>EMI Available</span>
            <span className="bg-zinc-700 rounded-full text-[0.6rem] px-2 py-0 text-white">
              &#8377; 700
            </span>
          </button>
        </BackgroundGradient>
      </div>
      <div>
        <BackgroundGradient className="rounded-[22px] max-w-xs h-2/3 p-4 sm:p-10 bg-zinc-900">
          <Image
            src="/images/img.png"
            alt="jordans"
            height="400"
            width="400"
            className="object-contain"
          />
          <p className="font-extrabold sm:text-xl mt-4 mb-2 bg-clip-text text-transparent  bg-gradient-to-r from-cyan-500 to-blue-500">
            Bootcamps
          </p>

          <ul className="text-sm text-neutral-400">
            <li>Multiple Live Interactive Sessions</li>
            <li>Multiple Ask Me Anything Sessions.</li>
            <li>Strong Peer Network with Mentor</li>
            <li>Certificate of Completion</li>
            <li>Exclusive Preparation Resources</li>
          </ul>
          <button className="rounded-full pl-4 pr-1 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-xs font-bold dark:bg-zinc-800">
            <span>Newly Added</span>
            <span className="bg-zinc-700 rounded-full text-[0.6rem] px-2 py-0 text-white">
              &#8377; 1000
            </span>
          </button>
        </BackgroundGradient>
      </div>
    </div>
  );
}
