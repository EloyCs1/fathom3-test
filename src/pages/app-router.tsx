import DetailPage from "pages/detailPage/detail-page";
import HomePage from "pages/homePage/home-page";
import LoginPage from "pages/loginPage/login-page";
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { RootState } from "store";

export default function AppRouter() {
  const PublicRoute = ({ children }: { children: React.ReactElement }) => {
    const { user } = useSelector((state: RootState) => state);
    return !user.email ? children : <Navigate to="/home" />;
  };

  const PrivateRoute = ({ children }: { children: React.ReactElement }) => {
    const { user } = useSelector((state: RootState) => state);
    const { pathname, search } = useLocation();
    const lastPath = pathname + search;
    localStorage.setItem("lastPath", lastPath);

    return user.email ? children : <Navigate to="/login" />;
  };

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
              <Routes>
                <Route path="home" element={<HomePage />} />
                <Route path="detail" element={<DetailPage />} />
              </Routes>
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}
