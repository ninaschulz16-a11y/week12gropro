import { db } from "@/utils/db";

export async function GET(request, { params }) {
  try {
    const postId = params.id;

    // get the post with author info
    const postResult = await db.query(
      `SELECT 
        posts.id,
        posts.content,
        posts.created_at,
        posts.category,
        posts.author_id,
        profiles.username,
        profiles.avatar_url,
        profiles.id as author_profile_id
      FROM posts
      JOIN profiles ON posts.author_id = profiles.id
      WHERE posts.id = $1`,
      [postId]
    );

    if (postResult.rows.length === 0) {
      return new Response(
        JSON.stringify({ error: "post not found" }), 
        { status: 404 }
      );
    }

    const post = postResult.rows[0];

    // get comments for this post
    const commentsResult = await db.query(
      `SELECT 
        comments.id,
        comments.content,
        comments.created_at,
        comments.author_id,
        profiles.username,
        profiles.avatar_url
      FROM comments
      JOIN profiles ON comments.author_id = profiles.id
      WHERE comments.post_id = $1
      ORDER BY comments.created_at DESC`,
      [postId]
    );

    const comments = commentsResult.rows;

    return new Response(
      JSON.stringify({ post: post, comments: comments }), 
      { status: 200 }
    );

  } catch (error) {
    console.error("error fetching post:", error);
    return new Response(
      JSON.stringify({ error: error.message }), 
      { status: 500 }
    );
  }
}