// src/pages/Tab3.tsx
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
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { useUser } from "../contexts/UserContext";
import { apiService, AttendanceDisplay } from "../services/apiService";
import "./Tab3.css";

const Tab3: React.FC = () => {
  const history = useHistory();
  const { user, setUser } = useUser();
  const [attendanceRecords, setAttendanceRecords] = useState<
    AttendanceDisplay[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  // Cargar registros al montar el componente
  useEffect(() => {
    loadAttendanceRecords();
  }, []);

  const loadAttendanceRecords = () => {
    setIsLoading(true);

    // Simular carga de datos (ya que no tenemos endpoint para obtener registros)
    setTimeout(() => {
      const simulatedRecords = apiService.getSimulatedAttendance(user!);
      setAttendanceRecords(simulatedRecords);
      setIsLoading(false);
    }, 500);
  };

  const handleRefresh = (event: CustomEvent) => {
    loadAttendanceRecords();
    setTimeout(() => {
      event.detail.complete();
    }, 1000);
  };

  const handleLogout = () => {
    setUser(null);
    history.push("/tab1");
  };

  const getStatusColor = (status: string) => {
    return status === "presente" ? "success" : "warning";
  };

  const getStatusText = (status: string) => {
    return status === "presente" ? "Presente" : "Tardanza";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Calcular estadísticas
  const totalRecords = attendanceRecords.length;
  const presentRecords = attendanceRecords.filter(
    (r) => r.status === "presente"
  ).length;
  const lateRecords = attendanceRecords.filter(
    (r) => r.status === "tardanza"
  ).length;
  const attendancePercentage =
    totalRecords > 0 ? Math.round((presentRecords / totalRecords) * 100) : 0;

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
                  <p className="text-gray-600">ID: {user!.id}</p>
                  <p className="text-sm text-gray-500">{user!.mail}</p>
                </div>
              </div>
            </IonCardContent>
          </IonCard>

          {/* Estadísticas */}
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
          </IonCard>

          {/* Lista de asistencia */}
          <IonCard>
            <IonCardContent className="p-0">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">
                  Historial de Registros
                </h3>
                <p className="text-sm text-gray-600">
                  Últimos {totalRecords} registros
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
                              {record.time}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <IonIcon
                              icon={personOutline}
                              className="text-gray-500 text-sm"
                            />
                            <span className="text-sm text-gray-600">
                              {record.identification}
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

          {/* Nota sobre datos simulados */}
          <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="text-yellow-800 text-sm">
              <strong>Nota:</strong> Los registros mostrados son datos simulados
              ya que el endpoint para consultar asistencias aún no está
              disponible en el servidor.
            </p>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
