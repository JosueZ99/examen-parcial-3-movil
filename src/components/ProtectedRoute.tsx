// src/components/ProtectedRoute.tsx
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { IonPage, IonContent, IonSpinner } from '@ionic/react';
import { useUser } from '../contexts/UserContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  redirectTo = '/tab1' 
}) => {
  const { user, isLoggedIn } = useUser();
  const history = useHistory();

  useEffect(() => {
    // Si definitivamente no hay usuario, redirigir inmediatamente
    if (user === null && !isLoggedIn) {
      history.replace(redirectTo);
    }
  }, [user, isLoggedIn, history, redirectTo]);

  // Si no hay usuario, mostrar loading mientras redirige
  if (!isLoggedIn || !user) {
    return (
      <IonPage>
        <IonContent className="bg-gray-100">
          <div className="min-h-screen flex flex-col items-center justify-center">
            <IonSpinner name="crescent" className="text-4xl mb-4" />
            <p className="text-gray-600">Verificando sesión...</p>
            <p className="text-sm text-gray-500 mt-2">Redirigiendo al login...</p>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  // Si hay usuario, renderizar el componente protegido
  return <>{children}</>;
};

export default ProtectedRoute;