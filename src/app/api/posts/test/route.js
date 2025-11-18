import { db } from "@/utils/db";

export async function GET() {
  try {
    const result = await db.query("SELECT NOW()");
    return new Response(JSON.stringify(result.rows[0]), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}