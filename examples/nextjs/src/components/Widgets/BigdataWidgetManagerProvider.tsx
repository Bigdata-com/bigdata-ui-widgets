"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useScriptsContext } from "../ScriptsProvider/ScriptsProvider";

const WidgetManagerContext =
  createContext<BigdataAgent.BigdataWidgetManager | null>(null);

type Props = {
  children: React.ReactNode;
  baseTheme?: BigdataWidgetTheme;
};

function BigdataWidgetManagerProvider({ children, baseTheme }: Props) {
  const { BigdataAgentModule } = useScriptsContext();
  const [managerInstance, setManagerInstance] =
    useState<BigdataAgent.BigdataWidgetManager | null>(null);

  useEffect(() => {
    if (BigdataAgentModule) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setManagerInstance(
        new BigdataAgentModule.BigdataWidgetManager({ theme: baseTheme }),
      );
    }
  }, [BigdataAgentModule, baseTheme]);

  if (BigdataAgentModule === null) {
    return null;
  }

  return (
    <WidgetManagerContext value={managerInstance}>
      {children}
    </WidgetManagerContext>
  );
}

function useBigdataWidgetManager() {
  return useContext(WidgetManagerContext);
}

export { useBigdataWidgetManager, BigdataWidgetManagerProvider };
