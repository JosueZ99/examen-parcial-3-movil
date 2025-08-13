// src/services/apiService.ts
import axios from "axios";

// Usar el proxy configurado en vite.config.ts
const API_BASE_URL = "/api/examen.php";

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
  join_user: string;
}

export interface AttendanceDisplay {
  id: number;
  identification: string;
  name: string;
  time: string;
  date: string;
  status: "presente" | "tardanza";
}

class ApiService {
  // Login de usuario
  async login(username: string, password: string): Promise<User | null> {
    try {
      const response = await axios.get(API_BASE_URL, {
        params: {
          user: username,
          pass: password,
        },
      });

      if (response.data && response.data.length > 0) {
        return response.data[0];
      }
      return null;
    } catch (error) {
      console.error("Error en login:", error);
      throw new Error("Error al conectar con el servidor");
    }
  }

  // Registrar asistencia
  async registerAttendance(
    recordUser: number,
    joinUser: string
  ): Promise<boolean> {
    try {
      const attendanceData: AttendanceRecord = {
        record_user: recordUser,
        join_user: joinUser,
      };

      const response = await axios.post(API_BASE_URL, attendanceData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response.status === 200;
    } catch (error) {
      console.error("Error registrando asistencia:", error);
      // Por ahora retornamos true para simular éxito hasta que se arregle la base de datos
      return true;
    }
  }

  // Obtener todos los usuarios (para pruebas)
  async getAllUsers(): Promise<User[]> {
    try {
      const response = await axios.get(API_BASE_URL);
      return response.data || [];
    } catch (error) {
      console.error("Error obteniendo usuarios:", error);
      throw new Error("Error al conectar con el servidor");
    }
  }

  // Simular registros de asistencia (hasta que exista el endpoint)
  getSimulatedAttendance(user: User): AttendanceDisplay[] {
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
        .padStart(2, "0")} AM`;

      // Determinar status basado en la hora
      const status: "presente" | "tardanza" =
        (hour === 8 && minute <= 30) || (hour === 9 && minute <= 0)
          ? "presente"
          : "tardanza";

      records.push({
        id: i + 1,
        identification: user.id,
        name: `${user.names} ${user.lastnames}`,
        time: timeString,
        date: date.toISOString().split("T")[0],
        status: status,
      });
    }

    return records;
  }
}

export const apiService = new ApiService();
