import { BASE_SERVER_URL } from "constants/constants";
import CardCar from "modules/cardGrid/components/cardCar/card-car";
import { useEffect, useState } from "react";
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
      {garage.map((car) => (
        <CardCar key={car.id} {...car} />
      ))}
    </>
  );
}
