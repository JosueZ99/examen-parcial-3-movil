// src/hooks/useStatusBar.ts
import { useEffect } from "react";
import { StatusBar, Style } from "@capacitor/status-bar";
import { Capacitor } from "@capacitor/core";

export const useStatusBar = () => {
  useEffect(() => {
    const configureStatusBar = async () => {
      if (Capacitor.isNativePlatform()) {
        try {
          // Mostrar la status bar
          await StatusBar.show();

          // Configurar el estilo (texto oscuro para fondos claros)
          await StatusBar.setStyle({ style: Style.Light });

          // Configurar el color de fondo (opcional)
          await StatusBar.setBackgroundColor({ color: "#ffffff" });

          // Hacer que el contenido no se superponga con la status bar
          await StatusBar.setOverlaysWebView({ overlay: false });
        } catch (error) {
          console.error("Error configurando StatusBar:", error);
        }
      }
    };

    configureStatusBar();
  }, []);
};
