import React from "react";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Checkbox } from "@mui/material";

import { Controller } from "react-hook-form";
import { CheckboxFormProps } from "types/types";

const CheckboxForm: React.FC<CheckboxFormProps> = ({
  name,
  control,
  register,
}) => {
  return (
    <Controller
      control={control}
      {...register(name)}
      render={({ field }) => (
        <Checkbox
          {...field}
          defaultChecked={field.value as boolean}
          icon={<FavoriteBorderIcon />}
          checkedIcon={<FavoriteIcon color="error" />}
        />
      )}
    />
  );
};

export default CheckboxForm;
