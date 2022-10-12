import React, { createContext, useState } from "react";

import { AppOptions, AppType } from "../types/appTypes";

export const AppContext = createContext<AppType>({} as AppType);

interface Props {
  children: React.ReactNode;
}

export const AppProvider: React.FC<Props> = ({ children }) => {
  const [currentApp, setCurrentApp] = useState<AppOptions>(AppOptions.Forest);

  const value = {
    currentApp,
    setCurrentApp,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
