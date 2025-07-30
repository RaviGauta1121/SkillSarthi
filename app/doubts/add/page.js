"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useUser } from '@auth0/nextjs-auth0/client'; // Ensure Auth0 is imported

export default function AddTopicForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [image, setImage] = useState(null);
  const router = useRouter();
  const { user } = useUser(); // Use Auth0's useUser hook to get the authenticated user

  const onSubmit = async (data) => {
    try {
      let imageUrl = "";
      if (image) {
        imageUrl = await uploadToCloudinary(image);
      }

      const res = await fetch("http://localhost:3000/api/doubts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: data.title,
          description: data.description,
          imageUrl,
          author: user?.email, // Auth0 user's email
        }),
      });

      if (res.ok) {
        router.push("/");
        reset();
      } else {
        throw new Error("Failed to create topic");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 mt-16">
      <div className="flex flex-col space-y-2 w-full">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          placeholder="Catchy Title"
          type="text"
          {...register("title", { required: "Title is required" })}
        />
        {errors.title && <span className="text-xs text-red-500">{errors.title.message}</span>}
      </div>

      <div className="flex flex-col space-y-2 w-full">
        <label htmlFor="description">Description</label>
        <input
          id="description"
          placeholder="Description ..."
          type="text"
          {...register("description", { required: "Description is required" })}
        />
        {errors.description && <span className="text-xs text-red-500">{errors.description.message}</span>}
      </div>

      {/* Uncomment if you have file upload */}
      {/* <div className="flex flex-col space-y-2 w-full">
        <label htmlFor="image">Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
      </div> */}

      <button
        className="bg-gradient-to-br from-black to-neutral-600 block text-white rounded-md h-10 font-medium shadow-md"
        type="submit"
      >
        Create
      </button>
    </form>
  );
}
