import { icons } from "@/lib/icons";
import { SVGProps } from "react";
import { ImageProps } from "next/image";
import { BoxProps } from "@mui/material";

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
