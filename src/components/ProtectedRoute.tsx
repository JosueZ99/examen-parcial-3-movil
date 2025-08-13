// src/components/ProtectedRoute.tsx
import React from "react";
import { Redirect } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  redirectTo = "/login",
}) => {
  const { user } = useUser();

  // Si no hay usuario, redirigir inmediatamente usando Redirect
  if (!user) {
    return <Redirect to={redirectTo} />;
  }

  // Si hay usuario, renderizar el componente protegido
  return <>{children}</>;
};

export default ProtectedRoute;
