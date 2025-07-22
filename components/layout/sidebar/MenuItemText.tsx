import { ListItemText, Typography } from "@mui/material";
import { sidebarStyles } from "./SidebarStyles";

// Sub-components
const MenuItemText = ({
  label,
  isExpanded,
}: {
  label: string;
  isExpanded: boolean;
}) => (
  <ListItemText>
    <Typography fontSize={sidebarStyles.menuItemText(isExpanded).fontSize}>
      {label}
    </Typography>
  </ListItemText>
);

export default MenuItemText;
