import { icons } from "@/lib/icons";
import { formatPrice } from "@/lib/utils";
import { IconKey } from "@/types";
import {
  Box,
  Card,
  Chip,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ReactNode } from "react";
import { Shahkar, UserInfo } from "../../types";
import TicketUserInfo from "./TicketUserInfo";

interface TicketUserDetailsProps {
  icon: IconKey;
  title: string;
  content?: ReactNode;
}

const TicketUserDetailsContent = (content: string | number) => {
  return (
    <Box
      display="flex"
      gap={0.5}
      alignItems="center"
      sx={{
        maxWidth: "100%",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      }}
    >
      <Typography fontSize={14} fontWeight={700} noWrap>
        {content}
      </Typography>
    </Box>
  );
};

const TicketUserDetailsContentShahkar = (shahkar: Shahkar) => {
  if (!shahkar?.label) return null;
  return (
    <Box display="flex" gap={0.5} alignItems="center">
      <Chip
        label={shahkar.label}
        sx={{
          borderRadius: "4px",
          height: "25px",
          bgcolor: shahkar.color === "green" ? "success.100" : "error.100",
          color: shahkar.color === "green" ? "success.800" : "error.800",
        }}
      />
    </Box>
  );
};

const TicketUserDetailsContentPrice = (price: number) => {
  return (
    <Box display="flex" gap={0.5} alignItems="center">
      <Typography fontSize={14} fontWeight={700}>
        {formatPrice(price)}
      </Typography>
      <Typography fontSize={12} sx={{ color: "text.secondary" }}>
        تومان
      </Typography>
    </Box>
  );
};

const TicketUserDetails = ({
  icon,
  title,
  content,
}: TicketUserDetailsProps) => {
  const Icon = icons[icon];
  return (
    <Box
      display="flex"
      alignItems="center"
      gap={1}
      sx={{
        width: "100%",
        minWidth: 0, // Important for text truncation
      }}
    >
      <Box
        sx={{
          border: "2px solid",
          borderColor: "gray.300",
          borderRadius: "12px",
          p: 1,
          lineHeight: 1,
          height: "45px",
          width: "45px",
          textAlign: "center",
          flexShrink: 0,
        }}
      >
        <Icon />
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        gap={0.7}
        sx={{
          minWidth: 0, // Crucial for text truncation
          width: "100%",
        }}
      >
        <Typography
          fontSize={12}
          sx={{
            color: "text.secondary",
          }}
        >
          {title}
        </Typography>
        <Box
          sx={{
            width: "100%",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {content}
        </Box>
      </Box>
    </Box>
  );
};

const TicketDetailSummary = (user: Partial<UserInfo>) => {
  const isTablet = useMediaQuery("(max-width:1024px)");
  const theme = useTheme();
  const userDetails: TicketUserDetailsProps[] = [
    {
      icon: "wallet",
      title: "موجودی کاربر",
      content: TicketUserDetailsContentPrice((user.balance as number) || 0),
    },
    {
      icon: "mobileOutline",
      title: "شماره تماس",
      content: TicketUserDetailsContent(user.mobile as number | string),
    },
    {
      icon: "stackedEmail",
      title: "ایمیل کاربر",
      content: TicketUserDetailsContent(user.email as string),
    },
    {
      icon: "securityRounded",
      title: "وضعیت شاهکار",
      content: TicketUserDetailsContentShahkar(user.shahkar as Shahkar),
    },
  ];

  return (
    <Card
      sx={{
        px: 2,
        py: 3,
        borderRadius: "12px",
        height: "100%",
        width: "100%",
        overflow: "hidden", // Changed from visible to hidden
      }}
    >
      {user && (
        <Box
          display="flex"
          height="100%"
          flexDirection={!isTablet ? "row" : "column"}
          gap={1}
          sx={{
            minWidth: 0, // Important for containment
          }}
          alignItems={"center"}
        >
          <Box
            sx={{
              flexShrink: 0,
              width: { xs: "100%", sm: 200 },
              pr: 2,
            }}
          >
            <TicketUserInfo user={user} />
          </Box>
          <Box
            sx={{
              flex: 1,
              minWidth: 0,
              overflow: "auto", // Changed to auto for scroll when needed
              "&::-webkit-scrollbar": {
                height: "4px",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: theme.palette.divider,
                borderRadius: "4px",
              },
            }}
          >
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              sx={{
                width: "100%",
                minWidth: 0, // Important for grid items
              }}
            >
              {userDetails.map((item) => (
                <Grid
                  size={isTablet ? 12 : 6}
                  key={item.title}
                  sx={{
                    minWidth: 0, // Important for grid items
                  }}
                >
                  <TicketUserDetails
                    icon={item.icon}
                    title={item.title}
                    content={item.content}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      )}
    </Card>
  );
};

export default TicketDetailSummary;
