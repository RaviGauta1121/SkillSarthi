"use client";
import React, { useState } from "react";
import { FileUpload } from "@/components/Upload/input-upload";
import { useForm } from "react-hook-form";

export function FileUploadDemo() {
  const [files, setFiles] = useState([]);
  const handleFileUpload = (files) => {
    setFiles(files);
    console.log(files);
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  return (
    <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-black border-neutral-800 rounded-lg">
      <FileUpload onChange={handleFileUpload} />
    </div>
  );
}
