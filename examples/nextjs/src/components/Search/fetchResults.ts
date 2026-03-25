"use server";

type SmallDocument = {
  id: string;
  headline: string;
  source: { name: string; id: string };
  timestamp: string;
};
type State = Array<SmallDocument> | string | undefined;

const SEARCH_ENDPOINT = "https://api.bigdata.com/v1/search";

async function fetchResults(_state: State, payload: FormData): Promise<State> {
  const apiKey = process.env.BIGDATA_API_KEY;
  if (!apiKey) {
    return "BIGDATA_API_KEY not configured";
  }

  const queryParam = payload.get("query");
  const filterParam = payload.get("filter");

  if (!queryParam || typeof queryParam !== "string") {
    return "query search param is missing";
  }

  const query = decodeURIComponent(queryParam);
  const onlyPublic = filterParam === "public";
  const onlyPrivate = filterParam === "private";
  const upstreamRes = await fetch(SEARCH_ENDPOINT, {
    method: "POST",
    body: JSON.stringify({
      search_mode: "smart",
      query: {
        text: query,
        filters:
          onlyPrivate || onlyPublic
            ? {
                category: {
                  mode: onlyPublic ? "EXCLUDE" : "INCLUDE",
                  values: ["my_files"],
                },
              }
            : undefined,
      },
    }),
    headers: {
      "X-API-Key": apiKey,
      "Content-Type": "application/json",
    },
  });

  if (!upstreamRes.ok) {
    return `Documents API error: ${upstreamRes.status}`;
  }

  return (await upstreamRes.json()).results;
}

export { fetchResults };
