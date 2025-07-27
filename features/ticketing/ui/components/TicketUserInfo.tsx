import React, { useMemo } from "react";
import { Avatar, Box, Typography } from "@mui/material";
import UserVerificationTag from "./UserVerificationTag";
import { ColorVariants, VerificationType } from "@/types";
import { UserInfo } from "../../types";

// Define mapping between verification types and their display properties
const VERIFICATION_CONFIG: Record<
  string,
  {
    type: VerificationType;
    trueColor: ColorVariants;
    falseColor: ColorVariants;
    skip?: boolean; // Optional flag to skip certain verifications
  }
> = {
  mobile: { type: "mobile", trueColor: "success", falseColor: "error" },
  email: { type: "email", trueColor: "success", falseColor: "error" },
  credit: { type: "credit", trueColor: "success", falseColor: "warning" }, // Different color for credit
  national: { type: "national", trueColor: "success", falseColor: "warning" },
  phone: { type: "phone", trueColor: "success", falseColor: "error" },
  image: { type: "image", trueColor: "info", falseColor: "error", skip: true }, // Skip when false
};

const LEVEL_CONFIG: Record<
  string,
  {
    color: string;
    label?: string; // Optional display label
  }
> = {
  DIAMOND: {
    color: "#08a13e", // Diamond blue
    label: "الماسی",
  },
  PLATINUM: {
    color: "#3f06a9", // Platinum
    label: "پلاتین",
  },
  GOLD: {
    color: "#FFD700", // Gold
    label: "طلایی",
  },
  SILVER: {
    color: "#929a9a", // Silver
    label: "نقره‌ای",
  },
  BRONZE: {
    color: "#cd7832", // Bronze
    label: "برنزی",
  },
};

const TicketUserInfo = React.memo(({ user }: { user: Partial<UserInfo> }) => {
  const verificationTags = useMemo(() => {
    if (!user?.verify) return null;

    return Object.entries(user.verify)
      .filter(([key]) => VERIFICATION_CONFIG[key]) // Only include configured types
      .filter(
        ([key, value]) => value || !VERIFICATION_CONFIG[key]?.skip // Skip if false and skip flag is true
      )
      .map(([key, value]) => {
        const config = VERIFICATION_CONFIG[key];
        return (
          <UserVerificationTag
            key={config.type}
            type={config.type}
            color={value ? config.trueColor : config.falseColor}
          />
        );
      });
  }, [user?.verify]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
      <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        <Avatar
          alt={user.name}
          src={user.avatar || "/assets/images/default-avatar.png"}
        />
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography fontSize={12} fontWeight={500}>
            {user.name}
          </Typography>
          <Typography
            fontSize={12}
            sx={{
              color: LEVEL_CONFIG[user.level as string].color,
            }}
            fontWeight={700}
          >
            سطح {LEVEL_CONFIG[user.level as string].label}
          </Typography>
        </Box>
      </Box>
      {verificationTags && (
        <Box sx={{ display: "flex", gap: 0.8 }}>{verificationTags}</Box>
      )}
    </Box>
  );
});

export default TicketUserInfo;
