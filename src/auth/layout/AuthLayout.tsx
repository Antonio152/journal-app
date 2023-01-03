import React from "react";
import { Grid, Typography } from "@mui/material";
import { authLayoutProps } from "../types/authLayoutProps";
export const AuthLayout = ({ children, title = '' }: authLayoutProps) => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh", padding: 4 }}
    >
      <Grid
        item
        className="box-shadow"
        xs={3}
        sx={{ width: { sm: 450 }, backgroundColor: "#2a2d35", padding: 3, borderRadius: 2 }}
      >
        <Typography variant="h5" sx={{ mb: 1, mt: 1 }} textAlign="center">
          {title}
        </Typography>
        {children}
      </Grid>
    </Grid>
  );
};
