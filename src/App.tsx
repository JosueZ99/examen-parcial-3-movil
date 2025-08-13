// src/App.tsx
import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { UserProvider } from "./contexts/UserContext";
import { useStatusBar } from "./hooks/useStatusBar";
import Login from "./pages/Login";
import TabsLayout from "./components/TabsLayout";
import "@ionic/react/css/core.css";
import "./globals.css";

/* Theme variables */
import "./theme/variables.css";

setupIonicReact();

const App: React.FC = () => {
  useStatusBar();

  return (
    <IonApp>
      <UserProvider>
        <IonReactRouter>
          <IonRouterOutlet>
            {/* Página de login sin tabs */}
            <Route exact path="/login">
              <Login />
            </Route>

            {/* Páginas con tabs */}
            <Route path="/validacion">
              <TabsLayout />
            </Route>
            <Route path="/registro">
              <TabsLayout />
            </Route>

            {/* Redirección inicial */}
            <Route exact path="/">
              <Redirect to="/login" />
            </Route>
          </IonRouterOutlet>
        </IonReactRouter>
      </UserProvider>
    </IonApp>
  );
};

export default App;
