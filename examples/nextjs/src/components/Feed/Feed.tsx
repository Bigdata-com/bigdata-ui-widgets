"use client";

import { useEffect, useRef } from "react";
import { useScriptsContext } from "../ScriptsProvider/ScriptsProvider";
import { useBigdataWidgetManager } from "../Widgets/BigdataWidgetManagerProvider";
import { messages } from "./feed.data";
import { FeedMessage } from "./FeedMessage";
import styles from "./Feed.module.css";

// Custom widget, a feed imitating a social network
function Feed() {
  const { BigdataAgentModule } = useScriptsContext();
  const manager = useBigdataWidgetManager();
  const feedInstance = useRef<BigdataAgent.BigdataWidget>(null);

  useEffect(() => {
    if (BigdataAgentModule) {
      feedInstance.current = new BigdataAgentModule.BigdataWidget(
        "feed",
        manager ?? undefined,
      );
    }

    return () => {
      feedInstance.current?.destroy();
    };
  }, [BigdataAgentModule, manager]);

  if (BigdataAgentModule === null) {
    return <div>loading</div>;
  }

  return (
    <div className={styles["feed-container"]}>
      {messages.map((message) => (
        <FeedMessage
          key={message.handle}
          username={message.username}
          handle={message.handle}
          text={message.text}
          date={message.date}
          onAiClick={(prompt) =>
            feedInstance.current?.emit("chatmessage", {
              prompt,
              researchEffort: "standard",
            })
          }
        />
      ))}
    </div>
  );
}

export { Feed };
