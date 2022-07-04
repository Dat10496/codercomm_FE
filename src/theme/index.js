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
        main: "#3875b5",
      },
      secondary: {
        main: "#2a2c2e",
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
