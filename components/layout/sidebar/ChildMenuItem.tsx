import { MenuItem } from "@/configs/menu-items";
import { Box, ListItemButton } from "@mui/material";
import Link from "next/link";
import { sidebarStyles } from "./SidebarStyles";
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
    {/* Curved corner connector */}
    <Box
      sx={{
        position: "absolute",
        top: "40%",
        right: "20px",
        width: 16,
        height: 16,
        border: "2px solid",
        borderColor: "text.secondary",
        borderTop: "none",
        borderLeft: "none",
        borderRadius: "0 0 8px 0",
        transform: "translateY(-50%)",
        pointerEvents: "none",
      }}
    />
    <MenuItemText label={item.label} />
  </ListItemButton>
);

export default ChildMenuItem;
