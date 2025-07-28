import { ColorVariants, VerificationType } from "@/types";

// Define mapping between verification types and their display properties
export const VERIFICATION_CONFIG: Record<
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

export const LEVEL_CONFIG: Record<
  string,
  {
    color: string;
    label: string;
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
  DEFAULT: {
    color: "#000000",
    label: "کاربر",
  },
};
