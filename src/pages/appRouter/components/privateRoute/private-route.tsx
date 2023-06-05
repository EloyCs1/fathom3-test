import React from "react";

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "store";

export default function PrivateRoute({
  children,
}: {
  children: React.ReactElement;
}) {
  const { user } = useSelector((state: RootState) => state);
  return user.email ? children : <Navigate to="/login" />;
}
