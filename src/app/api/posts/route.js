import { db } from "@/utils/db";

export const POST = async (req) => {
  try {
    const body = await req.json();
    const { clerk_user_id, title, category, tags, content, image_url } = body;
    console.log("Received image_url:", image_url);

    if (!clerk_user_id || !content) {
      return new Response(
        JSON.stringify({ error: "author_id and content are required " }),
        { status: 400 }
      );
    }

    // find the profile UUID from Clerk ID
    const profileQuery = `
      SELECT id FROM profiles WHERE clerk_id = $1;
    `;
    const profileResult = await db.query(profileQuery, [clerk_id]);

    if (!profileResult.rows.length) {
      return new Response(
        JSON.stringify({ error: "Profile not found for this user." }),
        { status: 404 }
      );
    }

    const author_id = profileResult.rows[0].id; // ✅ UUID for posts table

    //insert into posts table
    const insertPost = `
        INSERT INTO posts (author_id, title, content, category, tags, latitude, longitude)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;
        `;

    const postResult = await db.query(insertPost, [
      author_id,
      title || null,
      content,
      category || null,
      tags || null,
      51.5074,
      -0.1278,
    ]);

    const post = postResult.rows[0];

    // insert image if exists
    if (image_url) {
      const insertImage = `INSERT INTO post_images (post_id, image_url)
            VALUES ($1, $2)
            RETURNING *;`;
      await db.query(insertImage, [post.id, image_url]);
    }

    return new Response(
      JSON.stringify({ message: "Post created successfully!", post }),
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
};
