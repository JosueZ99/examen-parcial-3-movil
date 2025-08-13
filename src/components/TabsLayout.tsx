// src/components/TabsLayout.tsx
import { Redirect, Route, useLocation } from "react-router-dom";
import {
  IonRouterOutlet,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
} from "@ionic/react";
import { checkboxOutline, listOutline } from "ionicons/icons";
import ProtectedRoute from "./ProtectedRoute";
import Validacion from "../pages/Validacion";
import Registro from "../pages/Registro";

const TabsLayout: React.FC = () => {
  const location = useLocation();

  return (
    <ProtectedRoute>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/validacion">
            <Validacion />
          </Route>
          <Route exact path="/registro">
            <Registro />
          </Route>
          {/* Redirección por defecto si alguien accede a una ruta no válida */}
          <Route exact path="/">
            <Redirect to="/validacion" />
          </Route>
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
          <IonTabButton
            tab="validacion"
            href="/validacion"
            className={
              location.pathname === "/validacion" ? "tab-selected" : ""
            }
          >
            <IonIcon icon={checkboxOutline} />
            <IonLabel>Validación</IonLabel>
          </IonTabButton>
          <IonTabButton
            tab="registro"
            href="/registro"
            className={location.pathname === "/registro" ? "tab-selected" : ""}
          >
            <IonIcon icon={listOutline} />
            <IonLabel>Registros</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </ProtectedRoute>
  );
};

export default TabsLayout;
