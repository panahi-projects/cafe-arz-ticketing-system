import { MenuItem } from "@/configs/menu-items";
import { ListItemButton } from "@mui/material";
import Link from "next/link";
import { sidebarStyles } from "./SidebarStyles";
import MenuItemIcon from "./MenuItemIcon";
import MenuItemText from "./MenuItemText";
import { ChevronDown, ChevronUp } from "@/lib/icons";

const ParentMenuItem = ({
  item,
  active,
  onClick,
  hasChildren,
  isOpen,
}: {
  item: MenuItem;
  active: boolean;
  onClick: () => void;
  hasChildren: boolean;
  isOpen: boolean;
}) => (
  <ListItemButton
    component={hasChildren ? "div" : Link}
    href={hasChildren ? undefined : item.path || "#"}
    onClick={hasChildren ? onClick : undefined}
    sx={{
      ...sidebarStyles.listItemButton,
      ...(active && sidebarStyles.activeListItemButton),
      gap: -1,
    }}
  >
    <MenuItemIcon icon={item.icon} active={active} />
    <MenuItemText label={item.label} />
    {item.children &&
      (isOpen ? (
        <ChevronUp size={20} opacity={1} />
      ) : (
        <ChevronDown size={20} opacity={1} />
      ))}
  </ListItemButton>
);

export default ParentMenuItem;
