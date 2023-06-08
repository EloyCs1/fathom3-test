import React, { useState } from "react";

import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";

import CarFormDialog from "modules/carFormDialog/car-form-dialog";
import { useSetCarMutation } from "services/garageApi";
import { Car } from "types/types";
import "./style.scss";

export default function AddCar() {
  const [setCar] = useSetCarMutation();
  const [open, setOpen] = useState(false);

  const handleOnClickOpen = () => {
    setOpen(true);
  };

  const handleOnClickClose = () => {
    setOpen(false);
  };

  const handleSubmit = (data: Car) => {
    setCar({ ...data });
    handleOnClickClose();
  };

  return (
    <>
      <Fab className="fab" color="primary" onClick={handleOnClickOpen}>
        <AddIcon />
      </Fab>
      <CarFormDialog
        open={open}
        onClose={handleOnClickClose}
        onSubmit={handleSubmit}
      />
    </>
  );
}
