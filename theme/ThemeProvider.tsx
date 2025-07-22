"use client";
import { CacheProvider } from "@emotion/react";
import { createEmotionCache } from "@mui/material-nextjs/v13-pagesRouter";
import React, {
  useMemo,
  createContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material";
import { createCustomTheme } from "./theme";
import { CssBaseline } from "@mui/material";

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
  const [mounted, setMounted] = useState(false);
  const cache = useMemo(() => createEmotionCache(), []);
  const theme = useMemo(() => createCustomTheme(mode), [mode]);

  useEffect(() => {
    setMounted(true);
    // Get saved theme from localStorage if available
    const savedMode = localStorage.getItem("theme-mode") as
      | "light"
      | "dark"
      | null;
    if (savedMode) {
      setMode(savedMode);
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      // Save theme preference to localStorage
      localStorage.setItem("theme-mode", mode);
    }
  }, [mode, mounted]);

  const contextValue = useMemo(
    () => ({
      mode,
      toggleMode: () => {
        setMode((prev) => (prev === "light" ? "dark" : "light"));
      },
    }),
    [mode]
  );

  // Don't render until mounted on client
  if (!mounted) {
    return null;
  }

  return (
    <CacheProvider value={cache}>
      <MuiThemeProvider theme={theme}>
        <ThemeContext.Provider value={contextValue}>
          <CssBaseline />
          {children}
        </ThemeContext.Provider>
      </MuiThemeProvider>
    </CacheProvider>
  );
};

export default ThemeProvider;
