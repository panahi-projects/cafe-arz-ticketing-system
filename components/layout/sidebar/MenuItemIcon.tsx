import { IconKey, icons } from "@/lib/icons";
import { sidebarStyles } from "./SidebarStyles";
import { ListItemIcon } from "@mui/material";

const MenuItemIcon = ({
  icon,
  active,
  isExpanded,
}: {
  icon?: IconKey;
  active: boolean;
  isExpanded: boolean;
}) => {
  if (!icon) return null;
  const Icon = icons[icon] as any;
  return (
    <ListItemIcon
      sx={{
        ...sidebarStyles.listItemIcon(active),
        ...sidebarStyles.menuItem,
        mx: isExpanded ? 0.8 : "auto",
      }}
    >
      <Icon />
    </ListItemIcon>
  );
};

export default MenuItemIcon;
