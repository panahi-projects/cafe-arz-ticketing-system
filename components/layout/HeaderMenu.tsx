import { Archive, Bag, Bell, Card, Cart } from "@/lib/icons";
import { Box, BoxProps, SxProps, Theme } from "@mui/material";
import React from "react";

function Item(props: BoxProps) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={[
        () => ({
          p: 0.5,
          pb: 0,
          m: 1,
          borderRadius: 2,
          fontSize: "0.875rem",
          fontWeight: "700",
          cursor: "pointer",
          border: "1px solid",
          borderColor: "background.default",
          "&:hover": {
            borderColor: "grey.300",
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    />
  );
}

interface HeaderMenuProps {
  sx?: SxProps<Theme> | undefined;
  itemsSx?: SxProps<Theme> | undefined;
}
const HeaderMenu = ({ sx, itemsSx }: HeaderMenuProps) => {
  return (
    <Box
      sx={{
        color: "text.secondary",
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        ...sx,
      }}
    >
      <Item sx={{ ...itemsSx }}>
        <Archive />
      </Item>
      <Item sx={{ color: "text.dark", ...itemsSx }}>
        <Bag />
      </Item>
      <Item sx={{ ...itemsSx }}>
        <Bell />
      </Item>
      <Item sx={{ ...itemsSx }}>
        <Card />
      </Item>
      <Item sx={{ ...itemsSx }}>
        <Cart />
      </Item>
    </Box>
  );
};

export default HeaderMenu;
