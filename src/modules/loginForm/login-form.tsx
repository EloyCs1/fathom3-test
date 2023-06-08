import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";

import { login } from "features/user/userSlice";
import { useLazyGetUserQuery } from "services/garageApi";
import { LoginFormData } from "types/types";

export default function LoginForm() {
  // DEVELOP LOGIN CREDENTIALS
  const defaultValues = {
    email: "eloycs1992@gmail.com",
    password: "*********",
    remember: false,
  };

  const [getUser] = useLazyGetUserQuery();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required(t("validation.required") as string)
      .email(t("validation.invalid") as string),
    password: Yup.string().required(t("validation.required") as string),
    remember: Yup.bool(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues,
  });

  const onSubmit = async (data: LoginFormData) => {
    const { data: userData } = await getUser();
    if (
      userData &&
      data.email === userData.email &&
      data.password === userData.password
    ) {
      dispatch(login(userData));
      navigate("/home");
    }
  };

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      sx={{ mt: 1 }}
    >
      <TextField
        label={t("login.email")}
        margin="normal"
        required
        fullWidth
        autoComplete="email"
        autoFocus
        {...register("email")}
        error={errors.email ? true : false}
        helperText={errors.email ? (errors.email.message as string) : ""}
      />
      <TextField
        type="password"
        label={t("login.password")}
        margin="normal"
        required
        fullWidth
        autoComplete="current-password"
        {...register("password")}
        error={errors.password ? true : false}
        helperText={errors.password ? (errors.password.message as string) : ""}
      />
      <FormControlLabel
        control={<Checkbox color="primary" />}
        label={t("login.remember")}
        {...register("remember")}
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        {t("login.signin")}
      </Button>
      <Grid container>
        <Grid item xs>
          <Link href="#">{t("login.forgot")}</Link>
        </Grid>
        <Grid item>
          <Link href="#">{t("login.signup")}</Link>
        </Grid>
      </Grid>
    </Box>
  );
}
