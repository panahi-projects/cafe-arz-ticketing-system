const connectorSize = 16;
const horizontalOffset = 4;

// Style constants
export const sidebarStyles = {
  root: {
    bgcolor: "background.sidebar",
    color: "text.secondary",
    minWidth: "280px",
  },
  list: {
    p: 2,
  },
  listItemButton: {
    textAlign: "start",
    borderRadius: "8px",
    mb: 0.6,
    py: 0.8,
    "&:hover": {
      bgcolor: "primary.light",
      color: "primary.contrastText",
      "& .MuiListItemIcon-root": {
        color: "primary.contrastText",
      },
    },
  },
  activeListItemButton: {
    bgcolor: "primary.900",
    color: "primary.contrastText",
    "& .MuiListItemIcon-root": {
      color: "primary.contrastText",
    },
  },
  listItemIcon: (active: boolean) => ({
    color: active ? "primary.contrastText" : "text.secondary",
  }),
  childListItemButton: {
    textAlign: "right",
    my: 0.5,
    mr: 0,
    py: 0.8,
    pr: 5,

    borderRadius: "8px",
    "&:hover": {
      bgcolor: "primary.main",
      color: "primary.contrastText",
    },
  },
  activeChildListItemButton: {
    bgcolor: "none",
    color: "primary.contrastText",
  },
  menuItm: {
    px: 0,
    ml: 1,
    minWidth: 25,
  },
};
