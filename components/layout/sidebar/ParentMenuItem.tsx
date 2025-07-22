import { MenuItem } from "@/configs/menu-items";
import { ListItemButton } from "@mui/material";
import Link from "next/link";
import { sidebarStyles } from "./SidebarStyles";
import MenuItemIcon from "./MenuItemIcon";
import MenuItemText from "./MenuItemText";

const ParentMenuItem = ({
  item,
  active,
  onClick,
  hasChildren,
}: {
  item: MenuItem;
  active: boolean;
  onClick: () => void;
  hasChildren: boolean;
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
  </ListItemButton>
);

export default ParentMenuItem;
