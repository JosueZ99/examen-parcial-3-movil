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
  IonToast,
  IonSpinner,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { useUser } from "../contexts/UserContext";
import { apiService } from "../services/apiService";
import "./Tab1.css";

const Tab1: React.FC = () => {
  const history = useHistory();
  const { setUser } = useUser();
  const [identification, setIdentification] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastColor, setToastColor] = useState<
    "success" | "danger" | "warning"
  >("success");

  const showMessage = (
    message: string,
    color: "success" | "danger" | "warning" = "success"
  ) => {
    setToastMessage(message);
    setToastColor(color);
    setShowToast(true);
  };

  const handleSubmit = async () => {
    // Validaciones básicas
    if (!identification.trim()) {
      showMessage("Por favor ingrese su identificación", "warning");
      return;
    }

    if (!password.trim()) {
      showMessage("Por favor ingrese su contraseña", "warning");
      return;
    }

    setIsLoading(true);

    try {
      const user = await apiService.login(
        identification.trim(),
        password.trim()
      );

      if (user) {
        // Login exitoso
        setUser(user);
        showMessage(`¡Bienvenido ${user.names}!`, "success");

        // Redirigir después de 1 segundo
        setTimeout(() => {
          history.push("/tab2");
        }, 1000);
      } else {
        // Credenciales incorrectas
        showMessage(
          "Credenciales incorrectas. Verifique su usuario y contraseña.",
          "danger"
        );
      }
    } catch (error) {
      // Error de conexión
      showMessage(
        "Error al conectar con el servidor. Intente nuevamente.",
        "danger"
      );
      console.error("Error en login:", error);
    } finally {
      setIsLoading(false);
    }
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
                  <IonLabel position="floating">Usuario</IonLabel>
                  <IonInput
                    type="text"
                    value={identification}
                    onIonInput={(e) => setIdentification(e.detail.value!)}
                    disabled={isLoading}
                    className="mt-4"
                    placeholder="Ingrese su usuario"
                  />
                </IonItem>

                <IonItem>
                  <IonLabel position="floating">Contraseña</IonLabel>
                  <IonInput
                    type="password"
                    value={password}
                    onIonInput={(e) => setPassword(e.detail.value!)}
                    disabled={isLoading}
                    className="mt-4"
                    placeholder="Ingrese su contraseña"
                  />
                </IonItem>

                <div className="mt-6">
                  <IonButton
                    expand="block"
                    color="primary"
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="h-12"
                  >
                    {isLoading ? (
                      <>
                        <IonSpinner name="crescent" className="mr-2" />
                        Verificando...
                      </>
                    ) : (
                      "Iniciar Sesión"
                    )}
                  </IonButton>
                </div>

                {/* Información de prueba (remover en producción) */}
                <div className="mt-4 p-3 bg-blue-50 rounded-lg text-sm">
                  <p className="text-blue-800 font-semibold mb-1">
                    Datos de prueba:
                  </p>
                  <p className="text-blue-600">Usuario: jjzambranoz</p>
                  <p className="text-blue-600">Contraseña: 1725344772</p>
                </div>
              </div>
            </IonCardContent>
          </IonCard>
        </div>

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={3000}
          position="bottom"
          color={toastColor}
        />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
