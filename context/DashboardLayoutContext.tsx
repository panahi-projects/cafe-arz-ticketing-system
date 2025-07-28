"use client";
import { LayoutConfig, LayoutContextValue } from "@/types";
import { createContext, ReactNode, useContext, useState } from "react";

const LayoutContext = createContext<LayoutContextValue>({
  layoutConfig: {},
  setLayoutConfig: () => {},
});

export const useLayoutContext = () => useContext(LayoutContext);

export const DashboardLayoutProvider = ({
  children,
  defaultConfig = {},
}: {
  children: ReactNode;
  defaultConfig?: LayoutConfig;
}) => {
  const [layoutConfig, setLayoutConfig] = useState<LayoutConfig>({
    showBreadcrumbs: true,
    showPageTitle: true,
    ...defaultConfig,
  });

  return (
    <LayoutContext.Provider value={{ layoutConfig, setLayoutConfig }}>
      {children}
    </LayoutContext.Provider>
  );
};
