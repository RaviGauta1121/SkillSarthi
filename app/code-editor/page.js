import EditorComponent from "@/components/Code-Editor/EditorComponent";

import React from "react";

export default function Home() {
  return (
    <div className="dark:bg-gray-950 bg-slate-300 p-8 mt-14">
      <EditorComponent />
    </div>
  );
}