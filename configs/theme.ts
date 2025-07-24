import { createTheme, Shadows } from "@mui/material/styles";
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
            A100: "#82c1ff", // Lighter accent
            A200: "#4da9ff", // Medium accent
            A400: "#1a91ff", // Strong accent
            A700: "#0084f5", // Darker accent
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
            A100: "#ffdf9e",
            A200: "#ffcf6b",
            A400: "#ffbf38",
            A700: "#ffb71f",
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
            A100: "#88e6c4",
            A200: "#55d9ad",
            A400: "#22cc96",
            A700: "#0ac389",
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
            A100: "#ff8a8a",
            A200: "#ff5252",
            A400: "#ff1a1a",
            A700: "#ff0000",
          },
          gray: {
            50: "#fafafa",
            100: "#f5f5f5",
            200: "#eeeeee",
            300: "#e0e0e0",
            400: "#bdbdbd",
            500: "#9e9e9e",
            600: "#757575",
            700: "#616161",
            800: "#424242",
            900: "#212121",
            A100: "#f5f5f5",
            A200: "#eeeeee",
            A400: "#bdbdbd",
            A700: "#616161",
          },
          background: {
            default: "#f4f6f8",
            paper: "#ffffff",
            sidebar: "#141A21",
            // shades for `default` (gray-blue)
            default50: "#fafcfd",
            default100: "#f0f5f9",
            default200: "#e6eef5",
            default300: "#dce7f1",
            default400: "#d2e0ed",
            default500: "#f4f6f8", // Original
            default600: "#c0d1e2",
            default700: "#a6c0d9",
            default800: "#8cafd0",
            default900: "#729ec7",
            // shades for `paper` (white)
            paper50: "#ffffff", // Pure white (no lighter)
            paper100: "#f9f9f9",
            paper200: "#f3f3f3",
            paper300: "#ededed",
            paper400: "#e7e7e7",
            paper500: "#ffffff", // Original
            paper600: "#d9d9d9",
            paper700: "#bfbfbf",
            paper800: "#a6a6a6",
            paper900: "#8c8c8c",
            // shades for `sidebar` (dark blue)
            sidebar50: "#f0f2f5",
            sidebar100: "#d6dbe2",
            sidebar200: "#bcc4cf",
            sidebar300: "#a2adbc",
            sidebar400: "#8896a9",
            sidebar500: "#141A21", // Original
            sidebar600: "#10171e",
            sidebar700: "#0c1218",
            sidebar800: "#080d12",
            sidebar900: "#04080c",
          },
          text: {
            dark: "#04050d", // Original (now 500)
            primary: "#1c252e", // Original (now 500)
            secondary: "#637381", // Original (now 500)
            // Generated shades for `dark` (near-black)
            dark50: "#e6e7e9",
            dark100: "#b3b6bd",
            dark200: "#8c909b",
            dark300: "#59616f",
            dark400: "#374153",
            dark500: "#04050d", // Original
            dark600: "#04050c",
            dark700: "#03040a",
            dark800: "#030308",
            dark900: "#020206",
            // Generated shades for `primary` (dark blue-gray)
            primary50: "#e8eaec",
            primary100: "#b9bfc5",
            primary200: "#98a1aa",
            primary300: "#697684",
            primary400: "#4c5a6b",
            primary500: "#1c252e", // Original
            primary600: "#192229",
            primary700: "#141b21",
            primary800: "#0f151a",
            primary900: "#0b1014",
            // Generated shades for `secondary` (gray-blue)
            secondary50: "#eaedef",
            secondary100: "#c4ccd2",
            secondary200: "#a9b5be",
            secondary300: "#8394a1",
            secondary400: "#6c8190",
            secondary500: "#637381", // Original
            secondary600: "#5a6875",
            secondary700: "#46525c",
            secondary800: "#374049",
            secondary900: "#2a3138",
          },
        }
      : {
          // Dark mode palette
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
            A100: "#82c1ff",
            A200: "#4da9ff",
            A400: "#1a91ff",
            A700: "#0084f5",
          },
          warning: {
            main: "#fda92d",
            light: "#fdba57",
            dark: "#8b5d19",
            contrastText: "#fff",
            A100: "#ffdf9e",
            A200: "#ffcf6b",
            A400: "#ffbf38",
            A700: "#ffb71f",
          },
          success: {
            main: "#00a770",
            light: "#33b98d",
            dark: "#005c3e",
            contrastText: "#fff",
            A100: "#88e6c4",
            A200: "#55d9ad",
            A400: "#22cc96",
            A700: "#0ac389",
          },
          error: {
            main: "#ff3030",
            light: "#ff5959",
            dark: "#8c1a1a",
            contrastText: "#fff",
            A100: "#ff8a8a",
            A200: "#ff5252",
            A400: "#ff1a1a",
            A700: "#ff0000",
          },
          gray: {
            50: "#212121",
            100: "#424242",
            200: "#616161",
            300: "#757575",
            400: "#9e9e9e",
            500: "#bdbdbd",
            600: "#e0e0e0",
            700: "#eeeeee",
            800: "#f5f5f5",
            900: "#fafafa",
            A100: "#616161",
            A200: "#757575",
            A400: "#9e9e9e",
            A700: "#e0e0e0",
          },
          background: {
            default: "#121212",
            paper: "#1e1e1e",
            sidebar: "#141A21",
          },
          text: {
            primary: "#ffffff",
            secondary: "rgba(255, 255, 255, 0.7)",
            dark: "#e0e0e0", // Adjusted for dark mode
          },
        }),
  },
  typography: {
    fontFamily: "var(--font-geist-sans)",
  },
  direction: "ltr",
});

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
    shadows: [
      "none", // elevation 0
      "0px 2px 8px rgba(0, 0, 0, 0.08)", // elevation 1
      "0px 4px 12px rgba(0, 0, 0, 0.12)", // elevation 2
      "0px 6px 16px rgba(0, 0, 0, 0.14)", // elevation 3
      "0px 8px 20px rgba(0, 0, 0, 0.16)", // elevation 4
      "0px 10px 24px rgba(0, 0, 0, 0.18)", // elevation 5
      // Fill the rest with a consistent higher elevation style
      ...Array(19).fill("0px 12px 28px rgba(0, 0, 0, 0.2)"), // elevations 6-24
    ] as Shadows,
  });
};
