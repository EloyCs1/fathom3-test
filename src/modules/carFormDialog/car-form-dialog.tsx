import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { useGetTypesQuery } from "services/garageApi";
import { Car, CarFormDialogProps } from "types/types";
import CheckboxForm from "./components/checkboxForm/checkbox-form";
import InputForm from "./components/inputForm/input-form";
import SelectForm from "./components/selectForm/select-form";

const CarFormDialog: React.FC<CarFormDialogProps> = ({
  open,
  onClose,
  onSubmit,
  defaultValue,
}) => {
  const { t, i18n } = useTranslation();
  const { data } = useGetTypesQuery({
    language: i18n.language,
  });

  const defaultValues = defaultValue
    ? defaultValue
    : {
        id: null,
        favorite: false,
        make: "",
        model: "",
        drive: "",
        fuel: "",
        year: null,
        trany: "",
        gears: null,
      };

  const validationSchema = Yup.object().shape({
    favorite: Yup.bool(),
    make: Yup.string().required(t("validation.required") as string),
    model: Yup.string().required(t("validation.required") as string),
    drive: Yup.string().required(t("validation.required") as string),
    fuel: Yup.string().required(t("validation.required") as string),
    year: Yup.number()
      .min(1886, t("validation.min.year") as string)
      .max(new Date().getFullYear(), t("validation.max.year") as string)
      .required(t("validation.required") as string),
    trany: Yup.string().required(t("validation.required") as string),
    gears: Yup.number()
      .min(1, t("validation.min.gears") as string)
      .max(9, t("validation.max.gears") as string)
      .required(t("validation.required") as string),
  });

  const {
    reset,
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Car>({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues,
  });

  useEffect(() => {
    open && reset();
  }, [open, reset]);

  return (
    <Dialog open={open} onClose={onClose}>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        sx={{ flexGrow: 1 }}
      >
        <DialogTitle>
          {defaultValues.id ? t("add.title.edit") : t("add.title.new")}
          <CheckboxForm name="favorite" control={control} />
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} marginTop={1}>
            <InputForm
              xs={3}
              name="make"
              label={t("add.make")}
              errors={errors}
              register={register}
            />
            <InputForm
              xs={5}
              name="model"
              label={t("add.model")}
              errors={errors}
              register={register}
            />
            <InputForm
              xs={4}
              type="number"
              name="year"
              label={t("add.year")}
              errors={errors}
              register={register}
            />
            <SelectForm
              xs={6}
              name={"drive"}
              label={t("add.drive")}
              control={control}
              data={data}
              errors={errors}
            />
            <SelectForm
              xs={6}
              name={"fuel"}
              label={t("add.fuel")}
              control={control}
              data={data}
              errors={errors}
            />
            <InputForm
              xs={4}
              type="number"
              name="gears"
              label={t("add.gears")}
              errors={errors}
              register={register}
            />
            <SelectForm
              xs={8}
              name={"trany"}
              label={t("add.trany")}
              control={control}
              data={data}
              errors={errors}
            />
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>{t("add.cancel")}</Button>
          <Button type="submit">{t("add.accept")}</Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default CarFormDialog;
