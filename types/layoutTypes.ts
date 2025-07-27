import { icons } from "@/lib/icons";
import { ReactNode, SVGProps } from "react";
import { ImageProps } from "next/image";
import { BoxProps, SxProps, Theme } from "@mui/material";
import { ColorVariants } from "./uiTypes";

export interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
}

export type IconProps = SVGProps<SVGSVGElement> & {
  size?: number;
  opacity?: number;
};

export type IconKey = keyof typeof icons;

export interface MenuItem {
  key: string;
  label: string;
  path?: string;
  icon?: IconKey;
  children?: MenuItem[] | null;
  showInBreadcrumbs?: boolean;
}

export interface LogoProps extends BoxProps {
  isExpanded: boolean;
  textLogoProps?: Partial<ImageProps>;
  iconLogoProps?: Partial<ImageProps>;
  transitionDuration?: number;
}

export interface HeaderAction {
  label: string;
  onClick: () => void;
  icon?: ReactNode;
  sx?: SxProps<Theme>;
  color?: ColorVariants;
}

export interface LayoutContextValue {
  headerAction: HeaderAction | null;
  setHeaderAction: (action: HeaderAction | null) => void;
}

export interface HeaderMenuProps {
  sx?: SxProps<Theme> | undefined;
  itemsSx?: SxProps<Theme> | undefined;
}
