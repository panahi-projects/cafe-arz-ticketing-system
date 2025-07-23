import { LogoProps } from "@/types";
import { Box, Fade } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";

const Logo: React.FC<LogoProps> = ({
  isExpanded,
  textLogoProps,
  iconLogoProps,
  transitionDuration = 300,
  ...boxProps
}) => {
  const textLogoPath = "/assets/images/text-logo.png";
  const iconLogoPath = "/assets/images/logo.png";
  const [showTextLogo, setShowTextLogo] = useState(isExpanded);

  // This effect handles the delayed state change for smooth transition
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTextLogo(isExpanded);
    }, transitionDuration / 2);
    return () => clearTimeout(timer);
  }, [isExpanded, transitionDuration]);

  return (
    <Box
      {...boxProps}
      sx={{
        position: "relative",
        width: isExpanded ? 140 : 40,
        height: 45,
        transition: `width ${transitionDuration}ms ease-in-out`,
        ...boxProps.sx,
      }}
    >
      {/* Text Logo - Fades in/out */}
      <Fade in={showTextLogo} timeout={transitionDuration}>
        <Box
          sx={{
            position: "absolute",
            left: 0,
            top: 0,
          }}
        >
          <Image
            src={textLogoPath}
            alt="Cafe Arz Text Logo"
            width={140}
            height={45}
            {...textLogoProps}
          />
        </Box>
      </Fade>

      {/* Icon Logo - Fades in/out */}
      <Fade in={!showTextLogo} timeout={transitionDuration}>
        <Box
          sx={{
            position: "absolute",
            left: 0,
            top: 0,
          }}
        >
          <Image
            src={iconLogoPath}
            alt="Cafe Arz Icon Logo"
            width={40}
            height={40}
            style={{ marginTop: "2.5px" }} // Centers vertically in 45px container
            {...iconLogoProps}
          />
        </Box>
      </Fade>
    </Box>
  );
};

export default Logo;
