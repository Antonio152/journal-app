import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import React, { PropsWithChildren } from "react";
import { darkMode } from "./";
export const AppTheme = ({ children }: PropsWithChildren) => {
  return (
    <ThemeProvider theme={darkMode}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
