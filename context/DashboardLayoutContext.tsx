"use client";

import { HeaderAction, LayoutContextValue } from "@/types";
import { createContext, ReactNode, useContext, useState } from "react";

const LayoutContext = createContext<LayoutContextValue>({
  headerAction: null,
  setHeaderAction: () => {},
});

export const useLayoutContext = () => useContext(LayoutContext);

export const DashboardLayoutProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [headerAction, setHeaderAction] = useState<HeaderAction | null>(null);

  return (
    <LayoutContext.Provider value={{ headerAction, setHeaderAction }}>
      {children}
    </LayoutContext.Provider>
  );
};
