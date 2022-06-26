import React from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes";
import { AuthProvider } from "./contexts/AuthContext";
import MUIThemeProvider from "./theme/index";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <MUIThemeProvider>
          <Router />
        </MUIThemeProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
