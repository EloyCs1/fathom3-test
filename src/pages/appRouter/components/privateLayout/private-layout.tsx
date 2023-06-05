import React from "react";

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
    </>
  );
}
