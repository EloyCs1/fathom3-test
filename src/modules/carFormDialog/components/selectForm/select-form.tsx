import React from "react";

import { Controller } from "react-hook-form";

import { FormHelperText, Grid } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import { SelectFormProps } from "types/types";

const SelectForm: React.FC<SelectFormProps> = ({
  xs,
  name,
  label,
  control,
  data,
  errors,
}) => {
  return (
    <Grid item xs={xs}>
      <FormControl fullWidth error={errors[name] ? true : false}>
        <InputLabel>{label}</InputLabel>
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Select {...field} label={label}>
              {data &&
                data[name].map((d) => (
                  <MenuItem key={d.value} value={d.value}>
                    {d.label}
                  </MenuItem>
                ))}
            </Select>
          )}
        />
        {errors[name] && (
          <FormHelperText>{errors[name]?.message}</FormHelperText>
        )}
      </FormControl>
    </Grid>
  );
};

export default SelectForm;
