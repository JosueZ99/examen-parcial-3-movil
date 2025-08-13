// src/components/ProtectedRoute.tsx
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { IonPage, IonContent, IonSpinner } from "@ionic/react";
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
  const history = useHistory();

  useEffect(() => {
    // Si no hay usuario logueado, redirigir al login
    if (!user) {
      console.log("Usuario no autenticado, redirigiendo a login...");
      history.replace(redirectTo);
      return;
    }
  }, [user, history, redirectTo]);

  // Mostrar spinner mientras se verifica el usuario
  if (!user) {
    return (
      <IonPage>
        <IonContent className="bg-gray-100">
          <div className="min-h-screen flex flex-col items-center justify-center">
            <IonSpinner name="crescent" className="text-4xl mb-4" />
            <p className="text-gray-600">Verificando sesión...</p>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  // Si hay usuario, renderizar el componente protegido
  return <>{children}</>;
};

export default ProtectedRoute;
