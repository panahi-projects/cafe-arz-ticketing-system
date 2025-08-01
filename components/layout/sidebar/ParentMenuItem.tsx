import { Box, ListItemButton } from "@mui/material";
import Link from "next/link";
import { sidebarStyles } from "./SidebarStyles";
import MenuItemIcon from "./MenuItemIcon";
import MenuItemText from "./MenuItemText";
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from "@/lib/icons";
import { MenuItem } from "@/types";

const ParentMenuItem = ({
  item,
  active,
  onClick,
  hasChildren,
  isOpen,
  isExpanded,
}: {
  item: MenuItem;
  active: boolean;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
  hasChildren: boolean;
  isOpen: boolean;
  isExpanded: boolean;
}) => (
  <ListItemButton
    component={hasChildren ? "div" : Link}
    href={hasChildren ? undefined : item.path || "#"}
    onClick={hasChildren ? onClick : undefined}
    sx={{
      ...sidebarStyles.listItemButton,
      ...(active && sidebarStyles.activeListItemButton),
      flexDirection: isExpanded ? "row" : "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: isExpanded ? "right" : "center",
      transition: "all 0.3s ease",
      gap: 0,
      px: isExpanded ? 1.5 : 0,
      position: "relative",
    }}
  >
    <MenuItemIcon icon={item.icon} active={active} isExpanded={isExpanded} />
    <MenuItemText label={item.label} isExpanded={isExpanded} />

    {isExpanded &&
      item.children &&
      (isOpen ? (
        <ChevronUp size={20} opacity={1} />
      ) : (
        <ChevronDown size={20} opacity={1} />
      ))}

    {!isExpanded && item.children && (
      <Box
        sx={{
          position: "absolute",
          left: 1,
          top: 15,
        }}
      >
        {isOpen ? (
          <ChevronRight size={20} opacity={1} />
        ) : (
          <ChevronLeft size={20} opacity={1} />
        )}
      </Box>
    )}
  </ListItemButton>
);

export default ParentMenuItem;
