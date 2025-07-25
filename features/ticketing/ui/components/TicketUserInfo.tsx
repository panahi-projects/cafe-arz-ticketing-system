import React, { useMemo } from "react";
import { UserInfo } from "../../types";
import { Avatar, Box, Typography } from "@mui/material";
import UserVerificationTag, {
  ColorVariants,
  VerificationType,
} from "./UserVerificationTag";

const TicketUserInfo = React.memo(({ user }: { user: Partial<UserInfo> }) => {
  const verificationTags = useMemo(() => {
    if (!user.verify) return null;
    return Object.entries(user.verify).map(([key]) => (
      <UserVerificationTag
        key={key as VerificationType}
        type={key as VerificationType}
        color={
          ["success", "warning", "error"][
            Math.floor(Math.random() * 3)
          ] as ColorVariants
        }
      />
    ));
  }, [user.verify]);

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
          <Typography fontSize={12} color="success" fontWeight={700}>
            سطح الماسی
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
