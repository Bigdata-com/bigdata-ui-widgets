type FeedMessage = {
  username: string;
  handle: string;
  text: string;
  date: string;
};

const messages: Array<FeedMessage> = [
  {
    username: "Daniel Carter",
    handle: "@dcapital",
    text: "NVIDIA continues to benefit from AI infrastructure demand. Data center revenue growth remains the key driver, and hyperscaler capex trends still look supportive going into the next two quarters.",
    date: "2026-03-05T09:14:00Z",
  },
  {
    username: "Laura Mendes",
    handle: "@lm_macro",
    text: "Oil markets tightened slightly this week after updated supply guidance from OPEC+. Energy equities may see near-term support if Brent stabilizes above the $80 range.",
    date: "2026-03-05T11:32:00Z",
  },
  {
    username: "Victor Huang",
    handle: "@vh_equities",
    text: "Apple’s services segment continues to provide margin stability. Even with slower hardware cycles, recurring revenue from subscriptions remains an important part of the investment thesis.",
    date: "2026-03-05T13:20:00Z",
  },
];

export { messages };
