// src/pages/Tab1.tsx
import {
  IonContent,
  IonPage,
  IonCard,
  IonCardContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import "./Tab1.css";

const Tab1: React.FC = () => {
  const history = useHistory();
  const [identification, setIdentification] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    // Redirigir a las páginas con tabs
    history.push("/tabs/tab2");
  };

  return (
    <IonPage>
      <IonContent>
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
          <IonCard className="w-full max-w-sm">
            <IonCardContent className="text-center">
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                  Registro de Asistencia
                </h1>
                <h2 className="text-lg text-gray-600">Inicio de sesión</h2>
              </div>

              <div className="space-y-4">
                <IonItem>
                  <IonLabel position="floating">Identificación</IonLabel>
                  <IonInput
                    type="text"
                    value={identification}
                    onIonInput={(e) => setIdentification(e.detail.value!)}
                    maxlength={10}
                    className="mt-4"
                  />
                </IonItem>

                <IonItem>
                  <IonLabel position="floating">Contraseña</IonLabel>
                  <IonInput
                    type="password"
                    value={password}
                    onIonInput={(e) => setPassword(e.detail.value!)}
                    className="mt-4"
                  />
                </IonItem>

                <div className="mt-6">
                  <IonButton
                    expand="block"
                    color="primary"
                    onClick={handleSubmit}
                    className="h-12"
                  >
                    Iniciar Sesión
                  </IonButton>
                </div>
              </div>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
