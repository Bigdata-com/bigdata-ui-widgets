"use client";
import { useEffect, useRef } from "react";
import { useScriptsContext } from "../ScriptsProvider/ScriptsProvider";
import { useBigdataWidgetManager } from "../Widgets/BigdataWidgetManagerProvider";
import { Button } from "@base-ui/react";
import styles from "./Search.module.css";

const dateFormatter = new Intl.DateTimeFormat("en");

type SmallDocument = {
  id: string;
  headline: string;
  source: { name: string, id: string };
  timestamp: string;
};

type Props = {
  results: Array<SmallDocument>;
};

function Results({ results }: Props) {
  const { BigdataAgentModule } = useScriptsContext();
  const manager = useBigdataWidgetManager();
  const searchInstance = useRef<BigdataAgent.BigdataWidget>(null);

  useEffect(() => {
    if (BigdataAgentModule) {
      searchInstance.current = new BigdataAgentModule.BigdataWidget(
        "search",
        manager ?? undefined,
      );
    }

    return () => {
      searchInstance.current?.destroy();
    };
  }, [BigdataAgentModule, manager]);

  if (BigdataAgentModule === null) {
    return <div>loading</div>;
  }

  const topResults = results.slice(0, 4);

  return (
    <div>
      {topResults.map((result) => (
        <Button
          className={styles["card"]}
          key={result.id}
          onClick={() => {
            searchInstance.current?.emit("opendocument", {
              documentId: result.id,
              // Not ideal way of checking private content
              isPrivate: ["000000", "9790B7"].includes(result.source.id ),
            });
          }}
        >
          <span className={styles["headline"]}>{result.headline}</span>
          <span className={styles["subheader"]}>
            {result.source.name} -{" "}
            {dateFormatter.format(new Date(result.timestamp))}
          </span>
        </Button>
      ))}
    </div>
  );
}

export { Results };
