"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Map from "@/components/Map";
import Filters from "@/components/Filters";
import { useUser } from "@clerk/nextjs";

export default function ProfilePage({ params }) {
  // get profile id from url
  const { id: profileId } = React.use(params);
  
  // get logged in user from clerk
  const { user, isLoaded } = useUser();
  
  // state for storing data
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // load data when page opens
  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    // set profile from clerk user data
    setProfile({
      id: profileId,
      username: user?.username || user?.firstName || "user",
      full_name: user?.fullName || user?.firstName || "User",
      avatar_url: user?.imageUrl || null,
      neighbourhood_name: "Your Neighbourhood",
      created_at: new Date().toISOString(),
    });
    
    // set example posts
    const examplePosts = [
      {
        id: "post-1",
        content: "need help moving furniture this weekend!",
        category: "Job",
        area: "Camden Town",
      },
      {
        id: "post-2",
        content: "looking for a part-time job nearby",
        category: "Job",
        area: "Camden Town",
      },
      {
        id: "post-3",
        content: "need help with dog walking while I'm at work",
        category: "Service",
        area: "Islington",
      },
      {
        id: "post-4",
        content: "free books to give away!",
        category: "Lend",
        area: "Camden Town",
      },
    ];
    
    setPosts(examplePosts);
    setFilteredPosts(examplePosts);
    setLoading(false);
    
  }, [profileId, user, isLoaded]);

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

  // show loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F5DC]">
        <p className="text-gray-600">loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 space-y-6 bg-[#F5F5DC]">
      
      {/* profile header */}
      <div className="bg-white p-8 rounded-lg shadow">
        <div className="flex items-center gap-4">
          
          {/* profile image */}
          {profile?.avatar_url ? (
            <img 
              src={profile.avatar_url} 
              alt={profile.username}
              className="w-20 h-20 rounded-full object-cover"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-[#3E513E] flex items-center justify-center text-white text-2xl">
              {profile?.username?.charAt(0).toUpperCase()}
            </div>
          )}
          
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              {profile?.full_name || profile?.username}
            </h1>
            <p className="text-gray-600">@{profile?.username}</p>
            <p className="text-sm text-gray-500 mt-1">
              📍 {profile?.neighbourhood_name}
            </p>
          </div>
        </div>
      </div>

      {/* filter section */}
      <div className="bg-white p-8 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Filter Posts</h2>
        <Filters onFilterChange={handleFilterChange} />
      </div>

      {/* posts section */}
      <div className="bg-white p-8 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Posts</h2>

        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <Link href={`/posts/${post.id}`} key={post.id}>
              <div className="border-b p-3 hover:bg-gray-50 cursor-pointer transition">
                <p className="text-gray-800">{post.content}</p>
                <span className="text-sm text-gray-500">
                  {post.category} · {post.area}
                </span>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-500">No posts found for this filter</p>
        )}
      </div>

      {/* map section */}
      <div className="bg-white p-8 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Map</h2>
        <Map />
      </div>
    </div>
  );
}