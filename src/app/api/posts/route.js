import { db } from "@/utils/db";


export const POST = async (req) => {
  try {
    const body = await req.json();
    const { author_id, title, category, tags, content, image_url } = body;

    if (!author_id || !content) {
      return new Response(
        JSON.stringify({ error: "author_id and content are required " }),
        { status: 400 }
      );
    }

    //insert into posts table
    const insertPost = `
        INSERT INTO posts (author_id, title, content, category, tags)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
        `;

    const postResult = await db.query(insertPost, [
      author_id,
      title,
      content,
      category,
      tags,
      content,
    ]);
    const post = postResult.rows[0];

    if (image_url) {
      const insertImage = `INSERT INTO post_images (post_id, image_url)
            VALUES ($1, $2)
            RETURNING id, image_url;`;
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
