import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import CardCar from "modules/cardGrid/components/cardCar/card-car";

import { useGetCarsQuery } from "services/garageApi";

export default function CardGrid() {
  const { data, refetch, isFetching } = useGetCarsQuery();
  const garage = data ? [...data] : [];

  if (isFetching) {
    return (
      <div style={{ display: "flex", justifyContent: "center", top: "200px" }}>
        <CircularProgress />
      </div>
    );
  }

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
