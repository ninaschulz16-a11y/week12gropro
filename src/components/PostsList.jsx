import Link from "next/link";
import { db } from "@/utils/db";
import Image from "next/image";
import Map from "./Map";

export default async function PostsList() {
  const result = await db.query(
    `SELECT 
      posts.id,
      posts.content,
      posts.created_at,
      posts.category,
      profiles.username,
      profiles.avatar_url
    FROM posts
    JOIN profiles ON posts.author_id = profiles.id
    ORDER BY posts.created_at DESC`
  );

  const posts = result.rows;

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

        <p className="mt-8 text-gray-600">{posts.length} posts nearby</p>

        <div className="space-y-4 mt-4">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/posts/${post.id}`}
              className="block bg-white p-5 rounded-xl shadow hover:shadow-md transition"
            >
              <div className="flex items-center gap-3 mb-3">
                {post.avatar_url ? (
                  <div className="relative w-10 h-10 rounded-full overflow-hidden">
                    <Image
                      src={post.avatar_url}
                      alt={post.username}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-[#3E513E] flex items-center justify-center text-white font-bold">
                    {post.username?.charAt(0).toUpperCase()}
                  </div>
                )}

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
        </div>
      </div>
    </div>
  );
}