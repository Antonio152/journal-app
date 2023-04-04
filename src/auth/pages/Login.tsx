import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../hooks/useForm";
import { startGoogleSignIn, startLoginWithEmailPassword } from "../../store/auth/thunks";
import { RootState, useAppDispatch } from "../../store/store";
/* Mui imports */
// import { Google } from "@mui/icons-material";
// import { Button, Grid, TextField, Typography, Link, Alert } from "@mui/material";
import Google  from '@mui/icons-material/Google';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const formData = {
  email: "",
  password: "",
}

export const Login = () => {
  const { email, password, onChangeEvent } = useForm(formData)
  const { status, errorMessage } = useSelector((state: RootState) => state.auth)
  const isAuthenticating = useMemo(() => status === "checking", [status])
  const dispatch = useAppDispatch()
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(startLoginWithEmailPassword(email, password))
  }
  const onGoogleSignIn = () => {
    dispatch(startGoogleSignIn())
  }
  return (
    <AuthLayout title="Login">
      <form aria-label="formSubmit" onSubmit={onSubmit} className="animate__animated animate__fadeIn animate__faster">
        <Grid container>
          <Grid item xs={11} sx={{ mt: 2, ml: "auto", mr: "auto" }}>
            <TextField
              label="correo"
              type="email"
              placeholder="correo@google.com"
              name="email"
              value={email}
              onChange={onChangeEvent}
              fullWidth
              aria-label="email"
            />
          </Grid>
          <Grid item xs={11} sx={{ mt: 2, ml: "auto", mr: "auto" }}>
            <TextField
              label="contraseña"
              type="password"
              placeholder="Contraseña"
              name="password"
              value={password}
              onChange={onChangeEvent}
              fullWidth
              inputProps={{
                "data-testid": "password",
              }}
            />
          </Grid>
          <Grid
            container
            spacing={2}
            sx={{ mb: 2, mt: 2, ml: "auto", mr: "auto" }}
          >
            <Grid
              item
              xs={11}
              sx={{ margin: "auto", paddingLeft: "0!important" }}
              display={!!errorMessage ? '' : "none"}>
              <Alert severity="error">
                {errorMessage}
              </Alert>
            </Grid>
            <Grid item xs={12} sm={6} sx={{ margin: "auto" }}>
              <Button 
                type="submit" 
                variant="contained" 
                fullWidth 
                sx={{ color: "white" }}
                disabled={isAuthenticating}>
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6} sx={{ margin: "auto" }}>
              <Button 
                onClick={onGoogleSignIn} 
                variant="contained" 
                fullWidth 
                sx={{ color: "white" }}
                aria-label="Google-btn"
                disabled={isAuthenticating}>
                <Google />
                <Typography sx={{ ml: 1 }}>Google</Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Link component={RouterLink} color="inherit" to="/auth/register">
              Crear una cuenta
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
