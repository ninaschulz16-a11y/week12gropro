
import Link from "next/link";
import { db } from "@/utils/db";
import Image from "next/image";
import Map from "./Map";
import Filters from "./Filters";

export default async function PostsList() {
  const result = await db.query(
    `SELECT 
            posts.id,
            posts.content,
            posts.created_at,
            profiles.username,
            profiles.avatar_url
            FROM posts
            JOIN profiles ON posts.author_id = profiles.id
            ORDER BY posts.created_at DESC
        `
  );

  const posts = result.rows;

  if (posts.length === 0) {
    return <p className="text-center py-8">No posts yet.</p>;
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-8 text-gray-800">Latest Posts</h1>
        <Map />
        <div className="mt-12">
          <Filters />
        </div>

        <div className="space-y-6 mt-12">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/posts/${post.id}`}
              className="block bg-[#DFEBC5] p-5 rounded-xl shadow hover:shadow-md transition"
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
    </div>
  );
}
