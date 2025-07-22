"use client";
import { CacheProvider } from "@emotion/react";
import { createEmotionCache } from "@mui/material-nextjs/v13-pagesRouter";
import React, { useMemo, createContext, useState, ReactNode } from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material";
import { createCustomTheme } from "./theme";
type Props = {
  children: ReactNode;
  defaultMode?: "light" | "dark";
};
type ThemeContextType = {
  toggleMode: () => void;
  mode: "light" | "dark";
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const ThemeProvider = ({ children, defaultMode = "light" }: Props) => {
  const [mode, setMode] = useState<"light" | "dark">(defaultMode);
  const cache = useMemo(() => createEmotionCache(), []);
  const theme = useMemo(() => createCustomTheme(mode), [mode]);

  const contextValue = useMemo(
    () => ({
      mode,
      toggleMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    [mode]
  );
  return (
    <CacheProvider value={cache}>
      <MuiThemeProvider theme={theme}>
        <ThemeContext.Provider value={contextValue}>
          {children}
        </ThemeContext.Provider>
      </MuiThemeProvider>
    </CacheProvider>
  );
};

export default ThemeProvider;
