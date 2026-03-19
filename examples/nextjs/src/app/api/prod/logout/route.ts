export async function POST() {
  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      "Set-Cookie": `bigdata-widget-key=none; Max-Age=604800; SameSite=Strict; Secure; HttpOnly; Path=/; Expires Wed, 21 Oct 2015 07:28:00 GMT`,
    },
  });
}
