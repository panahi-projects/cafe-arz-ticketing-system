import { ListItemText, Typography } from "@mui/material";

// Sub-components
const MenuItemText = ({ label }: { label: string }) => (
  <ListItemText>
    <Typography fontSize={14}>{label}</Typography>
  </ListItemText>
);

export default MenuItemText;
