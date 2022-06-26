import { Box } from "@mui/system";
import React from "react";
import LogoImg from "../logo.png";
import { Link as RouterLink } from "react-router-dom";

function Logo({ disabledLink = false, sx }) {
  const logo = (
    <Box sx={{ width: 40, height: 40, ...sx }}>
      <img src={LogoImg} alt="logo" width="100%" />
    </Box>
  );
  if (disabledLink) {
    return <>{logo}</>;
  }
  return <RouterLink to="/">{logo}</RouterLink>;
}

export default Logo;
