import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Fab from "@mui/material/Fab";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";

import { useGetTypesQuery, useSetCarMutation } from "services/garageApi";
import { Car } from "types/types";
import "./style.scss";

export default function AddCar() {
  const { t, i18n } = useTranslation();
  const { data } = useGetTypesQuery({
    language: i18n.language,
  });
  const [setCar] = useSetCarMutation();

  const [open, setOpen] = useState(false);

  const handleOnClickOpen = () => {
    setOpen(true);
  };

  const handleOnClickClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Random id for demo api
    const id = Math.random() * 11;
    const data = new FormData(event.currentTarget);
    const value = Object.fromEntries(data.entries()) as unknown as Car;
    setCar({ ...value, id: id });
    handleOnClickClose();
  };

  return (
    <>
      <Fab className="fab" color="primary" onClick={handleOnClickOpen}>
        <AddIcon />
      </Fab>
      <Dialog open={open} onClose={handleOnClickClose}>
        <DialogTitle>{t("add.title")}</DialogTitle>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <DialogContent>
            <TextField name="make" label={t("add.make")} />
            <TextField name="model" label={t("add.model")} />
            <TextField name="year" label={t("add.year")} />
            <FormControl fullWidth>
              <InputLabel id="select-drive">{t("add.drive")}</InputLabel>
              <Select
                labelId="select-drive"
                name="drive"
                label={t("add.drive")}
              >
                {data &&
                  data["drive"].map((drive) => (
                    <MenuItem value={drive.value}>{drive.label}</MenuItem>
                  ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="select-fuel">{t("add.fuel")}</InputLabel>
              <Select labelId="select-fuel" name="fuel" label={t("add.fuel")}>
                {data &&
                  data["fuel"].map((fuel) => (
                    <MenuItem value={fuel.value}>{fuel.label}</MenuItem>
                  ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="select-trany">{t("add.trany")}</InputLabel>
              <Select
                labelId="select-trany"
                name="trany"
                label={t("add.trany")}
              >
                {data &&
                  data["trany"].map((trany) => (
                    <MenuItem value={trany.value}>{trany.label}</MenuItem>
                  ))}
              </Select>
            </FormControl>
            <TextField name="gears" label={t("add.gears")} />
            <TextField name="favorite" label={t("add.favorite")} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleOnClickClose}>{t("add.cancel")}</Button>
            <Button type="submit">{t("add.accept")}</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
}
