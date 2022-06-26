import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

function LoadingScreen() {
  return (
    <Box
      sx={{
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
      }}
    >
      <CircularProgress />
    </Box>
  );
}

export default LoadingScreen;
