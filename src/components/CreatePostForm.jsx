"use client";
import React, { use } from "react";
import { useState } from "react";

function CreatePostForm() {
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

    // FORMDATA
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", category);
    formData.append("tags", tags);
    if (image) formData.append("image", image);

    try {
      const author_id = "73d18b16-dc77-4684-97ec-49fbcf87ece1";
      const postData = {
        author_id,
        title,
        content,
        category,
        tags,
        image_url: null,
      };

      const res = await fetch("api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Something went wrong");
      } else {
        setMessage("Post created successfully!");

        // RESET FORM
        setTitle("");
        setContent("");
        setCategory("");
        setTags("");
        setImage(null);
      }
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong!");
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
        {/* TITLE */}
        <div className="flex flex-col gap-2">
          <label className="font-medium">Title</label>
          <input
            type="text"
            placeholder="Enter the title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className=" bg-[#EFEFEF]  rounded-full px-3 py-2"
          />
        </div>

        {/* CATEGORY */}
        <div className="flex flex-col gap-2 mt-4">
          <label className="font-medium">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-[#EFEFEF]  rounded-2xl px-3 py-2"
          >
            <option value="">Select category</option>
            <option value="Lend">Lend</option>
            <option value="Send">Send</option>
            <option value="Job">Job</option>
            <option value="Ask">Ask</option>
            <option value="Service">Service</option>
          </select>
        </div>

        {/* TAGS */}
        <div className="flex flex-col gap-2 mt-4">
          <label className="font-medium">Tags (comma-seperated)</label>
          <input
            type="text"
            placeholder="eg. Jobs, Tools, Free Stuff, "
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="bg-[#EFEFEF]  rounded-2xl px-3 py-2"
          />
        </div>

        {/* DESCRIPTION */}
        <div className="flex flex-col gap-2 mt-4">
          <label className="font-medium">Description</label>
          <textarea
            placeholder="Write your content..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="bg-[#EFEFEF] rounded-2xl px-3 py-2 h-32"
          ></textarea>
        </div>

        {/* IMAGE UPLOAD */}
        <div className="flex flex-col gap-2 mt-4">
          <label className="font-medium">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className=" bg-[#EFEFEF] rounded-2xl px-3 py-2"
          />
        </div>

        {/* SUBMIT BUTTON */}
        <div className="flex items-center justify-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-[#DFEBC5] mt-12 w-32 py-2 rounded-full hover:bg-[#3E513E] hover:text-white disabled:opacity-60"
          >
            {isSubmitting ? "Submitting..." : "Create Post"}
          </button>
        </div>

        {/* MESSAGE */}
        {message && (
          <p
            className={`mt-2 text-center text-sm ${
              message.includes("successfully")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}

export default CreatePostForm;
