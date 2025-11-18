"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function PostsList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch posts from API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/posts");
        if (!res.ok) throw new Error("Failed to fetch posts");
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <p className="text-center py-8">Loading posts...</p>;
  }

  if (posts.length === 0) {
    return <p className="text-center py-8">No posts yet.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Latest Posts</h1>

      <div className="space-y-6">
        {posts.map((post) => (
          <Link
            key={post.id}
            href={`/posts/${post.id}`}
            className="block bg-white p-5 rounded-lg shadow hover:shadow-md transition"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden bg-orange-200">
                {post.avatar_url ? (
                  <Image
                    src={post.avatar_url}
                    alt={post.username}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-orange-600 font-bold">
                    {post.username?.charAt(0)}
                  </div>
                )}
              </div>

              <div>
                <p className="font-semibold text-gray-800">{post.username}</p>
                <p className="text-sm text-gray-500">
                  {new Date(post.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>

            <p className="text-gray-800 line-clamp-3 whitespace-pre-wrap">
              {post.content}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}