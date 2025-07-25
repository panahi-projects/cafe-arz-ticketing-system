// components/Breadcrumbs.tsx
"use client";

import { menuItems } from "@/configs";
import { getBreadcrumbItems } from "@/lib/utils";
import { Breadcrumbs as MuiBreadcrumbs, Link, Typography } from "@mui/material";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

export const Breadcrumbs = ({
  separator = ".",
}: {
  separator?: string | React.ReactNode;
}) => {
  const pathname = usePathname();
  const breadcrumbItems = getBreadcrumbItems(pathname, menuItems);

  if (breadcrumbItems.length === 0) return null;

  return (
    <MuiBreadcrumbs
      separator={
        <Typography
          fontWeight={700}
          fontSize={28}
          sx={{
            lineHeight: 1,
            pb: 1,
          }}
        >
          {separator}
        </Typography>
      }
      sx={{ mb: 2 }}
    >
      {breadcrumbItems.map((item, index) =>
        index < breadcrumbItems.length - 1 ? (
          <Link
            key={item.path}
            component={NextLink}
            href={item.path}
            color="inherit"
            underline="hover"
          >
            <Typography fontWeight={700} sx={{ color: "text.dark900" }}>
              {item.label}
            </Typography>
          </Link>
        ) : (
          <Typography key={item.path} color="text.secondary">
            {item.label}
          </Typography>
        )
      )}
    </MuiBreadcrumbs>
  );
};
