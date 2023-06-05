import { useEffect, useState } from "react";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import { BASE_SERVER_URL } from "constants/constants";
import CardCar from "modules/cardGrid/components/cardCar/card-car";
import { Car } from "types/types";

export default function CardGrid() {
  const [garage, setGarage] = useState<Car[]>([]);

  useEffect(() => {
    fetch(BASE_SERVER_URL + "/garage")
      .then((res) => res.json())
      .then((data) => {
        setGarage(data);
      });
  }, []);

  return (
    <>
      <Container sx={{ py: 8 }} maxWidth="md">
        <Grid container spacing={4}>
          {garage
            .sort((a, b) => {
              if (a.favorite === b.favorite) {
                return 0;
              }
              if (a.favorite) {
                return -1;
              }
              return 1;
            })
            .map((car) => (
              <CardCar key={car.id} {...car} />
            ))}
        </Grid>
      </Container>
    </>
  );
}
