// app/doubts/add/page.js
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { Meteors } from "@/components/Cards/MeteorCard";

export default function AddDoubtPage() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  // Redirect if not authenticated
  if (!session) {
    router.push('/auth/signin');
    return null;
  }

  const uploadToCloudinary = async (file) => {
    // This is a placeholder for Cloudinary upload
    // You'll need to implement your Cloudinary upload logic here
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'your_upload_preset');
    
    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/your_cloud_name/image/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error('Upload failed:', error);
      return '';
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      let imageUrl = "";
      if (image) {
        imageUrl = await uploadToCloudinary(image);
      }

      const res = await fetch("/api/doubts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: data.title,
          description: data.description,
          subject: data.subject,
          priority: data.priority,
          tags: data.tags ? data.tags.split(',').map(tag => tag.trim()) : [],
          imageUrl,
        }),
      });

      if (res.ok) {
        const result = await res.json();
        router.push(`/doubts/${result.doubt._id}`);
        reset();
      } else {
        const error = await res.json();
        throw new Error(error.error || "Failed to create doubt");
      }
    } catch (error) {
      console.error(error);
      alert(error.message || "Failed to create doubt");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 pt-20 pb-10">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="relative">
          <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] rounded-full blur-3xl opacity-30" />
          <div className="relative shadow-xl bg-gray-900 border border-gray-800 px-8 py-10 rounded-2xl">
            <div className="flex items-center mb-8">
              <div className="h-8 w-8 rounded-full border border-gray-500 flex items-center justify-center mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-4 w-4 text-gray-300"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                  />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-white">Ask Your Doubt</h1>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <label htmlFor="title" className="block text-sm font-medium text-gray-300">
                  Title *
                </label>
                <input
                  id="title"
                  type="text"
                  placeholder="What's your doubt about?"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  {...register("title", { 
                    required: "Title is required",
                    minLength: { value: 5, message: "Title must be at least 5 characters" }
                  })}
                />
                {errors.title && (
                  <span className="text-sm text-red-400">{errors.title.message}</span>
                )}
              </div>

              {/* Subject */}
              <div className="space-y-2">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300">
                  Subject
                </label>
                <select
                  id="subject"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  {...register("subject")}
                >
                  <option value="Other">Other</option>
                  <option value="Math">Mathematics</option>
                  <option value="Science">Science</option>
                  <option value="English">English</option>
                  <option value="History">History</option>
                  <option value="Geography">Geography</option>
                  <option value="Computer Science">Computer Science</option>
                </select>
              </div>

              {/* Priority */}
              <div className="space-y-2">
                <label htmlFor="priority" className="block text-sm font-medium text-gray-300">
                  Priority
                </label>
                <select
                  id="priority"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  {...register("priority")}
                >
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                  <option value="High">High</option>
                  <option value="Urgent">Urgent</option>
                </select>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label htmlFor="description" className="block text-sm font-medium text-gray-300">
                  Description *
                </label>
                <textarea
                  id="description"
                  rows="5"
                  placeholder="Explain your doubt in detail..."
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  {...register("description", { 
                    required: "Description is required",
                    minLength: { value: 10, message: "Description must be at least 10 characters" }
                  })}
                />
                {errors.description && (
                  <span className="text-sm text-red-400">{errors.description.message}</span>
                )}
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <label htmlFor="tags" className="block text-sm font-medium text-gray-300">
                  Tags (optional)
                </label>
                <input
                  id="tags"
                  type="text"
                  placeholder="algebra, equations, homework (comma separated)"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  {...register("tags")}
                />
                <p className="text-xs text-gray-400">Separate tags with commas</p>
              </div>

              {/* Image Upload */}
              <div className="space-y-2">
                <label htmlFor="image" className="block text-sm font-medium text-gray-300">
                  Image (optional)
                </label>
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                />
                {imagePreview && (
                  <div className="mt-2">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="max-w-xs rounded-lg border border-gray-600"
                    />
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-teal-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Creating..." : "Post Doubt"}
              </button>
            </form>

            <Meteors number={20} />
          </div>
        </div>
      </div>
    </div>
  );
}