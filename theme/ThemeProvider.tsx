"use client";
import { createCustomTheme } from "@/configs";
import { ThemeContextType, ThemeProviderProps } from "@/types";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { createContext, useEffect, useMemo, useState } from "react";

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const createEmotionCache = () => {
  return createCache({ key: "css", prepend: true });
};

const ThemeProvider = ({
  children,
  defaultMode = "light",
}: ThemeProviderProps) => {
  const [mode, setMode] = useState<"light" | "dark">(defaultMode);
  const [mounted, setMounted] = useState(false);

  const cache = createEmotionCache();

  const theme = useMemo(() => createCustomTheme(mode), [mode]);

  useEffect(() => {
    setMounted(true);
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
      localStorage.setItem("theme-mode", mode);
    }
  }, [mode, mounted]);

  const contextValue = useMemo(
    () => ({
      mode,
      toggleMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    [mode]
  );

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
