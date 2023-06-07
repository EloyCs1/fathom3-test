import { useTranslation } from "react-i18next";

import { Divider } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import CardCar from "modules/cardGrid/components/cardCar/card-car";

import { useGetCarsQuery } from "services/garageApi";

export default function CardGrid() {
  const { t } = useTranslation();
  const { data, isFetching } = useGetCarsQuery();
  const garage = data ? [...data] : [];
  const favoriteCars = garage.filter((f) => f.favorite);
  const noFavoriteCars = garage.filter((f) => !f.favorite);

  if (isFetching) {
    return (
      <div style={{ display: "flex", justifyContent: "center", top: "200px" }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <>
      <Container sx={{ py: 8, pt: 12 }} maxWidth="md">
        {favoriteCars.length > 0 && (
          <>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Divider>{t("grid.favorite")}</Divider>
              </Grid>
              {favoriteCars.map((car) => (
                <CardCar key={car.id} car={car} />
              ))}
              <Grid item xs={12}>
                <Divider sx={{ mb: 4 }}></Divider>
              </Grid>
            </Grid>
          </>
        )}
        <Grid container spacing={4}>
          {noFavoriteCars.map((car) => (
            <CardCar key={car.id} car={car} />
          ))}
        </Grid>
      </Container>
    </>
  );
}
