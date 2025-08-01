import { MenuItem } from "@/types";
import { Box, ListItemButton } from "@mui/material";
import Link from "next/link";
import MenuItemText from "./MenuItemText";
import { sidebarStyles } from "./SidebarStyles";

const ChildMenuItem = ({
  item,
  active,
  isExpanded,
  onClick,
}: {
  item: MenuItem;
  active: boolean;
  isExpanded: boolean;
  onClick?: () => void;
}) => (
  <ListItemButton
    component={Link}
    href={item.path || "#"}
    sx={{
      ...sidebarStyles.childListItemButton(isExpanded),
      ...(active && sidebarStyles.activeChildListItemButton),
    }}
    onClick={onClick}
  >
    {isExpanded && (
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
    )}
    <MenuItemText label={item.label} isExpanded={isExpanded} />
  </ListItemButton>
);

export default ChildMenuItem;
