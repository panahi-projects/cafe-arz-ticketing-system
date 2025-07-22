// Style constants
export const sidebarStyles = {
  root: (isExpanded: boolean) => ({
    bgcolor: "background.sidebar",
    color: "text.secondary",
    width: isExpanded ? "280px" : "100px",
    minWidth: isExpanded ? "280px" : "100px",
    transition: "all 0.3s ease",
    position: "relative",
  }),
  list: (isExpanded: boolean) => ({
    p: isExpanded ? 2 : 0.7,
  }),
  listItemButton: {
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
    color: "primary.200",
    "& .MuiListItemIcon-root": {
      color: "primary.200",
    },
  },
  listItemIcon: (active: boolean) => ({
    color: active ? "primary.contrastText" : "text.secondary",
  }),
  childListItemButton: (isExpanded: boolean) => ({
    textAlign: "right",
    my: 0.5,
    mr: 0,
    py: 0.8,
    pr: isExpanded ? 5 : 2,
    pl: isExpanded ? 0 : 2,
    borderRadius: 0,
    "&:first-of-type": {
      borderTopLeftRadius: "8px",
      borderTopRightRadius: "8px",
    },
    "&:last-of-type": {
      borderBottomLeftRadius: "8px",
      borderBottomRightRadius: "8px",
    },
    "&:hover": {
      bgcolor: "primary.main",
      color: "primary.contrastText",
    },
    transition: "all 0.2s ease",
  }),
  activeChildListItemButton: {
    bgcolor: "none",
    color: "primary.contrastText",
  },
  menuItem: {
    px: 0,
    ml: 1,
    minWidth: 25,
  },
  menuItemText: (isExpanded: boolean) => ({
    fontSize: isExpanded ? 14 : 12,
  }),
};
