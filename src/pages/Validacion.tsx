// src/pages/Validacion.tsx
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonButton,
  IonToast,
  IonButtons,
  IonIcon,
  IonSpinner,
} from "@ionic/react";
import { logOutOutline, refreshOutline } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { useUser } from "../contexts/UserContext";
import { apiService } from "../services/apiService";
import "./Validacion.css";

const Validacion: React.FC = () => {
  const history = useHistory();
  const { user, setUser } = useUser();

  // Estados para las posiciones solicitadas
  const [requestedPositions, setRequestedPositions] = useState({
    pos1: 1,
    pos2: 2,
  });
  const [digit1, setDigit1] = useState("");
  const [digit2, setDigit2] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastColor, setToastColor] = useState<
    "success" | "danger" | "warning"
  >("success");
  const [isLoading, setIsLoading] = useState(false);

  // Generar posiciones aleatorias al cargar el componente
  useEffect(() => {
    generateRandomPositions();
  }, []);

  const generateRandomPositions = () => {
    const idLength = user!.id.length;
    const pos1 = Math.floor(Math.random() * idLength) + 1; // Posición 1-indexed
    let pos2 = Math.floor(Math.random() * idLength) + 1;

    // Asegurar que las posiciones sean diferentes
    while (pos2 === pos1) {
      pos2 = Math.floor(Math.random() * idLength) + 1;
    }

    setRequestedPositions({ pos1, pos2 });
    setDigit1("");
    setDigit2("");
  };

  const showMessage = (
    message: string,
    color: "success" | "danger" | "warning" = "success"
  ) => {
    setToastMessage(message);
    setToastColor(color);
    setShowToast(true);
  };

  const handleLogout = () => {
    setUser(null);
    history.push("/login");
  };

  const validateDigits = (): boolean => {
    const idString = user!.id;
    const expectedDigit1 = idString[requestedPositions.pos1 - 1]; // Convertir a 0-indexed
    const expectedDigit2 = idString[requestedPositions.pos2 - 1];

    return digit1 === expectedDigit1 && digit2 === expectedDigit2;
  };

  const handleValidateAndRegister = async () => {
    if (!digit1 || !digit2) {
      showMessage("Por favor complete ambos campos", "warning");
      return;
    }

    // Validar dígitos en el frontend
    if (!validateDigits()) {
      showMessage(
        "Los dígitos ingresados no son correctos. Verifique las posiciones solicitadas.",
        "danger"
      );
      return;
    }

    setIsLoading(true);

    try {
      // Enviar solo el record del usuario al servidor
      const success = await apiService.registerAttendance(user!.record);

      if (success) {
        showMessage("¡Asistencia registrada exitosamente!", "success");

        // Limpiar campos
        setDigit1("");
        setDigit2("");

        // Redirigir a registro después de 2 segundos con señal de refresh
        setTimeout(() => {
          history.push("/registro", { shouldRefresh: true });
        }, 2000);
      } else {
        showMessage(
          "Error al registrar asistencia. Intente nuevamente.",
          "danger"
        );
      }
    } catch (error: unknown) {
      console.error("Error registrando asistencia:", error);

      // Mostrar mensaje de error más específico
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Error de conexión al registrar asistencia.";
      showMessage(errorMessage, "danger");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Validación de datos</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={generateRandomPositions} disabled={isLoading}>
              <IonIcon icon={refreshOutline} />
            </IonButton>
            <IonButton onClick={handleLogout}>
              <IonIcon icon={logOutOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="bg-gray-100">
        <div className="p-4">
          {/* Información del usuario */}
          <IonCard className="mb-4">
            <IonCardContent>
              <div className="text-center">
                <h2 className="text-lg font-semibold text-gray-800">
                  {user!.names} {user!.lastnames}
                </h2>
                <p className="text-sm text-gray-500">{user!.mail}</p>
              </div>
            </IonCardContent>
          </IonCard>

          {/* Formulario de validación */}
          <IonCard className="mb-4">
            <IonCardContent>
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                  <h3 className="text-lg font-semibold text-blue-800 mb-2">
                    Instrucciones
                  </h3>
                  <p className="text-blue-700">
                    Para verificar su identidad, ingrese los dígitos que se
                    encuentran en las siguientes posiciones de su número de
                    identificación
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Posición {requestedPositions.pos1}
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        maxLength={1}
                        value={digit1}
                        onChange={(e) => setDigit1(e.target.value)}
                        disabled={isLoading}
                        className="w-16 h-16 text-2xl text-center border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-white"
                        placeholder="?"
                      />
                    </div>
                  </div>

                  <div className="text-center">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Posición {requestedPositions.pos2}
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        maxLength={1}
                        value={digit2}
                        onChange={(e) => setDigit2(e.target.value)}
                        disabled={isLoading}
                        className="w-16 h-16 text-2xl text-center border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-white"
                        placeholder="?"
                      />
                    </div>
                  </div>
                </div>

                <div className="text-center mt-6">
                  <IonButton
                    expand="block"
                    color="primary"
                    onClick={handleValidateAndRegister}
                    disabled={isLoading}
                    className="h-12"
                  >
                    {isLoading ? (
                      <>
                        <IonSpinner name="crescent" className="mr-2" />
                        Registrando...
                      </>
                    ) : (
                      "Validar y Registrar Asistencia"
                    )}
                  </IonButton>
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

export default Validacion;
