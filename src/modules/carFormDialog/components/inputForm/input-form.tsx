import React from "react";

import TextField from "@mui/material/TextField";

import { InputFormProps } from "types/types";
import { Grid } from "@mui/material";

const InputForm: React.FC<InputFormProps> = ({
  xs,
  name,
  type,
  label,
  register,
  errors,
}) => {
  return (
    <Grid item xs={xs}>
      <TextField
        type={type}
        label={label}
        fullWidth
        {...register(name)}
        error={errors[name] ? true : false}
        helperText={errors[name] ? (errors[name]?.message as string) : ""}
      />
    </Grid>
  );
};

export default InputForm;
