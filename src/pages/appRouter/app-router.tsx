import { Route, Routes } from "react-router-dom";

import PrivateRoute from "pages/appRouter/components/privateRoute/private-route";
import PrivateLayout from "pages/appRouter/components/privateLayout/private-layout";
import PublicRoute from "pages/appRouter/components/publicRoute/public-route";
import HomePage from "pages/homePage/home-page";
import LoginPage from "pages/loginPage/login-page";

export default function AppRouter() {
  return (
    <>
      <Routes>
        <Route
          path="login/*"
          element={
            <PublicRoute>
              <Routes>
                <Route path="/*" element={<LoginPage />} />
              </Routes>
            </PublicRoute>
          }
        />
        <Route
          path="/*"
          element={
            <PrivateRoute>
              <PrivateLayout>
                <Routes>
                  <Route path="home" element={<HomePage />} />
                </Routes>
              </PrivateLayout>
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}
