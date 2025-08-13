// src/pages/Tab2.tsx
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
} from "@ionic/react";
import { logOutOutline } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import "./Tab2.css";

const Tab2: React.FC = () => {
  const history = useHistory();

  // Datos de prueba
  const [requestedPositions] = useState({ pos1: 2, pos2: 7 });
  const [digit1, setDigit1] = useState("");
  const [digit2, setDigit2] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleLogout = () => {
    history.push("/tab1");
  };

  const handleValidateAndRegister = () => {
    if (!digit1 || !digit2) {
      setToastMessage("Por favor complete ambos campos");
      setShowToast(true);
      return;
    }

    // Simulación de validación exitosa
    setToastMessage("¡Asistencia registrada exitosamente!");
    setShowToast(true);

    // Limpiar campos
    setDigit1("");
    setDigit2("");

    // Redirigir a Tab3 después de 2 segundos
    setTimeout(() => {
      history.push("/tabs/tab3");
    }, 2000);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>Validación de datos</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleLogout}>
              <IonIcon icon={logOutOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="bg-gray-100">
        <div className="p-4">
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
                    identificación:
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
                    className="h-12"
                  >
                    Validar y Registrar Asistencia
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
          duration={2000}
          position="bottom"
          color={toastMessage.includes("exitosamente") ? "success" : "warning"}
        />
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
