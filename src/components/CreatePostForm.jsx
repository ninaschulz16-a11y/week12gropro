"use client"
import React from 'react'
import { useState } from 'react';

function CreatePostForm() {
const [ title, setTitle ] = useState("");
const [ content, setContent ] = useState("");
const [ image, setImage ] = useState(null);
const [ isSubmitting, setIsSubmitting ] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  const res = await fetch("api/posts", {
    method: "POST",
    body: formData
  });

  if (!res.ok) {
    SERVER_PROPS_EXPORT_ERROR("Something wen")
  }
}

  return (
    <>
    <form>
      <div>
        <h3>Title</h3>
        <
      </div>
      </form>
    </>
  )
}

export default CreatePost;
