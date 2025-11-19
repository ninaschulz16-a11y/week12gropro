"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/utils/supabase";
import Map from "@/components/Map";
import Filters from "@/components/Filters";

export default function ProfilePage() {
  const { user, isLoaded } = useUser();
  const params = useParams();
  const profileId = params.id;
  
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    async function fetchData() {
      try {
        // set profile from your clerk user data
        setProfile({
          id: profileId,
          username: user?.username || user?.firstName || "user",
          full_name: user?.fullName || user?.firstName || "User",
          avatar_url: user?.imageUrl || null,
          neighbourhood_name: "Your Neighbourhood",
        });

        // get all posts from database
        const { data, error } = await supabase
          .from("posts")
          .select(`
            id,
            content,
            created_at,
            category,
            profiles (
              username
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

    fetchData();
    
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
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Posts ({filteredPosts.length})
        </h2>

        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <Link href={`/posts/${post.id}`} key={post.id}>
              <div className="border-b p-4 hover:bg-gray-50 cursor-pointer transition">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 min-w-8 min-h-8 rounded-full bg-[#3E513E] flex items-center justify-center text-white text-sm">
                    {post.username?.charAt(0).toUpperCase()}
                  </div>
                  <p className="font-semibold text-gray-800">{post.username}</p>
                </div>
                <p className="text-gray-800">{post.content}</p>
                <p className="text-sm text-gray-500 mt-2">
                  {post.category} · {new Date(post.created_at).toLocaleDateString()}
                </p>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-gray-500">No posts found</p>
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