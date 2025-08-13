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
import Tab2 from "../pages/Tab2";
import Tab3 from "../pages/Tab3";

const TabsLayout: React.FC = () => (
  <IonTabs>
    <IonRouterOutlet>
      <Route exact path="/tabs/tab2">
        <Tab2 />
      </Route>
      <Route exact path="/tabs/tab3">
        <Tab3 />
      </Route>
      <Route exact path="/tabs">
        <Redirect to="/tabs/tab2" />
      </Route>
    </IonRouterOutlet>

    <IonTabBar slot="bottom">
      <IonTabButton tab="tab2" href="/tabs/tab2">
        <IonIcon icon={checkboxOutline} />
        <IonLabel>Validación</IonLabel>
      </IonTabButton>
      <IonTabButton tab="tab3" href="/tabs/tab3">
        <IonIcon icon={listOutline} />
        <IonLabel>Registros</IonLabel>
      </IonTabButton>
    </IonTabBar>
  </IonTabs>
);

export default TabsLayout;
