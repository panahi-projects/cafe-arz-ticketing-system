import { MenuItem } from "@/configs/menu-items";
import { ListItemButton } from "@mui/material";
import Link from "next/link";
import { sidebarStyles } from "../SidebarStyles";
import MenuItemText from "./MenuItemText";

const ChildMenuItem = ({
  item,
  active,
}: {
  item: MenuItem;
  active: boolean;
}) => (
  <ListItemButton
    component={Link}
    href={item.path || "#"}
    sx={{
      ...sidebarStyles.childListItemButton,
      ...(active && sidebarStyles.activeChildListItemButton),
    }}
  >
    <MenuItemText label={item.label} />
  </ListItemButton>
);

export default ChildMenuItem;
