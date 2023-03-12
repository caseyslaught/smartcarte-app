import React, { createContext, useEffect, useState } from "react";
import { Feature, Polygon, Properties } from "@turf/helpers";
import { v4 as uuidv4 } from "uuid";

import useLocalStorage from "../../../hooks/useLocalStorage";

export interface DemoStateType {
  /** form state **/

  formYear: number;
  setFormYear: (year: number) => void;

  formMonth: number;
  setFormMonth: (month: number) => void;

  formEmail: string;
  setFormEmail: (email: string) => void;

  formRegionPolygon: Feature<Polygon, Properties> | null;
  setFormRegionPolygon: (
    regionPolygon: Feature<Polygon, Properties> | null
  ) => void;

  formRegionArea: number | null;
  setFormRegionArea: (regionArea: number | null) => void;

  formClearRegionTime: number | null;
  setFormClearRegionTime: (clearRegionTime: number | null) => void;

  formTid: string;
  setFormTid: (tid: string) => void;

  formDrawEnabled: boolean;
  setFormDrawEnabled: (drawEnabled: boolean) => void;

  formSubmitting: boolean;
  setFormSubmitting: (submitting: boolean) => void;

  /** task state  **/

  taskUid: string | null;
  setTaskUid: (uid: string | null) => void;

  taskLoading: boolean;
  setTaskLoading: (loading: boolean) => void;

  taskFirstLoaded: boolean; // task has been loaded at least once
  setTaskFirstLoaded: (firstLoaded: boolean) => void;

  taskStatus: string | null;
  setTaskStatus: (status: string | null) => void;

  taskStatusMessage: string;
  setTaskStatusMessage: (statusMessage: string) => void;

  taskEmail: string;
  setTaskEmail: (email: string) => void;

  taskRegionPolygon: Feature<Polygon, Properties> | null;
  setTaskRegionPolygon: (
    regionGeojson: Feature<Polygon, Properties> | null
  ) => void;

  taskRegionArea: number | null;
  setTaskRegionArea: (regionArea: number | null) => void;
}

export const DemoStateContext = createContext<DemoStateType>(
  {} as DemoStateType
);

interface Props {
  children: React.ReactNode;
}

export const DemoStateProvider: React.FC<Props> = ({ children }) => {
  const [formYear, setFormYear] = useState<number>(2023);
  const [formMonth, setFormMonth] = useState<number>(1);
  const [formEmail, setFormEmail] = useState<string>("");
  const [formRegionPolygon, setFormRegionPolygon] = useState<Feature<
    Polygon,
    Properties
  > | null>(null);
  const [formRegionArea, setFormRegionArea] = useState<number | null>(null);
  const [formClearRegionTime, setFormClearRegionTime] = useState<number | null>(
    null
  );
  const [formTid, setFormTid] = useLocalStorage("tid", uuidv4());
  const [formDrawEnabled, setFormDrawEnabled] = useState<boolean>(false);
  const [formSubmitting, setFormSubmitting] = useState<boolean>(false);

  const [taskUid, setTaskUid] = useState<string | null>(null);
  const [taskLoading, setTaskLoading] = useState<boolean>(false);
  const [taskFirstLoaded, setTaskFirstLoaded] = useState<boolean>(false);
  const [taskStatus, setTaskStatus] = useState<string | null>(null);
  const [taskStatusMessage, setTaskStatusMessage] = useState<string>("");
  const [taskEmail, setTaskEmail] = useState<string>("");
  const [taskRegionPolygon, setTaskRegionPolygon] = useState<Feature<
    Polygon,
    Properties
  > | null>(null);
  const [taskRegionArea, setTaskRegionArea] = useState<number | null>(null);

  // save a new tid to local storage
  useEffect(() => {
    setFormTid(formTid);
  }, [formTid, setFormTid]);

  const value = {
    formYear,
    setFormYear,
    formMonth,
    setFormMonth,
    formEmail,
    setFormEmail,
    formRegionPolygon,
    setFormRegionPolygon,
    formRegionArea,
    setFormRegionArea,
    formClearRegionTime,
    setFormClearRegionTime,
    formTid,
    setFormTid,
    formDrawEnabled,
    setFormDrawEnabled,
    formSubmitting,
    setFormSubmitting,
    taskUid,
    setTaskUid,
    taskLoading,
    setTaskLoading,
    taskFirstLoaded,
    setTaskFirstLoaded,
    taskStatus,
    setTaskStatus,
    taskStatusMessage,
    setTaskStatusMessage,
    taskEmail,
    setTaskEmail,
    taskRegionPolygon,
    setTaskRegionPolygon,
    taskRegionArea,
    setTaskRegionArea,
  };

  return (
    <DemoStateContext.Provider value={value}>
      {children}
    </DemoStateContext.Provider>
  );
};
