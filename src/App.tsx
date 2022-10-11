import React from "react";
import { Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/authContext";

import LayoutPrivate from "./layouts/LayoutPrivate";
import LayoutPublic from "./layouts/LayoutPublic";

import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import MapPage from "./pages/Map";
import NotFoundPage from "./pages/NotFound";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<LayoutPublic />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        <Route element={<LayoutPrivate />}>
          <Route path="dashboard" element={<MapPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default App;
