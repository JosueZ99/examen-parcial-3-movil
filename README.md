# 📱 Sistema de Registro de Asistencia Móvil

Aplicación móvil desarrollada con **Ionic React** para el registro y seguimiento de asistencia de estudiantes, implementada como parte del Examen Parcial 3 - Desarrollo Móvil.

## 🚀 Características

- **Autenticación de usuarios** con API REST
- **Validación de identidad** mediante dígitos de identificación
- **Registro automático de asistencia** con fecha y hora
- **Historial completo** de registros de asistencia
- **Lógica específica** de puntualidad por día de clase:
  - **Miércoles**: hasta 5:00 PM
  - **Sábado**: hasta 8:00 AM
- **Estadísticas** de puntualidad y asistencia

## 🛠️ Tecnologías

- **Frontend**: Ionic 8 + React 19 + TypeScript
- **Estilos**: Tailwind CSS
- **HTTP Client**: Axios
- **Backend**: API REST en PHP
- **Base de Datos**: MySQL

## 📱 Uso

1. **Login**: Ingresar credenciales de usuario
2. **Validación**: Completar los dígitos solicitados de la identificación
3. **Registro**: La asistencia se registra automáticamente
4. **Historial**: Revisar registros anteriores y estadísticas

## 🔗 API Endpoints

- **GET** `/api/examen.php?user=X&pass=Y` - Autenticación
- **GET** `/api/examen.php?record=X` - Obtener registros de asistencia
- **POST** `/api/examen.php` - Registrar nueva asistencia

## 👨‍💻 Autor

**Josué Zambrano**  
Desarrollo Móvil - PUCE  
2025
