import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
) {
   const apiKey = process.env.BIGDATA_API_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: "BIGDATA_API_KEY not configured" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }

  const urlParam = request.nextUrl.searchParams.get("url")

  if (!urlParam || typeof urlParam !== "string"){
    return new Response(
      JSON.stringify({ error: "url search param is missing" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }

  const targetUrl = decodeURIComponent(urlParam)
  const upstreamRes = await fetch(targetUrl, {
    method: "GET",
    headers: {
      "X-API-Key": apiKey,
    },
  });

  if (!upstreamRes.ok) {
    const text = await upstreamRes.text();
    return new Response(
      JSON.stringify({
        error: `Documents API error: ${upstreamRes.status}`,
        detail: text,
      }),
      {
        status: upstreamRes.status,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  // Pass through the SSE stream
  const headers = new Headers({
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
  });

  return new Response(upstreamRes.body, {
    status: 200,
    headers,
  });
}
