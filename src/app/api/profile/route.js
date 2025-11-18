// src/app/api/profile/route.js

import { db } from "@/utils/db";

export async function POST(req) {
    try {
        const { clerk_user_id, username, avatar_url } = await req.json();

        if (!clerk_user_id) {
        return Response.json({ error: "clerk_user_id required" }, { status: 400 });
        }

        const result = await db.query(
        `INSERT INTO profiles (clerk_user_id, username, avatar_url)
        VALUES ($1, $2, $3)
        ON CONFLICT (clerk_user_id) 
        DO UPDATE SET username = EXCLUDED.username
        RETURNING *`,
        [clerk_user_id, username, avatar_url]
        );

        return Response.json(result.rows[0]);
    } catch (err) {
        console.error("profile api error:", err);
        return Response.json({ error: err.message }, { status: 500 });
    }
}