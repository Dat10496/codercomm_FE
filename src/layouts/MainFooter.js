import { Link, Typography } from "@mui/material";
import React from "react";

function MainFooter() {
  return (
    <Typography variant="body2" color="text.secondary" align="center" p={1}>
      {"Copyright c"}{" "}
      <Link color="inherit" href="https://www.coderschool.vn/vi/">
        CoderSchool
      </Link>
      {"."}
      {new Date().getFullYear()}
    </Typography>
  );
}

export default MainFooter;
