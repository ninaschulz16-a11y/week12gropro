"use client";

import { supabase } from "@/utils/supabase";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";


export default function CreatePostForm() {
  const { user } = useUser(); // get logged-in user
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

    if (!user) {
      setMessage("You must be logged in to create a post.");
      setIsSubmitting(false);
      return;
    }

     try {
    // Find the profile ID corresponding to the Clerk user ID
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("id")
      .eq("clerk_id", user.id)
      .single();

    if (profileError || !profile) {
      throw new Error("Profile not found for this user.");
    }

    const author_id = profile.id; // Clerk user ID (temporary for demo)

    let image_url = null;

      if (image) {
        const fileExt = image.name.split(".").pop();
        const fileName = `${Math.random()
          .toString(36)
          .substring(2)}-${Date.now()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("post-images")
          .upload(filePath, image);

        if (uploadError) {
          console.error("Upload error:", uploadError);
          setMessage("Failed to upload image: " + uploadError.message);
          setIsSubmitting(false);
          return;
        }

        const { data: urlData } = supabase.storage
          .from("post-images")
          .getPublicUrl(filePath);

        image_url = urlData.publicUrl;
      }

      const postData = {
        author_id,
        title,
        content,
        category,
        tags,
        image_url,
      };

      const res = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Something went wrong");

      setMessage("Post created successfully!");

      setTitle("");
      setContent("");
      setCategory("");
      setTags("");
      setImage(null);
    } catch (err) {
      console.error(err);
      setMessage(err.message);
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
          <label className="font-medium">Title</label>
          <input
            type="text"
            placeholder="Enter the title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-[#EFEFEF] rounded-full px-3 py-2"
          />
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <label className="font-medium">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-[#EFEFEF] rounded-2xl px-3 py-2"
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
          <label className="font-medium">Tags (comma-separated)</label>
          <input
            type="text"
            placeholder="e.g. Jobs, Tools, Free Stuff"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="bg-[#EFEFEF] rounded-2xl px-3 py-2"
          />
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <label className="font-medium">Description</label>
          <textarea
            placeholder="Write your content..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="bg-[#EFEFEF] rounded-2xl px-3 py-2 h-32"
          />
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <label className="font-medium">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="bg-[#EFEFEF] rounded-2xl px-3 py-2"
          />
        </div>

        <div className="flex items-center justify-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#DFEBC5] mt-12 w-32 py-2 rounded-full hover:bg-[#3E513E] hover:text-white disabled:opacity-60"
          >
            {isSubmitting ? "Submitting..." : "Create Post"}
          </button>
        </div>

        {message && (
          <p
            className={`mt-2 text-center text-sm ${
              message.includes("success") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
