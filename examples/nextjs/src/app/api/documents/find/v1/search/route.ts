import { NextRequest } from "next/server";

const SEARCH_ENDPOINT = "https://api.bigdata.com/v1/search";

export async function POST(request: NextRequest) {
  const apiKey = process.env.BIGDATA_API_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: "BIGDATA_API_KEY not configured" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }

  const body = await request.text();

  const upstreamRes = await fetch(SEARCH_ENDPOINT, {
    method: "POST",
    body,
    headers: {
      "X-API-Key": apiKey,
      "Content-Type": "application/json",
    },
  });

  if (!upstreamRes.ok) {
    const text = await upstreamRes.text();
    return new Response(
      JSON.stringify({
        error: `Search API error: ${upstreamRes.status}`,
        detail: text,
      }),
      {
        status: upstreamRes.status,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  return new Response(upstreamRes.body, {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
    },
  });
}
