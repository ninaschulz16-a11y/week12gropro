import { auth } from "@clerk/nextjs/server";
import { db } from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(request, { params }) {
  try {
    const { userId } = auth();

    if (!userId)
      return NextResponse.json({ error: "unauthorised" }, { status: 401 });
    const commentId = params.id;
    const { type } = await request.json(); // like or dislike

    if (!["like", "dislike"].includes(type))
      return NextResponse.json({ error: "invalid vote type" }, { status: 400 });

    // update the count
    const column = type === "like" ? "likes" : "dislikes";

    const result = await db.query(
      `UPDATE comments1 SET ${column} = ${column} + 1 WHERE id = $1 RETURNING *`,
      [commentId]
    );

    if (result.rows.length === 0)
      return NextResponse.json({ error: "comment not found" }, { status: 404 });

    return NextResponse.json({ success: true, comment: result.rows[0] });
  } catch (error) {
    console.error("error voting comment:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
