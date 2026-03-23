import { NextRequest } from "next/server";

const AGENTS_EXECUTE_ENDPOINT = "https://agents.bigdata.com/v1/research-agent"

export async function POST(request: NextRequest) {
  const body = await request.json();  

  const apiKey = process.env.BIGDATA_API_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: "BIGDATA_API_KEY not configured" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }

  const upstreamRes = await fetch(AGENTS_EXECUTE_ENDPOINT, {
    method: "POST",
    headers: {
      "X-API-Key": apiKey,
      "Content-Type": "application/json",
      Accept: "text/event-stream",
    },
    body: JSON.stringify(body),
  });

  if (!upstreamRes.ok) {
    const text = await upstreamRes.text();
    return new Response(
      JSON.stringify({
        error: `Agents API error: ${upstreamRes.status}`,
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
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });

  return new Response(upstreamRes.body, {
    status: 200,
    headers,
  });
}
