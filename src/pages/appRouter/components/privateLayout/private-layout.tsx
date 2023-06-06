import React from "react";

import AddCar from "./components/addCar/add-car";
import AppHeader from "./components/appHeader/app-header";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactElement;
}) {
  return (
    <>
      <AppHeader />
      <main>{children}</main>
      <AddCar />
    </>
  );
}
