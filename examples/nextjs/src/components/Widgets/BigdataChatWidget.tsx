"use client";
import { useEffect, useRef, useState } from "react";
import { useScriptsContext } from "../ScriptsProvider/ScriptsProvider";
import { useBigdataWidgetManager } from "./BigdataWidgetManagerProvider";

type Props = {
  name: string;
  theme?: BigdataWidgetTheme;
  researchConfig?: WidgetResearchConfig;
  branding?: ChatWidgetBranding;
  className?: string;
};

function BigdataChatWidget({
  name,
  className,
  theme,
  researchConfig,
  branding,
}: Props) {
  const { BigdataAgentModule } = useScriptsContext();
  const manager = useBigdataWidgetManager();
  const [container, setContainer] = useState<null | HTMLDivElement>(null);
  const chatInstance = useRef<BigdataAgent.BigdataChatWidget>(null);

  useEffect(() => {
    if (container && BigdataAgentModule) {
      chatInstance.current = new BigdataAgentModule.BigdataChatWidget({
        container,
        proxyUrl: new URL("/api/chat/execute", location.origin).href,
        instanceId: name,
        theme,
        config: researchConfig,
        branding,
        manager,
      });
    }

    return () => {
      chatInstance.current?.destroy();
    };
  }, [
    BigdataAgentModule,
    branding,
    container,
    manager,
    name,
    researchConfig,
    theme,
  ]);

  if (BigdataAgentModule === null) {
    return <div>loading</div>;
  }

  return <div className={className} ref={setContainer} />;
}

export { BigdataChatWidget };
