"use client";

import React, { useState } from "react";
import Map from "@/components/Map";
import Filters from "@/components/Filters";

export default function ProfilePage({ params }) {
  const { id: profileId } = React.use(params);

  const [profile] = useState({
    id: profileId,
    username: "testuser",
    full_name: "Test User",
    neighbourhood_name: "Camden Town",
    created_at: "2024-01-15",
  });

  const [posts] = useState([
    {
      id: 1,
      username: "testuser",
      content: "need help moving furniture this weekend!",
      category: "Job",
      area: "Camden Town",
    },
    {
      id: 2,
      username: "testuser",
      content: "free books to give away!",
      category: "Lend",
      area: "Camden Town",
    },
    {
      id: 3,
      username: "testuser",
      content: "offering dog walking services",
      category: "Service",
      area: "Islington",
    },
    {
      id: 4,
      username: "testuser",
      content: "can someone pick up a package for me?",
      category: "Send",
      area: "Camden Town",
    },
  ]);

  const [filteredPosts, setFilteredPosts] = useState(posts);

  const handleFilterChange = (filters) => {
    let result = [...posts];

    // filter by category
    if (filters.category) {
      result = result.filter(
        (post) =>
          post.category?.toLowerCase() === filters.category.toLowerCase()
      );
    }

    // filter by area
    if (filters.area) {
      result = result.filter((post) =>
        post.area?.toLowerCase().includes(filters.area.toLowerCase())
      );
    }

    setFilteredPosts(result);
  };

  return (
    <div className="min-h-screen p-6 space-y-6 bg-green-50">
      {/* profile title */}
      <h1 className="text-3xl font-bold text-gray-800">
        Profile: {profile.full_name || profile.username}
      </h1>

      {/* filter section */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Filter Posts</h2>
        <Filters onFilterChange={handleFilterChange} />
      </div>

      {/* user posts section */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Posts</h2>

        {filteredPosts.map((post) => (
          <div key={post.id} className="border-b p-3">
            <p className="text-gray-800">{post.content}</p>
            <span className="text-sm text-gray-500">
              {post.category} · {post.area}
            </span>
          </div>
        ))}

        {filteredPosts.length === 0 && (
          <p className="text-gray-500">No posts found for this filter</p>
        )}
      </div>

      {/* map */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Map</h2>
        <Map />
      </div>
    </div>
  );
}