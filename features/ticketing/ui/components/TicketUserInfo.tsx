import React from "react";
import { UserInfo } from "../../types";
import { Avatar, Box, Typography } from "@mui/material";
import UserVerificationTag, {
  ColorVariants,
  UserVerificationTagProps,
  VerificationType,
} from "./UserVerificationTag";
import { randomSelect } from "../../lib";

interface TicketUserInfoProps {
  user: Partial<UserInfo>;
}

const TicketUserInfo: React.FC<TicketUserInfoProps> = ({ user }) => {
  const userVerify = () => {
    const status = ["success", "warning", "error"];
    if (user.verify && Object.keys(user.verify).length) {
      return Object.entries(user.verify).map(([key, value]) => {
        return (
          <UserVerificationTag
            key={key}
            type={key as VerificationType}
            color={randomSelect(status) as ColorVariants}
          />
        );
      });
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "center",
        }}
      >
        <Box>
          <Avatar
            alt={user.name}
            src={user.avatar || "/assets/images/default-avatar.png"}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Typography fontSize={12} fontWeight={500}>
            {user.name}
          </Typography>
          <Typography fontSize={12} color="success" fontWeight={700}>
            سطح الماسی
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: 0.8,
        }}
      >
        {userVerify()}
      </Box>
    </Box>
  );
};

export default TicketUserInfo;
