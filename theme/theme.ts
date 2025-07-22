import { createTheme } from "@mui/material/styles";
import { PaletteMode } from "@mui/material";

const getDesignTokens = (mode: PaletteMode = "light") => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // Light mode palette
          primary: {
            main: "#078dee",
            light: "#39a4f1",
            dark: "#044e83",
            contrastText: "#fff",
            50: "#e6f4fd",
            100: "#b2dcfa",
            200: "#8dcbf7",
            300: "#59b3f4",
            400: "#39a4f1",
            500: "#078dee",
            600: "#0680d9",
            700: "#0564a9",
            800: "#044e83",
            900: "#033b64",
          },
          warning: {
            main: "#fda92d",
            light: "#fdba57",
            dark: "#8b5d19",
            contrastText: "#fff",
            50: "#fff6ea",
            100: "#fee4be",
            200: "#fed79e",
            300: "#fec572",
            400: "#fdba57",
            500: "#fda92d",
            600: "#e69a29",
            700: "#b47820",
            800: "#8b5d19",
            900: "#6a4713",
          },
          success: {
            main: "#00a770",
            light: "#33b98d",
            dark: "#005c3e",
            contrastText: "#fff",
            50: "#e6f6f1",
            100: "#b0e4d3",
            200: "#8ad7bd",
            300: "#54c49f",
            400: "#33b98d",
            500: "#00a770",
            600: "#009866",
            700: "#007750",
            800: "#005c3e",
            900: "#00462f",
          },
          error: {
            main: "#ff3030",
            light: "#ff5959",
            dark: "#8c1a1a",
            contrastText: "#fff",
            50: "#ffeaea",
            100: "#ffbfbf",
            200: "#ffa0a0",
            300: "#ff7474",
            400: "#ff5959",
            500: "#ff3030",
            600: "#e82c2c",
            700: "#b52222",
            800: "#8c1a1a",
            900: "#6b1414",
          },
          background: {
            default: "#f4f6f8",
            paper: "#ffffff",
            sidebar: "#141A21",
          },
          text: {
            primary: "#1c252e",
            secondary: "#637381",
          },
        }
      : {
          // Dark mode palette
          primary: {
            main: "#078dee",
            light: "#39a4f1",
            dark: "#044e83",
          },
          background: {
            default: "#121212",
            paper: "#1e1e1e",
          },
          text: {
            primary: "#ffffff",
            secondary: "rgba(255, 255, 255, 0.7)",
          },
        }),
  },
  typography: {
    fontFamily: "var(--font-geist-sans)",
  },
  direction: "ltr",
});

// Create theme instance
export const createCustomTheme = (mode: PaletteMode = "light") => {
  return createTheme({
    ...getDesignTokens(mode),
    direction: "ltr",
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            fontWeight: 500,
          },
        },
      },
    },
  });
};
