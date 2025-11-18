"use client";
// client component because we use state and interactive UI

import React, { useState } from "react";
import Map from "@/components/Map";
import Filters from "@/components/Filters";

export default function ProfilePage({ params }) {
  // unwrap dynamic params (Next.js 16 requirement)
  const { id: profileId } = React.use(params);

  // temporary static profile data - to be replaced with DB values later
  const [profile] = useState({
    id: profileId,
    username: "testuser",
    full_name: "Test User",
    neighbourhood_name: "Camden Town",
    created_at: "2024-01-15",
  });

  // mock posts for demo - will be replaced with DB values later
  const [posts] = useState([
    {
      id: 1,
      username: "testuser",
      content: "need help moving!",
      category: "Job",
    },
    { id: 2, username: "testuser", content: "free books!", category: "Lend" },
  ]);

  // list of filtered posts we show on the page
  const [filteredPosts, setFilteredPosts] = useState(posts);

  // filter logic (runs when Filters component applies filters)
  const handleFilterChange = (filters) => {
    let result = [...posts];

    if (filters.category) {
      result = result.filter(
        (post) =>
          post.category?.toLowerCase() === filters.category.toLowerCase()
      );
    }

    // set filtered results to UI
    setFilteredPosts(result);
  };

  return (
    <div className="min-h-screen p-6 space-y-6 bg-green-50">
      {/* profile title */}
      <h1 className="text-3xl font-bold">
        Profile: {profile.full_name || profile.username}
      </h1>

      {/* filter section */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Filter Posts</h2>
        <Filters onFilterChange={handleFilterChange} />
      </div>

      {/* user posts section */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Posts</h2>

        {filteredPosts.map((post) => (
          <p key={post.id} className="border-b p-2">
            {post.content}
          </p>
        ))}

        {filteredPosts.length === 0 && (
          <p className="text-gray-500">No posts found for this category</p>
        )}
      </div>

      {/* map */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Map</h2>
        <Map />
      </div>
    </div>
  );
}
