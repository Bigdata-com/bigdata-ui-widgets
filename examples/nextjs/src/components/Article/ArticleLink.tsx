"use client";

import { useEffect, useRef } from "react";
import { useScriptsContext } from "../ScriptsProvider/ScriptsProvider";
import { useBigdataWidgetManager } from "../Widgets/BigdataWidgetManagerProvider";
import styles from "./Article.module.css";
import { Button } from "@base-ui/react";

// Custom widget, imitating a read more component

type Props = {
  children: string;
  prompt: string;
};

function ArticleLink({ children, prompt }: Props) {
  const { BigdataAgentModule } = useScriptsContext();
  const manager = useBigdataWidgetManager();
  const linkInstance = useRef<BigdataAgent.BigdataWidget>(null);

  useEffect(() => {
    if (BigdataAgentModule) {
      linkInstance.current = new BigdataAgentModule.BigdataWidget(
        `link-${children}`,
        manager ?? undefined,
      );
    }

    return () => {
      linkInstance.current?.destroy();
    };
  }, [BigdataAgentModule, manager, children]);

  if (BigdataAgentModule === null) {
    return <div>loading</div>;
  }

  return (
    <Button
      className={styles["article-button"]}
      onClick={() =>
        linkInstance.current?.emit("chatmessage", {
          prompt,
          researchEffort: "standard",
        })
      }
    >
      {children}
    </Button>
  );
}

export { ArticleLink };
