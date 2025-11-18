import { auth } from "@clerk/nextjs/server";
import { db } from "@/utils/db";
import CommentSection from "@/components/CommentSection";
import Link from "next/link";
import Image from "next/image";

export default async function PostDetail({ params }) {

    const resolvedParams = await params;
    console.log("params.id:", resolvedParams);

    const { userId } = auth();
    const postId = resolvedParams.id;

    // get post data
    const postResult = await db.query(
        `SELECT 
        posts.*,
        profiles.username,
        profiles.avatar_url,
        profiles.id as author_profile_id
        FROM posts 
        LEFT JOIN profiles ON posts.author_id = profiles.id 
        WHERE posts.id = $1`,
        [postId]
    );

    if (postResult.rows.length === 0) {
        return (
        <div className="flex min-h-screen items-center justify-center bg-green-50">
            <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800">post not found</h1>
            <Link href="/" className="text-orange-600 hover:underline mt-4 inline-block">
                go back home
            </Link>
            </div>
        </div>
        );
    }

    const post = postResult.rows[0];

    // get comments
    const commentsResult = await db.query(
        `SELECT 
        comments1.*,
        profiles.username,
        profiles.avatar_url,
        profiles.id as author_id
        FROM comments1 
        JOIN profiles ON comments1.author_id = profiles.id 
        WHERE comments1.post_id = $1 
        ORDER BY comments1.created_at DESC`,
        [postId]
    );

    const comments = commentsResult.rows;

    // get current user profile for comment form
    let currentUserProfile = null;
    
    if (userId) {
        const userResult = await db.query(
        "SELECT id, username, avatar_url FROM profiles WHERE clerk_user_id = $1",
        [userId]
        );
        
        if (userResult.rows.length > 0) {
        currentUserProfile = userResult.rows[0];
        }
    }

    return (
        <div className="min-h-screen bg-green-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
            
            {/* post card */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
            
            {/* post author */}
            <Link href={`/profile/${post.author_profile_id}`}>
                <div className="flex items-center gap-3 mb-6 cursor-pointer hover:opacity-80">
                
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    {post.avatar_url ? (
                    <Image
                        src={post.avatar_url}
                        alt={post.username}
                        fill
                        className="object-cover"
                    />
                    ) : (
                    <div className="w-full h-full bg-orange-200 flex items-center justify-center text-orange-600 text-lg">
                        {post.username?.charAt(0).toUpperCase()}
                    </div>
                    )}
                </div>
                
                <div>
                    <p className="font-semibold text-gray-800">{post.username}</p>
                    <p className="text-sm text-gray-500">
                    {new Date(post.created_at).toLocaleDateString()} at{" "}
                    {new Date(post.created_at).toLocaleTimeString()}
                    </p>
                </div>
                </div>
            </Link>

            {/* post content */}
            <div className="mb-6">
                <p className="text-gray-800 text-lg whitespace-pre-wrap">
                {post.content}
                </p>
            </div>

            {/* post location */}
            {post.latitude && post.longitude && (
                <div className="flex items-center gap-2 text-gray-600">
                <span>📍</span>
                <p className="text-sm">
                    {post.latitude.toFixed(4)}, {post.longitude.toFixed(4)}
                </p>
                </div>
            )}
            </div>

            {/* comments section */}
            <CommentSection
            postId={postId}
            initialComments={comments}
            currentUserId={userId}
            currentUserProfile={currentUserProfile}
            />
        </div>
        </div>
    );
}