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
      <CarFormDialog
        open={open}
        onClose={handleOnClickClose}
        onSubmit={handleSubmit}
      />
    </>
  );
}
