import { NextRequest } from "next/server";

const DOCUMENTS_ENDPOINT = "https://api.bigdata.com/contents/v1/documents";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
   const apiKey = process.env.BIGDATA_API_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: "BIGDATA_API_KEY not configured" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }

  const { id } = await params;

  const upstreamRes = await fetch(`${DOCUMENTS_ENDPOINT}/${id}/annotated`, {
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
