import React from "react";
import { useTranslation } from "react-i18next";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Checkbox, Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";

import { useGetTypesQuery } from "services/garageApi";
import { Car } from "types/types";

interface CarFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  defaultValue?: Car;
}

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

  const formDefaultValue = defaultValue
    ? defaultValue
    : {
        id: undefined,
        favorite: false,
        make: "",
        model: "",
        drive: "",
        fuel: "",
        year: null,
        trany: "",
        gears: null,
      };

  return (
    <Dialog open={open} onClose={onClose}>
      <Box component="form" noValidate onSubmit={onSubmit} sx={{ flexGrow: 1 }}>
        <DialogTitle>
          {formDefaultValue.id ? t("add.title.edit") : t("add.title.new")}
          <Checkbox
            name="favorite"
            defaultChecked={formDefaultValue.favorite}
            icon={<FavoriteBorderIcon />}
            checkedIcon={<FavoriteIcon color="error" />}
          />
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} marginTop={1}>
            <Grid item xs={5}>
              <TextField
                name="make"
                label={t("add.make")}
                fullWidth
                defaultValue={formDefaultValue.make}
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                name="model"
                label={t("add.model")}
                fullWidth
                defaultValue={formDefaultValue.model}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                name="year"
                type="number"
                label={t("add.year")}
                fullWidth
                defaultValue={formDefaultValue.year}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="select-drive">{t("add.drive")}</InputLabel>
                <Select
                  labelId="select-drive"
                  name="drive"
                  label={t("add.drive")}
                  defaultValue={formDefaultValue.drive}
                >
                  {data &&
                    data["drive"].map((drive) => (
                      <MenuItem value={drive.value}>{drive.label}</MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="select-fuel">{t("add.fuel")}</InputLabel>
                <Select
                  labelId="select-fuel"
                  name="fuel"
                  label={t("add.fuel")}
                  defaultValue={formDefaultValue.fuel}
                >
                  {data &&
                    data["fuel"].map((fuel) => (
                      <MenuItem value={fuel.value}>{fuel.label}</MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <TextField
                type="number"
                name="gears"
                label={t("add.gears")}
                defaultValue={formDefaultValue.gears}
              />
            </Grid>
            <Grid item xs={8}>
              <FormControl fullWidth>
                <InputLabel id="select-trany">{t("add.trany")}</InputLabel>
                <Select
                  labelId="select-trany"
                  name="trany"
                  label={t("add.trany")}
                  defaultValue={formDefaultValue.trany}
                >
                  {data &&
                    data["trany"].map((trany) => (
                      <MenuItem value={trany.value}>{trany.label}</MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
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
