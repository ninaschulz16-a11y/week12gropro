import { auth } from "@clerk/nextjs/server";
import { db } from "@/utils/db";
import { NextResponse } from "next/server";

// get comments for a post
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const postId = searchParams.get("postId");

        if (!postId) {
        return NextResponse.json({ error: "post id required" }, { status: 400 });
        }

        const result = await db.query(
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

        return NextResponse.json(result.rows);
        
    } catch (error) {
        console.error("error fetching comments:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    }

    // create new comment
    export async function POST(request) {
    try {
        const { userId } = auth();
        
        if (!userId) {
        return NextResponse.json({ error: "unauthorized" }, { status: 401 });
        }

        // get user's profile from database
        const userResult = await db.query(
        "SELECT id FROM profiles WHERE clerk_user_id = $1",
        [userId]
        );

        if (userResult.rows.length === 0) {
        return NextResponse.json({ error: "profile not found" }, { status: 404 });
        }

        const profileId = userResult.rows[0].id;
        const { postId, content } = await request.json();

        if (!postId || !content) {
        return NextResponse.json({ error: "post id and content required" }, { status: 400 });
        }

        // insert comment
        const result = await db.query(
        `INSERT INTO comments1 (post_id, author_id, content) 
        VALUES ($1, $2, $3) 
        RETURNING *`,
        [postId, profileId, content]
        );

        // get comment with author info
        const commentResult = await db.query(
        `SELECT 
            comments1.*,
            profiles.username,
            profiles.avatar_url,
            profiles.id as author_id
        FROM comments1 
        JOIN profiles ON comments1.author_id = profiles.id 
        WHERE comments1.id = $1`,
        [result.rows[0].id]
        );

        return NextResponse.json(commentResult.rows[0]);
        
    } catch (error) {
        console.error("error creating comment:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}