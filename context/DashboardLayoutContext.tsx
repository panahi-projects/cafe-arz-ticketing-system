"use client";

import { ColorVariant } from "@/types";
import { Theme } from "@emotion/react";
import { SxProps } from "@mui/material";
import { createContext, useContext, ReactNode, useState } from "react";

interface HeaderAction {
  label: string;
  onClick: () => void;
  icon?: ReactNode;
  sx?: SxProps<Theme>;
  color?: ColorVariant;
}

interface LayoutContextValue {
  headerAction: HeaderAction | null;
  setHeaderAction: (action: HeaderAction | null) => void;
}

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
