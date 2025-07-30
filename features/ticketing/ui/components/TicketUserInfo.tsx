import React, { useMemo } from "react";
import { Avatar, Box, Typography } from "@mui/material";
import UserVerificationTag from "./UserVerificationTag";
import { UserInfo } from "../../types";
import { LEVEL_CONFIG, VERIFICATION_CONFIG } from "../../constants";

const TicketUserInfo = React.memo(({ user }: { user: Partial<UserInfo> }) => {
  // Safe level handling
  const userLevel = useMemo(() => {
    const level = user?.level || "DEFAULT";
    return LEVEL_CONFIG[level] || LEVEL_CONFIG.DEFAULT;
  }, [user?.level]);

  const verificationTags = useMemo(() => {
    if (!user?.verify) return null;

    return Object.entries(user.verify)
      .filter(([key]) => VERIFICATION_CONFIG[key])
      .filter(([key, value]) => value || !VERIFICATION_CONFIG[key]?.skip)
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
              color: userLevel.color,
            }}
            fontWeight={700}
          >
            سطح {userLevel.label}
          </Typography>
        </Box>
      </Box>
      {verificationTags && (
        <Box sx={{ display: "flex", gap: 0.8, flexWrap: "wrap" }}>
          {verificationTags}
        </Box>
      )}
    </Box>
  );
});

export default TicketUserInfo;
