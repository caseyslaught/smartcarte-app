import React, { createContext, useEffect, useState } from "react";
import { Feature, Polygon, Properties } from "@turf/helpers";
import { v4 as uuidv4 } from "uuid";

import useLocalStorage from "../../../hooks/useLocalStorage";

export enum DemoTaskTypes {
  ForestChangeDetection = "Forest Change Detection",
  LandcoverClassification = "Landcover Classification",
}

export interface DemoType {
  year: number;
  setYear: (year: number) => void;

  month: number;
  setMonth: (month: number) => void;

  email: string;
  setEmail: (email: string) => void;

  regionGeojson: Feature<Polygon, Properties> | null;
  setRegionGeojson: (
    regionGeojson: Feature<Polygon, Properties> | null
  ) => void;

  // flag for clearing the Mapbox drawings
  clearRegionTime: number | null;
  setClearRegionTime: (clearRegionTime: number | null) => void;

  taskType: DemoTaskTypes;
  setTaskType: (taskType: DemoTaskTypes) => void;

  tid: string;
  setTid: (tid: string) => void;

  // whether drawing mode for region is enabled
  drawEnabled: boolean;
  setDrawEnabled: (drawEnabled: boolean) => void;
}

export const DemoContext = createContext<DemoType>({} as DemoType);

interface Props {
  children: React.ReactNode;
}

export const DemoProvider: React.FC<Props> = ({ children }) => {
  const [drawEnabled, setDrawEnabled] = useState<boolean>(false);
  const [year, setYear] = useState<number>(2023);
  const [month, setMonth] = useState<number>(2);
  const [email, setEmail] = useState<string>("");
  const [regionGeojson, setRegionGeojson] = useState<Feature<
    Polygon,
    Properties
  > | null>(null);
  const [clearRegionTime, setClearRegionTime] = useState<number | null>(null);
  const [taskType, setTaskType] = useState<DemoTaskTypes>(
    DemoTaskTypes.LandcoverClassification
  );
  const [tid, setTid] = useLocalStorage("tid", uuidv4());

  // save a new tid
  useEffect(() => {
    setTid(tid);
  }, [tid, setTid]);

  const value = {
    drawEnabled,
    setDrawEnabled,
    year,
    setYear,
    month,
    setMonth,
    email,
    setEmail,
    regionGeojson,
    setRegionGeojson,
    clearRegionTime,
    setClearRegionTime,
    taskType,
    setTaskType,
    tid,
    setTid,
  };

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
};
