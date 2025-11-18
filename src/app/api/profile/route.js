// this page is so - api creates a profile if it does not exist already

import { db } from "@/utils/db";

export async function POST(req) {
  try {
    const { clerk_user_id, username, avatar_url } = await req.json();

    // check if profile already exists
    const existing = await db.query(
      "SELECT * FROM profiles WHERE clerk_user_id = $1",
      [clerk_user_id]
    );

    if (existing.rows.length > 0) {
      return Response.json(existing.rows[0]);
    }

    // otherwise create new profile
    const result = await db.query(
      `INSERT INTO profiles (clerk_user_id, username, avatar_url)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [clerk_user_id, username, avatar_url]
    );

    return Response.json(result.rows[0]);
  } catch (err) {
    console.error("profile api error:", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
