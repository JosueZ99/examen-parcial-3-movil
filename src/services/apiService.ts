// src/services/apiService.ts
import axios from "axios";

// Detectar si estamos en desarrollo o producción
const isDevelopment = import.meta.env.DEV;

// Usar proxy en desarrollo, URL completa en producción
const API_BASE_URL = isDevelopment
  ? "/api/examen.php"
  : "https://puce.estudioika.com/api/examen.php";

export interface User {
  record: number;
  id: string;
  lastnames: string;
  names: string;
  mail: string;
  phone: string;
  user: string;
}

export interface AttendanceRecord {
  record_user: number;
  join_user: number;
}

// Nueva interfaz para los registros que devuelve la API
export interface AttendanceResponse {
  record: number;
  date: string;
  time: string;
  join_date: string;
}

// Interfaz para mostrar en la UI
export interface AttendanceDisplay {
  id: number;
  time: string;
  date: string;
  status: "presente" | "tardanza";
  join_date: string;
}

class ApiService {
  // Login de usuario
  async login(username: string, password: string): Promise<User | null> {
    try {
      console.log(`Intentando login en: ${API_BASE_URL}`);

      const response = await axios.get(API_BASE_URL, {
        params: {
          user: username,
          pass: password,
        },
        timeout: 10000, // 10 segundos de timeout
      });

      console.log("Respuesta del servidor:", response.data);

      if (response.data && response.data.length > 0) {
        return response.data[0];
      }
      return null;
    } catch (error) {
      console.error("Error en login:", error);

      // Información más detallada del error
      if (axios.isAxiosError(error)) {
        if (error.code === "ECONNABORTED") {
          throw new Error(
            "Tiempo de espera agotado. Verifique su conexión a internet."
          );
        } else if (error.response) {
          throw new Error(`Error del servidor: ${error.response.status}`);
        } else if (error.request) {
          throw new Error(
            "No se pudo conectar con el servidor. Verifique su conexión a internet."
          );
        }
      }

      throw new Error("Error al conectar con el servidor");
    }
  }

  // Registrar asistencia - Ahora envía el record del usuario en ambos campos
  async registerAttendance(userRecord: number): Promise<boolean> {
    try {
      console.log(`Registrando asistencia en: ${API_BASE_URL}`);

      const attendanceData: AttendanceRecord = {
        record_user: userRecord,
        join_user: userRecord,
      };

      console.log("Datos enviados para registro:", attendanceData);

      const response = await axios.post(API_BASE_URL, attendanceData, {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 10000,
      });

      console.log("Respuesta registro asistencia:", response.data);
      return response.status === 200;
    } catch (error) {
      console.error("Error registrando asistencia:", error);

      if (axios.isAxiosError(error)) {
        if (error.response) {
          throw new Error(
            `Error del servidor: ${error.response.status} - ${
              error.response.data?.error || "Error desconocido"
            }`
          );
        } else if (error.request) {
          throw new Error(
            "No se pudo conectar con el servidor. Verifique su conexión a internet."
          );
        }
      }

      throw new Error("Error al registrar asistencia");
    }
  }

  // Obtener registros de asistencia del usuario
  async getAttendanceRecords(userRecord: number): Promise<AttendanceDisplay[]> {
    try {
      console.log(
        `Obteniendo registros de asistencia para record: ${userRecord}`
      );

      const response = await axios.get(API_BASE_URL, {
        params: {
          record: userRecord,
        },
        timeout: 10000,
      });

      console.log("Respuesta registros asistencia:", response.data);

      if (response.data && Array.isArray(response.data)) {
        return response.data
          .map((record: AttendanceResponse) => {
            // Determinar el status basado en la hora (asumiendo que antes de 9:00 AM es presente)
            const timeParts = record.time.split(":");
            const hour = parseInt(timeParts[0]);
            const minute = parseInt(timeParts[1]);

            // Considerar presente si es antes de 9:00 AM
            const status: "presente" | "tardanza" =
              hour < 9 || (hour === 9 && minute === 0)
                ? "presente"
                : "tardanza";

            return {
              id: record.record,
              time: record.time,
              date: record.date,
              status: status,
              join_date: record.join_date,
            };
          })
          .sort((a, b) => {
            // Ordenar por fecha y hora descendente (más reciente primero)
            return (
              new Date(b.join_date).getTime() - new Date(a.join_date).getTime()
            );
          });
      }

      return [];
    } catch (error) {
      console.error("Error obteniendo registros de asistencia:", error);

      if (axios.isAxiosError(error)) {
        if (error.response) {
          throw new Error(`Error del servidor: ${error.response.status}`);
        } else if (error.request) {
          throw new Error(
            "No se pudo conectar con el servidor. Verifique su conexión a internet."
          );
        }
      }

      throw new Error("Error al obtener registros de asistencia");
    }
  }

  // Obtener todos los usuarios (para pruebas)
  async getAllUsers(): Promise<User[]> {
    try {
      const response = await axios.get(API_BASE_URL, {
        timeout: 10000,
      });
      return response.data || [];
    } catch (error) {
      console.error("Error obteniendo usuarios:", error);
      throw new Error("Error al conectar con el servidor");
    }
  }

  // Mantener método simulado como respaldo
  getSimulatedAttendance(): AttendanceDisplay[] {
    const records: AttendanceDisplay[] = [];
    const today = new Date();

    // Generar 8 registros simulados
    for (let i = 0; i < 8; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);

      // Simular horarios aleatorios entre 8:00 y 9:30
      const hour = Math.random() < 0.7 ? 8 : 9;
      const minute = Math.floor(Math.random() * 60);
      const timeString = `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}:00`;

      // Determinar status basado en la hora
      const status: "presente" | "tardanza" =
        (hour === 8 && minute <= 30) || (hour === 9 && minute <= 0)
          ? "presente"
          : "tardanza";

      records.push({
        id: i + 1,
        time: timeString,
        date: date.toISOString().split("T")[0],
        status: status,
        join_date: `${date.toISOString().split("T")[0]} ${timeString}`,
      });
    }

    return records;
  }
}

export const apiService = new ApiService();
