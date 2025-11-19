"use client";

import { supabase } from "@/utils/supabase";
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    // check if user is logged in
    if (!user) {
      setMessage("You must be logged in to create a post.");
      setIsSubmitting(false);
      return;
    }

    // check if content is filled in
    if (!content.trim()) {
      setMessage("Please write something in the description.");
      setIsSubmitting(false);
      return;
    }

    try {
      // find the profile for this user
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("id")
        .eq("clerk_user_id", user.id)
        .single();

      if (profileError || !profile) {
        setMessage("Profile not found. Please try signing out and back in.");
        setIsSubmitting(false);
        return;
      }

      // upload image if there is one
      let imageUrl = null;

      if (image) {
        const fileExtension = image.name.split(".").pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExtension}`;

        const { error: uploadError } = await supabase.storage
          .from("post-images")
          .upload(fileName, image);

        if (uploadError) {
          setMessage("Failed to upload image: " + uploadError.message);
          setIsSubmitting(false);
          return;
        }

        const { data: urlData } = supabase.storage
          .from("post-images")
          .getPublicUrl(fileName);

        imageUrl = urlData.publicUrl;
      }

      // create the post
      const { error: postError } = await supabase
        .from("posts")
        .insert([
          {
            author_id: profile.id,
            title: title || null,
            content: content,
            category: category || null,
            tags: tags || null,
            image_url: imageUrl,
            latitude: 51.5074,
            longitude: -0.1278,
          }
        ]);

      if (postError) {
        setMessage("Failed to create post: " + postError.message);
        setIsSubmitting(false);
        return;
      }

      // success - clear the form
      setMessage("Post created successfully!");
      setTitle("");
      setContent("");
      setCategory("");
      setTags("");
      setImage(null);

    } catch (error) {
      console.error("Error creating post:", error);
      setMessage("Something went wrong: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
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
            onChange={(event) => setTitle(event.target.value)}
            className="bg-gray-100 text-gray-800 rounded-full px-4 py-2 border border-gray-300 placeholder-gray-500"
          />
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <label className="font-medium text-gray-800">Category</label>
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
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
            onChange={(event) => setTags(event.target.value)}
            className="bg-gray-100 text-gray-800 rounded-2xl px-4 py-2 border border-gray-300 placeholder-gray-500"
          />
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <label className="font-medium text-gray-800">Description</label>
          <textarea
            placeholder="Write your content..."
            value={content}
            onChange={(event) => setContent(event.target.value)}
            className="bg-gray-100 text-gray-800 rounded-2xl px-4 py-2 h-32 border border-gray-300 placeholder-gray-500"
          />
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <label className="font-medium text-gray-800">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(event) => setImage(event.target.files[0])}
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