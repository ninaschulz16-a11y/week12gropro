"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/utils/supabase";
import Map from "./Map";
import Filters from "./Filters";

export default function PostsList() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // fetch posts from database
  useEffect(() => {
    async function fetchPosts() {
      try {
        const { data, error } = await supabase
          .from("posts")
          .select(`
            id,
            content,
            created_at,
            category,
            profiles (
              username,
              avatar_url
            )
          `)
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching posts:", error);
          setPosts([]);
          setFilteredPosts([]);
        } else {
          // format the posts
          const formattedPosts = data.map((post) => ({
            id: post.id,
            content: post.content,
            created_at: post.created_at,
            category: post.category || "General",
            username: post.profiles?.username || "user",
            avatar_url: post.profiles?.avatar_url || null,
            area: "London",
          }));
          
          setPosts(formattedPosts);
          setFilteredPosts(formattedPosts);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  // filter posts when user applies filters
  const handleFilterChange = (filters) => {
    let result = [...posts];

    // filter by category
    if (filters.category) {
      result = result.filter((post) => {
        return post.category?.toLowerCase() === filters.category.toLowerCase();
      });
    }

    // filter by area
    if (filters.area) {
      result = result.filter((post) => {
        return post.area?.toLowerCase().includes(filters.area.toLowerCase());
      });
    }

    setFilteredPosts(result);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F5DC] flex items-center justify-center">
        <p className="text-gray-600">Loading posts...</p>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="min-h-screen bg-[#F5F5DC] flex items-center justify-center">
        <p className="text-gray-600">No posts yet.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4 bg-[#F5F5DC]">
      <div className="max-w-3xl mx-auto">
        
        <h1 className="text-2xl font-bold mb-8 text-gray-800">All Posts</h1>
        
        <Map />

        {/* filter section */}
        <div className="mt-8 bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Filter Posts</h2>
          <Filters onFilterChange={handleFilterChange} />
        </div>

        <p className="mt-6 text-gray-600">{filteredPosts.length} posts found</p>

        <div className="space-y-4 mt-4">
          {filteredPosts.map((post) => (
            <Link
              key={post.id}
              href={`/posts/${post.id}`}
              className="block bg-white p-5 rounded-xl shadow hover:shadow-md transition"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 min-w-10 min-h-10 rounded-full bg-[#3E513E] flex items-center justify-center text-white font-bold">
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

              <p className="text-gray-800">{post.content}</p>
            </Link>
          ))}

          {filteredPosts.length === 0 && (
            <p className="text-gray-500 text-center py-4">No posts found for this filter</p>
          )}
        </div>
      </div>
    </div>
  );
}