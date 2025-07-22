import { IconKey, icons } from "@/lib/icons";
import { sidebarStyles } from "./SidebarStyles";
import { ListItemIcon } from "@mui/material";

const MenuItemIcon = ({
  icon,
  active,
}: {
  icon?: IconKey;
  active: boolean;
}) => {
  if (!icon) return null;
  const Icon = icons[icon] as any;
  return (
    <ListItemIcon
      sx={{
        ...sidebarStyles.listItemIcon(active),
        ...sidebarStyles.menuItm,
      }}
    >
      <Icon />
    </ListItemIcon>
  );
};

export default MenuItemIcon;
