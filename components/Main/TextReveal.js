"use client";
import React from "react";
import {
  TextRevealCard,
  TextRevealCardDescription,
  TextRevealCardTitle,
} from "@/components/Main/TextRevealProvider";

export default function TextRevealCardPreview() {
  return (
    <div className="flex items-center justify-center bg-[#0E0E10] h-[40rem] rounded-2xl w-full">
      <TextRevealCard
        text="You know the business"
        revealText="I know the chemistry "
      >
        <TextRevealCardTitle>
          Every Student Needs a Place to Focus
        </TextRevealCardTitle>
        <TextRevealCardDescription>
          A space where they can seek mentorship, clear doubts, and achieve
          their goals.
        </TextRevealCardDescription>
      </TextRevealCard>
    </div>
  );
}
