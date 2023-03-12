import React from "react";
import { Routes, Route } from "react-router-dom";

//import { AppProvider } from "./context/appContext";
import { AuthProvider } from "./context/authContext";

import { DemoStateProvider } from "./pages/Demo/context/demoStateContext";

import LayoutDemo from "./layouts/LayoutDemo";
import LayoutPublic from "./layouts/LayoutPublic";

import DemoPage from "./pages/Demo";
import HomePage from "./pages/Home";
import NotFoundPage from "./pages/NotFound";

// import LayoutApp from "./layouts/LayoutApp";
// import AppPage from "./pages/App";
// import LoginPage from "./pages/Login";
// import RegisterPage from "./pages/Register";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <DemoStateProvider>
        <Routes>
          <Route element={<LayoutPublic />}>
            <Route index element={<HomePage />} />
            {/* <Route path="login" element={<LoginPage />} /> */}
            {/* <Route path="register" element={<RegisterPage />} /> */}
            <Route path="*" element={<NotFoundPage />} />
          </Route>

          <Route element={<LayoutDemo />}>
            <Route path="demo" element={<DemoPage />} />
            <Route path="demo/:taskUid" element={<DemoPage />} />
          </Route>

          {/*}
          <AppProvider>
            <Route element={<LayoutApp />}>
              <Route path="app" element={<AppPage />} />
            </Route>
          </AppProvider>
          */}
        </Routes>
      </DemoStateProvider>
    </AuthProvider>
  );
};

export default App;
