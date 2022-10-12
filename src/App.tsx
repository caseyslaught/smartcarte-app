import React from "react";
import { Routes, Route } from "react-router-dom";

import { AppProvider } from "./context/appContext";
import { AuthProvider } from "./context/authContext";

import LayoutApp from "./layouts/LayoutApp";
import LayoutPublic from "./layouts/LayoutPublic";

import AppPage from "./pages/App";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import NotFoundPage from "./pages/NotFound";
import RegisterPage from "./pages/Register";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppProvider>
        <Routes>
          <Route element={<LayoutPublic />}>
            <Route index element={<HomePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
          <Route element={<LayoutApp />}>
            <Route path="app" element={<AppPage />} />
          </Route>
        </Routes>
      </AppProvider>
    </AuthProvider>
  );
};

export default App;
