import { Dinosaur } from "@/lib/icons";
import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";

export default function NotFound() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        textAlign: "center",
        px: 4,
      }}
    >
      <Typography
        variant="h2"
        sx={{
          fontSize: "3.75rem",
          fontWeight: "bold",
          letterSpacing: "-0.025em",
          mb: 1,
        }}
      >
        404
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          mb: 3,
          color: "text.secondary",
          fontSize: "1.25rem",
          lineHeight: "1.75rem",
        }}
      >
        <Dinosaur />
        <Typography
          component="span"
          sx={{
            fontSize: 22,
          }}
        >
          Oops! The page you're looking for doesn't exist.
        </Typography>
      </Box>

      <Button
        variant="outlined"
        color="info"
        component={Link}
        href="/dashboard"
      >
        بازگشت به صفحه داشبورد
      </Button>
    </Box>
  );
}
