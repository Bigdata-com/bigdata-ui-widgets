import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const apiKey = body.key

  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: "Key missing from request" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }

  return new Response(
    JSON.stringify({age: 604800}),
    {status: 200, headers: {
        "Set-Cookie": `bigdata-widget-key=${apiKey}; Max-Age=604800; SameSite=Strict; Secure; HttpOnly; Path=/`
    }}
  )
}