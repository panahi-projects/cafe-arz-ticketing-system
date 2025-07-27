import { ReactNode } from "react";

export type VerificationType =
  | "mobile"
  | "email"
  | "credit"
  | "national"
  | "phone"
  | "image";

export type ColorVariants =
  | "inherit"
  | "success"
  | "primary"
  | "secondary"
  | "error"
  | "info"
  | "warning";

export interface UserVerificationTagProps {
  type: VerificationType;
  color?: ColorVariants;
}

export interface ThemeProviderProps {
  children: ReactNode;
  defaultMode?: "light" | "dark";
}

export interface ThemeContextType {
  toggleMode: () => void;
  mode: "light" | "dark";
}
