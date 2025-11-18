import { auth } from "@clerk/nextjs/server";
import { db } from "@/utils/db";
import { NextResponse } from "next/server";

export async function DELETE(request, { params }) {
  try {
    const { userId } = auth();

    if (!userId)
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });

    const commentId = params.id;

    // get user's profile
    const userResult = await db.query(
      "SELECT id FROM profiles WHERE clerk_user_id = $1",
      [userId]
    );

    if (userResult.rows.length === 0)
      return NextResponse.json({ error: "profile not found" }, { status: 404 });

    const profileId = userResult.rows[0].id;

    // check if user owns the comment
    const commentResult = await db.query(
      "SELECT author_id FROM comments1 WHERE id = $1",
      [commentId]
    );

    if (!commentResult.rows.length)
      return NextResponse.json({ error: "comment not found" }, { status: 404 });

    if (commentResult.rows[0].author_id !== profileId) 
      return NextResponse.json(
        { error: "can only delete your own comments" },
        { status: 403 }
      );
    

    // delete the comment
    await db.query("DELETE FROM comments1 WHERE id = $1", [commentId]);

    return NextResponse.json({ success: true, message: "comment deleted" });
  } catch (error) {
    console.error("error deleting comment:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
