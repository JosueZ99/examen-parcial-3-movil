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
} from "@ionic/react";
import { logOutOutline } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import "./Tab3.css";

interface AttendanceRecord {
  id: number;
  identification: string;
  name: string;
  time: string;
  date: string;
  status: "presente" | "tardanza";
}

const Tab3: React.FC = () => {
  const history = useHistory();

  const handleLogout = () => {
    history.push("/tab1");
  };

  // Datos de prueba
  const [allAttendance] = useState<AttendanceRecord[]>([
    {
      id: 1,
      identification: "1234567890",
      name: "Juan Carlos Pérez",
      time: "08:30 AM",
      date: "2025-08-02",
      status: "presente",
    },
    {
      id: 2,
      identification: "1234567890",
      name: "Juan Carlos Pérez",
      time: "08:45 AM",
      date: "2025-08-01",
      status: "tardanza",
    },
    {
      id: 3,
      identification: "1234567890",
      name: "Juan Carlos Pérez",
      time: "08:15 AM",
      date: "2025-07-31",
      status: "presente",
    },
    {
      id: 4,
      identification: "1234567890",
      name: "Juan Carlos Pérez",
      time: "09:10 AM",
      date: "2025-07-30",
      status: "tardanza",
    },
    {
      id: 5,
      identification: "1234567890",
      name: "Juan Carlos Pérez",
      time: "08:25 AM",
      date: "2025-07-29",
      status: "presente",
    },
    {
      id: 6,
      identification: "1234567890",
      name: "Juan Carlos Pérez",
      time: "08:50 AM",
      date: "2025-07-26",
      status: "tardanza",
    },
    {
      id: 7,
      identification: "1234567890",
      name: "Juan Carlos Pérez",
      time: "08:20 AM",
      date: "2025-07-25",
      status: "presente",
    },
    {
      id: 8,
      identification: "1234567890",
      name: "Juan Carlos Pérez",
      time: "08:35 AM",
      date: "2025-07-24",
      status: "presente",
    },
  ]);

  const getStatusColor = (status: string) => {
    return status === "presente" ? "success" : "warning";
  };

  const getStatusText = (status: string) => {
    return status === "presente" ? "Presente" : "Tardanza";
  };

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
        <div className="p-4">
          {/* Lista de asistencia */}
          <IonCard>
            <IonCardContent className="p-0">
              <div className="space-y-0">
                {allAttendance.map((record, index) => (
                  <IonItem
                    key={record.id}
                    className={
                      index < allAttendance.length - 1
                        ? "border-b border-gray-200"
                        : ""
                    }
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 text-base">
                        {record.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        ID: {record.identification}
                      </p>
                      <div className="flex items-center mt-1 space-x-3">
                        <span className="text-sm text-gray-500">
                          📅 {record.date}
                        </span>
                        <span className="text-sm text-gray-500">
                          🕐 {record.time}
                        </span>
                      </div>
                    </div>

                    <IonBadge
                      slot="end"
                      color={getStatusColor(record.status)}
                      className="ml-2"
                    >
                      {getStatusText(record.status)}
                    </IonBadge>
                  </IonItem>
                ))}
              </div>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
