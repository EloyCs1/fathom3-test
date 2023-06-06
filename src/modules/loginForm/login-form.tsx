import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import { login } from "features/user/userSlice";
import React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLazyGetUserQuery } from "services/garageApi";

export default function LoginForm() {
  // DEVELOP LOGIN CREDENTIALS
  const defaultValue = { email: "eloycs1992@gmail.com", password: "*********" };

  const [getUser] = useLazyGetUserQuery();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const { data: userData } = await getUser();
    if (
      userData &&
      data.get("email") === userData.email &&
      data.get("password") === userData.password
    ) {
      dispatch(login(userData));
      navigate("/home");
    }
  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <TextField
        id="email"
        name="email"
        label={t("login.email")}
        margin="normal"
        defaultValue={defaultValue.email}
        required
        fullWidth
        autoComplete="email"
        autoFocus
      />
      <TextField
        id="password"
        name="password"
        type="password"
        label={t("login.password")}
        margin="normal"
        defaultValue={defaultValue.password}
        required
        fullWidth
        autoComplete="current-password"
      />
      <FormControlLabel
        control={<Checkbox value="remember" color="primary" />}
        label={t("login.remember")}
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        {t("login.signin")}
      </Button>
      <Grid container>
        <Grid item xs>
          <Link href="#" variant="body2">
            {t("login.forgot")}
          </Link>
        </Grid>
        <Grid item>
          <Link href="#" variant="body2">
            {t("login.signup")}
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
}
