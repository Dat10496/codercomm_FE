import React from "react";
import {
  createTheme,
  CssBaseline,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material";
import customizationComponents from "./customizations";

function ThemeProvider({ children }) {
  const themeOption = {
    palette: {
      primary: {
        main: "#d35400",
      },
    },
    shape: { borderRadius: 8 },
  };
  const theme = createTheme(themeOption);
  theme.components = customizationComponents(theme);
  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}

export default ThemeProvider;
