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
    mb: 0.5,
    py: 0.5,
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
    pl: 4,
    pr: 9,
    "&:hover": {
      bgcolor: "primary.light",
      color: "primary.contrastText",
    },
  },
  activeChildListItemButton: {
    bgcolor: "primary.main",
    color: "primary.contrastText",
  },
};
