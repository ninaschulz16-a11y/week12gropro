"use client";

import { useUser } from "@clerk/nextjs";
import { useState } from "react";

export default function CreatePostForm() {
  const { user } = useUser();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    // check if user is logged in
    if (!user) {
      setMessage("You must be logged in to create a post.");
      setIsSubmitting(false);
      return;
    }

    // demo mode - show success message
    setMessage("Post created successfully! (Demo mode)");
    setIsSubmitting(false);
    
    // clear form
    setTitle("");
    setContent("");
    setCategory("");
    setTags("");
    setImage(null);
  };

  return (
    <div className="mb-10">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-white p-6 rounded-xl shadow"
      >
        <div className="flex flex-col gap-2">
          <label className="font-medium text-gray-800">Title</label>
          <input
            type="text"
            placeholder="Enter the title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-gray-100 text-gray-800 rounded-full px-4 py-2 border border-gray-300 placeholder-gray-500"
          />
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <label className="font-medium text-gray-800">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-gray-100 text-gray-800 rounded-2xl px-4 py-2 border border-gray-300"
          >
            <option value="">Select category</option>
            <option value="Lend">Lend</option>
            <option value="Send">Send</option>
            <option value="Job">Job</option>
            <option value="Ask">Ask</option>
            <option value="Service">Service</option>
          </select>
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <label className="font-medium text-gray-800">Tags (comma-separated)</label>
          <input
            type="text"
            placeholder="e.g. Jobs, Tools, Free Stuff"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="bg-gray-100 text-gray-800 rounded-2xl px-4 py-2 border border-gray-300 placeholder-gray-500"
          />
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <label className="font-medium text-gray-800">Description</label>
          <textarea
            placeholder="Write your content..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="bg-gray-100 text-gray-800 rounded-2xl px-4 py-2 h-32 border border-gray-300 placeholder-gray-500"
          />
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <label className="font-medium text-gray-800">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="bg-gray-100 text-gray-800 rounded-2xl px-4 py-2 border border-gray-300"
          />
        </div>

        <div className="flex items-center justify-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#3E513E] text-white mt-8 px-8 py-2 rounded-full hover:bg-[#2d3d2d] disabled:opacity-60 transition"
          >
            {isSubmitting ? "Submitting..." : "Create Post"}
          </button>
        </div>

        {message && (
          <p className={`mt-2 text-center text-sm ${
            message.includes("successfully") ? "text-green-600" : "text-red-600"
          }`}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
}