import { icons } from "@/lib/icons";
import { UserVerificationTagProps, VerificationType } from "@/types";
import { IconButton } from "@mui/material";

const UserVerificationTag = ({ type, color }: UserVerificationTagProps) => {
  const iconMap: Record<VerificationType, any> = {
    mobile: icons.phoneOutline,
    phone: icons.phoneCalling,
    credit: icons.userIdOutline,
    email: icons.letter,
    image: icons.videoCamera,
    national: icons.documentText,
  };
  if (!type) return null;
  const Icon = iconMap[type];

  return (
    <IconButton
      sx={{
        bgcolor:
          color === "success"
            ? "success.main"
            : color === "warning"
            ? "warning.main"
            : "error.main",
        borderRadius: 2,
        color: "gray.50",
        fontWeight: "bold",
        p: 0.5,
      }}
    >
      <Icon size={20} opacity={1} />
    </IconButton>
  );
};

export default UserVerificationTag;
