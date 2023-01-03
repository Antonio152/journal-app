import React from 'react'
import { CircularProgress, Grid, Typography } from "@mui/material";
export const CheckingAuth = () => {
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
                container
                direction={"row"}
                justifyContent={"center"}
            >
                <CircularProgress color="warning"/>
            </Grid>

        </Grid>
    )
}
