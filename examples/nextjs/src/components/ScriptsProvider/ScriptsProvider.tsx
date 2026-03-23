"use client";

import { createContext, useContext, useState } from "react";
import Script from "next/script";

type Scripts = {
  BigdataAgentModule: typeof BigdataAgent | null;
  BigdataDocumentViewerModule: typeof BigdataDocumentViewer | null;
};
const ScriptsContext = createContext<Scripts | null>(null);

type Props = {
  children: React.ReactNode;
};

const ScriptsProvider = ({ children }: Props) => {
  const [BigdataAgentModule, setBigdataAgent] = useState<
    typeof BigdataAgent | null
  >(null);
  const [BigdataDocumentViewerModule, setBigdataDocumentViewer] = useState<
    typeof BigdataDocumentViewer | null
  >(null);

  return (
    <>
      <Script
        src="https://app.bigdata.com/widgets/chat/v1.0.0/bigdata-chat.min.js"
        onLoad={() => setBigdataAgent(window.BigdataAgent)}
      />
      <Script
        src="https://app.bigdata.com/widgets/document-viewer/v1.0.0/document-viewer.min.js"
        onLoad={() => setBigdataDocumentViewer(window.BigdataDocumentViewer)}
      />
      <ScriptsContext
        value={{ BigdataDocumentViewerModule, BigdataAgentModule }}
      >
        {children}
      </ScriptsContext>
    </>
  );
};

function useScriptsContext() {
  const scripts = useContext(ScriptsContext);

  if (!scripts) {
    throw new Error("useScriptsContext must be used within ScriptsProvider");
  }

  return scripts;
}

export { ScriptsProvider, useScriptsContext };
