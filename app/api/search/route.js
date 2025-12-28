import { createClient } from "@/utils/supabase/client";

export async function GET(req) {
  const supabase = createClient();

  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";

  const { data, error } = await supabase
    .from("books")
    .select("*")
    .ilike("name", `%${q}%`);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }

  return new Response(JSON.stringify(data), { status: 200 });
}
