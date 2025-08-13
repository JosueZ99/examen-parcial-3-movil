// src/App.tsx
import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { UserProvider } from "./contexts/UserContext";
import Tab1 from "./pages/Tab1";
import TabsLayout from "./components/TabsLayout";
import "@ionic/react/css/core.css";
import "./globals.css";

/* Theme variables */
import "./theme/variables.css";

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <UserProvider>
      <IonReactRouter>
        <IonRouterOutlet>
          {/* Página de login sin tabs */}
          <Route exact path="/tab1">
            <Tab1 />
          </Route>

          {/* Páginas con tabs */}
          <Route path="/tabs">
            <TabsLayout />
          </Route>

          {/* Redirección inicial */}
          <Route exact path="/">
            <Redirect to="/tab1" />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </UserProvider>
  </IonApp>
);

export default App;
