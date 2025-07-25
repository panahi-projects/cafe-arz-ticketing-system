// components/PageTitle.tsx
"use client";

import { menuItems } from "@/configs";
import { getPageTitle } from "@/lib/utils";
import { Typography } from "@mui/material";
import { usePathname } from "next/navigation";

export const PageTitle = () => {
  const pathname = usePathname();
  const title = getPageTitle(pathname, menuItems);

  if (!title) return null;

  return (
    <Typography variant="h5" component="h1" fontWeight={500} gutterBottom>
      {title}
    </Typography>
  );
};
