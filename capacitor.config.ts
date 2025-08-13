import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "io.ionic.starter",
  appName: "ExamenParcial3Movil",
  webDir: "dist",
  server: {
    // Permitir requests externos
    allowNavigation: ["https://puce.estudioika.com"],
  },
  plugins: {
    CapacitorHttp: {
      enabled: true,
    },
  },
};

export default config;
