import { useMemo, useState } from "react";
import { Button, Grid, TextField, Typography, Link, Alert } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { AuthLayout } from "../layout/AuthLayout";
import { useForm } from "../hooks/useForm";
import { RootState, useAppDispatch } from "../../store/store";
import { createUserWithEmailPassword } from "../../store/auth/thunks";
import { useSelector } from "react-redux";

export const Register = () => {
  const dispatch = useAppDispatch()
  const { status, errorMessage } = useSelector((state: RootState) => state.auth)
  const isCheckingAuthenticating = useMemo(() => status === "checking", [status])
  const [formSubmitted, setFormSubmitted] = useState(false)
  const initialValues = {
    fullName: "",
    email: "",
    password: "",
  }
  const formValidation = {
    fullName: [(value: string) => value.length > 0, "El nombre es requerido"],
    email: [(value: string) => value.includes("@"), "El correo no es válido"],
    password: [(value: string) => value.length >= 1, "El nombre es requerido"],
  }

  const { fullName, email, password, onChangeEvent, fullNameValid, emailValid, passwordValid, isFormValid, formState } = useForm(initialValues, formValidation)

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormSubmitted(true)
    if (!isFormValid) return;
    dispatch(createUserWithEmailPassword(formState))
    /* dispatch(checkingAuthentication(email, password)) */
  }
  return (
    <AuthLayout title="Crear cuenta">
      <form onSubmit={onSubmit} className="animate__animated animate__fadeIn animate__faster">
        <Grid container>
          <Grid item xs={11} sx={{ mt: 2, ml: "auto", mr: "auto" }}>
            <TextField
              label="Nombre completo"
              type="text"
              placeholder="Antonio Rosas"
              fullWidth
              name="fullName"
              value={fullName}
              onChange={onChangeEvent}
              error={!!fullNameValid && formSubmitted}
              helperText={fullNameValid}
            />
          </Grid>
          <Grid item xs={11} sx={{ mt: 2, ml: "auto", mr: "auto" }}>
            <TextField
              label="correo"
              type="email"
              placeholder="Antonio@mail.com"
              fullWidth
              name="email"
              value={email}
              onChange={onChangeEvent}
              error={!!emailValid && formSubmitted}
              helperText={emailValid}
            />
          </Grid>
          <Grid item xs={11} sx={{ mt: 2, ml: "auto", mr: "auto" }}>
            <TextField
              label="contraseña"
              type="password"
              placeholder="Contraseña"
              fullWidth
              name="password"
              value={password}
              onChange={onChangeEvent}
              error={!!passwordValid && formSubmitted}
              helperText={passwordValid}
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
            <Grid item xs={11} sx={{ margin: "auto", paddingLeft: "0!important" }}>
              <Button
                disabled={isCheckingAuthenticating}
                variant="contained"
                fullWidth
                sx={{ color: "white" }}
                type="submit">
                Crear cuenta
              </Button>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent="end">
            <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
            <Link component={RouterLink} color="inherit" to="/auth/login">
              Ingresar
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
