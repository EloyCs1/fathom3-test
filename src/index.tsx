import React from "react";

import { ApiProvider } from "@reduxjs/toolkit/query/react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import "i18n";
import "index.css";
import AppRouter from "pages/appRouter/app-router";
import { garageApi } from "services/garageApi";
import { store } from "store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <ApiProvider api={garageApi}>
      <Provider store={store}>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </Provider>
    </ApiProvider>
  </React.StrictMode>
);
