"use client";
import { useEffect, useRef, useState } from "react";
import { useScriptsContext } from "../ScriptsProvider/ScriptsProvider";
import { useBigdataWidgetManager } from "./BigdataWidgetManagerProvider";

type Props = {
  name: string;
  className?: string;
  theme?: BigdataWidgetTheme;
};

function BigdataDocumentViewerWidget({ name, className, theme }: Props) {
  const { BigdataDocumentViewerModule } = useScriptsContext();
  const manager = useBigdataWidgetManager();
  const [container, setContainer] = useState<null | HTMLDivElement>(null);
  const documentInstance =
    useRef<BigdataDocumentViewer.BigdataDocumentWidget>(null);

  useEffect(() => {
    if (container && BigdataDocumentViewerModule) {
      documentInstance.current =
        new BigdataDocumentViewerModule.BigdataDocumentWidget({
          container,
          proxyUrl: new URL("/api/documents/find", location.origin).href,
          instanceId: name,
          theme,
          manager,
        });
    }

    return () => {
      documentInstance.current?.destroy();
    };
  }, [BigdataDocumentViewerModule, container, manager, name, theme]);

  if (BigdataDocumentViewerModule === null) {
    return <div>loading</div>;
  }

  return <div className={className} ref={setContainer} />;
}

export { BigdataDocumentViewerWidget };
