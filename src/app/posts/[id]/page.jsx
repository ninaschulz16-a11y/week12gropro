"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import Link from "next/link";
import CommentSection from "@/components/CommentSection";

export default function PostPage() {
  const { user } = useUser();
  const params = useParams();
  const postId = params.id;
  
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!postId) {
      return;
    }

    async function fetchPost() {
      try {
        // fetch post from database
        const response = await fetch(`/api/posts/${postId}`);
        
        if (response.ok) {
          const data = await response.json();
          setPost(data.post);
          setComments(data.comments || []);
        } else {
          setPost(null);
        }
      } catch (error) {
        console.error("error fetching post:", error);
        setPost(null);
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [postId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F5DC]">
        <p className="text-gray-600">loading post...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F5DC]">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">post not found</h1>
          <Link href="/posts" className="text-[#3E513E] hover:underline mt-4 inline-block">
            back to posts
          </Link>
        </div>
      </div>
    );
  }

  const currentUserProfile = user ? {
    id: user.id,
    username: user.username || user.firstName || "you",
    avatar_url: user.imageUrl || null
  } : null;

  return (
    <div className="min-h-screen py-8 px-4 bg-[#F5F5DC]">
      <div className="max-w-4xl mx-auto">
        
        <div className="bg-white border rounded-xl shadow-lg p-8 mb-6">
          
          <Link href={`/profile/${post.author_profile_id || post.author_id}`}>
            <div className="flex items-center gap-3 mb-6 cursor-pointer hover:opacity-80">
              <div className="w-12 h-12 rounded-full bg-[#3E513E] flex items-center justify-center text-white text-lg">
                {post.username?.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-gray-800">{post.username}</p>
                <p className="text-sm text-gray-500">
                  {new Date(post.created_at).toLocaleDateString()}
                  {post.category && ` · ${post.category}`}
                </p>
              </div>
            </div>
          </Link>

          <p className="text-gray-800 text-lg mb-6">{post.content}</p>

        </div>

        <CommentSection
          postId={postId}
          initialComments={comments}
          currentUserId={user?.id || null}
          currentUserProfile={currentUserProfile}
        />
      </div>
    </div>
  );
}