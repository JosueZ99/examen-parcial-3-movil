// src/components/TabsLayout.tsx
import { Redirect, Route } from "react-router-dom";
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
import Tab2 from "../pages/Tab2";
import Tab3 from "../pages/Tab3";

const TabsLayout: React.FC = () => (
  <ProtectedRoute>
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/tab2">
          <Tab2 />
        </Route>
        <Route exact path="/tab3">
          <Tab3 />
        </Route>
        <Route exact path="/tabs">
          <Redirect to="/tab2" />
        </Route>
      </IonRouterOutlet>

      <IonTabBar slot="bottom">
        <IonTabButton tab="tab2" href="/tab2">
          <IonIcon icon={checkboxOutline} />
          <IonLabel>Validación</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab3" href="/tab3">
          <IonIcon icon={listOutline} />
          <IonLabel>Registros</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  </ProtectedRoute>
);

export default TabsLayout;