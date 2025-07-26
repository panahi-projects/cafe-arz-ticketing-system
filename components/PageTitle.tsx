"use client";

import { menuItems } from "@/configs";
import { getPageTitle } from "@/lib/utils";
import { Typography, useMediaQuery } from "@mui/material";
import { usePathname } from "next/navigation";

export const PageTitle = () => {
  const pathname = usePathname();
  const isMobile = useMediaQuery("(max-width:768px)");
  const title = getPageTitle(pathname, menuItems);

  if (!title) return null;

  return (
    <Typography
      variant={isMobile ? "h6" : "h5"}
      component="h1"
      fontWeight={500}
      gutterBottom
    >
      {title}
    </Typography>
  );
};
