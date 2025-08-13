// src/pages/Registro.tsx
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonItem,
  IonBadge,
  IonButtons,
  IonButton,
  IonIcon,
  IonRefresher,
  IonRefresherContent,
  IonSpinner,
} from "@ionic/react";
import {
  logOutOutline,
  personOutline,
  timeOutline,
  calendarOutline,
} from "ionicons/icons";
import { useHistory, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useUser } from "../contexts/UserContext";
import { apiService, AttendanceDisplay } from "../services/apiService";
import "./Registro.css";

const Registro: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const { user, setUser } = useUser();
  const [attendanceRecords, setAttendanceRecords] = useState<
    AttendanceDisplay[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Cargar registros al montar el componente
  useEffect(() => {
    loadAttendanceRecords();
  }, []);

  // Recargar registros cuando cambie la ubicación (para detectar navegación desde validación)
  useEffect(() => {
    // Si hay un state que indica que se debe recargar, o si venimos de validación
    const state = location.state as { shouldRefresh?: boolean } | undefined;
    if (state?.shouldRefresh) {
      loadAttendanceRecords();
      // Limpiar el state para evitar recargas innecesarias
      history.replace(location.pathname, undefined);
    }
  }, [location.state, location.pathname, history]);

  const loadAttendanceRecords = async () => {
    setIsLoading(true);
    setError(null);

    try {
      console.log("Cargando registros para usuario:", user!.record);
      const records = await apiService.getAttendanceRecords(user!.record);
      setAttendanceRecords(records);
      console.log("Registros cargados:", records);
    } catch (error: unknown) {
      console.error("Error cargando registros:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Error al cargar los registros de asistencia";
      setError(errorMessage);

      // Como respaldo, usar datos simulados
      const simulatedRecords = apiService.getSimulatedAttendance();
      setAttendanceRecords(simulatedRecords);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async (event: CustomEvent) => {
    await loadAttendanceRecords();
    event.detail.complete();
  };

  const handleLogout = () => {
    setUser(null);
    history.push("/login");
  };

  const getStatusColor = (status: string) => {
    return status === "presente" ? "success" : "warning";
  };

  const getStatusText = (status: string) => {
    return status === "presente" ? "Presente" : "Tardanza";
  };

  const formatDate = (dateString: string) => {
    // Parsear la fecha manualmente para evitar problemas de zona horaria
    const dateParts = dateString.split("-");
    if (dateParts.length === 3) {
      const year = parseInt(dateParts[0]);
      const month = parseInt(dateParts[1]) - 1; // Los meses en JavaScript van de 0-11
      const day = parseInt(dateParts[2]);

      // Crear la fecha usando la zona horaria local
      const date = new Date(year, month, day);

      return date.toLocaleDateString("es-ES", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    }

    // Fallback en caso de formato inesperado
    return dateString;
  };

  const formatTime = (timeString: string) => {
    // Si ya incluye segundos, solo tomar hora y minutos
    const timeParts = timeString.split(":");
    if (timeParts.length >= 2) {
      const hour = parseInt(timeParts[0]);
      const minute = timeParts[1];
      const ampm = hour >= 12 ? "PM" : "AM";
      const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
      return `${displayHour}:${minute} ${ampm}`;
    }
    return timeString;
  };

  // Calcular estadísticas
  const totalRecords = attendanceRecords.length;
  // const presentRecords = attendanceRecords.filter(
  //   (r) => r.status === "presente"
  // ).length;
  // const lateRecords = attendanceRecords.filter(
  //   (r) => r.status === "tardanza"
  // ).length;
  // const attendancePercentage =
  //   totalRecords > 0 ? Math.round((presentRecords / totalRecords) * 100) : 0;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="success">
          <IonTitle>Registro de Asistencia</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={handleLogout}>
              <IonIcon icon={logOutOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="bg-gray-100">
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent
            pullingText="Desliza para actualizar..."
            refreshingText="Actualizando..."
          ></IonRefresherContent>
        </IonRefresher>

        <div className="p-4">
          {/* Información del usuario */}
          <IonCard className="mb-4">
            <IonCardContent>
              <div className="flex items-center space-x-3">
                <IonIcon
                  icon={personOutline}
                  className="text-2xl text-blue-600"
                />
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {user!.names} {user!.lastnames}
                  </h2>
                  <p className="text-sm text-gray-500">{user!.mail}</p>
                  <p className="text-xs text-gray-400">
                    Record: {user!.record}
                  </p>
                </div>
              </div>
            </IonCardContent>
          </IonCard>

          {/* Mostrar error si existe */}
          {error && (
            <IonCard className="mb-4">
              <IonCardContent>
                <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                  <h3 className="text-sm font-semibold text-orange-800 mb-1">
                    Aviso
                  </h3>
                  <p className="text-orange-700 text-sm">
                    {error}. Mostrando datos de ejemplo.
                  </p>
                </div>
              </IonCardContent>
            </IonCard>
          )}

          {/* Estadísticas
          <IonCard className="mb-4">
            <IonCardContent>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Estadísticas de Asistencia
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {presentRecords}
                  </div>
                  <div className="text-sm text-gray-600">Presentes</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {lateRecords}
                  </div>
                  <div className="text-sm text-gray-600">Tardanzas</div>
                </div>
              </div>
              <div className="mt-4 text-center">
                <div className="text-xl font-bold text-blue-600">
                  {attendancePercentage}%
                </div>
                <div className="text-sm text-gray-600">Puntualidad</div>
              </div>
            </IonCardContent>
          </IonCard> */}

          {/* Lista de asistencia */}
          <IonCard>
            <IonCardContent className="p-0">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">
                  Historial de Registros
                </h3>
                <p className="text-sm text-gray-600">
                  {totalRecords > 0
                    ? `Últimos ${totalRecords} registros`
                    : "Sin registros"}
                </p>
              </div>

              <div className="space-y-0">
                {isLoading ? (
                  <div className="p-6 text-center">
                    <IonSpinner name="crescent" className="text-2xl mb-2" />
                    <p className="text-gray-500">Cargando registros...</p>
                  </div>
                ) : attendanceRecords.length === 0 ? (
                  <div className="p-6 text-center text-gray-500">
                    <IonIcon icon={calendarOutline} className="text-4xl mb-2" />
                    <p>No hay registros de asistencia</p>
                  </div>
                ) : (
                  attendanceRecords.map((record, index) => (
                    <IonItem
                      key={record.id}
                      className={
                        index < attendanceRecords.length - 1
                          ? "border-b border-gray-200"
                          : ""
                      }
                    >
                      <div className="flex-1 py-2">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-gray-800 text-base">
                            {formatDate(record.date)}
                          </h3>
                          <IonBadge
                            color={getStatusColor(record.status)}
                            className="ml-2"
                          >
                            {getStatusText(record.status)}
                          </IonBadge>
                        </div>

                        <div className="flex items-center mt-2 space-x-4">
                          <div className="flex items-center space-x-1">
                            <IonIcon
                              icon={timeOutline}
                              className="text-gray-500 text-sm"
                            />
                            <span className="text-sm text-gray-600">
                              {formatTime(record.time)}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <IonIcon
                              icon={calendarOutline}
                              className="text-gray-500 text-sm"
                            />
                            <span className="text-xs text-gray-500">
                              ID: {record.id}
                            </span>
                          </div>
                        </div>
                      </div>
                    </IonItem>
                  ))
                )}
              </div>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Registro;
