import React, { createContext, useCallback, useEffect, useState } from "react";
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

  formWaitlistChecked: boolean;
  setFormWaitlistChecked: (waitlistChecked: boolean) => void;

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

  taskFirstFlyTo: boolean; // map has flown to ROI at least once
  setTaskFirstFlyTo: (firstFlyTo: boolean) => void;

  taskType: string;
  setTaskType: (type: string) => void;

  taskStatus: string | null;
  setTaskStatus: (status: string | null) => void;

  taskStatusMessage: string;
  setTaskStatusMessage: (statusMessage: string) => void;

  taskStatusLongMessage: string;
  setTaskStatusLongMessage: (statusLongMessage: string) => void;

  taskDate: Date | null;
  setTaskDate: (date: Date | null) => void;

  taskEmail: string;
  setTaskEmail: (email: string) => void;

  taskRegionPolygon: Feature<Polygon, Properties> | null;
  setTaskRegionPolygon: (
    regionGeojson: Feature<Polygon, Properties> | null
  ) => void;

  taskRegionArea: number | null;
  setTaskRegionArea: (regionArea: number | null) => void;

  taskStatistics: any;
  setTaskStatistics: (statistics: any) => void;

  taskImageryHref: string | null;
  setTaskImageryHref: (imageryHref: string | null) => void;

  taskImageryTilesHref: string | null;
  setTaskImageryTilesHref: (imageryTilesHref: string | null) => void;

  taskClassificationHref: string | null;
  setTaskClassificationHref: (classificationHref: string | null) => void;

  taskClassificationTilesHref: string | null;
  setTaskClassificationTilesHref: (
    classificationTilesHref: string | null
  ) => void;

  clearFormState: () => void;
  clearTaskState: () => void;
}

export const DemoStateContext = createContext<DemoStateType>(
  {} as DemoStateType
);

interface Props {
  children: React.ReactNode;
}

const now = new Date();
const DEFAULT_FORM_YEAR = now.getFullYear();
const DEFAULT_FORM_MONTH = now.getMonth();
const DEFAULT_TASK_STATUS = "loading";
const DEFAULT_TASK_STATUS_MESSAGE = "Loading task";

export const DemoStateProvider: React.FC<Props> = ({ children }) => {
  const [formYear, setFormYear] = useState<number>(DEFAULT_FORM_YEAR);
  const [formMonth, setFormMonth] = useState<number>(DEFAULT_FORM_MONTH);
  const [formEmail, setFormEmail] = useState<string>("");
  const [formWaitlistChecked, setFormWaitlistChecked] = useState<boolean>(true);
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
  const [taskFirstFlyTo, setTaskFirstFlyTo] = useState<boolean>(false);
  const [taskStatus, setTaskStatus] = useState<string | null>(
    DEFAULT_TASK_STATUS
  );
  const [taskStatusMessage, setTaskStatusMessage] = useState<string>(
    DEFAULT_TASK_STATUS_MESSAGE
  );
  const [taskStatusLongMessage, setTaskStatusLongMessage] =
    useState<string>("");
  const [taskType, setTaskType] = useState<string>("");
  const [taskDate, setTaskDate] = useState<Date | null>(null);
  const [taskEmail, setTaskEmail] = useState<string>("");
  const [taskRegionPolygon, setTaskRegionPolygon] = useState<Feature<
    Polygon,
    Properties
  > | null>(null);
  const [taskRegionArea, setTaskRegionArea] = useState<number | null>(null);
  const [taskStatistics, setTaskStatistics] = useState<any>(null);
  const [taskImageryHref, setTaskImageryHref] = useState<string | null>(null);
  const [taskImageryTilesHref, setTaskImageryTilesHref] = useState<
    string | null
  >(null);
  const [taskClassificationHref, setTaskClassificationHref] = useState<
    string | null
  >(null);
  const [taskClassificationTilesHref, setTaskClassificationTilesHref] =
    useState<string | null>(null);

  // save a new tid to local storage
  useEffect(() => {
    setFormTid(formTid);
  }, [formTid, setFormTid]);

  const clearFormState = useCallback(() => {
    console.log("clearing form state");
    setFormYear(DEFAULT_FORM_YEAR);
    setFormMonth(DEFAULT_FORM_MONTH);
    setFormEmail("");
    setFormWaitlistChecked(true);
    setFormRegionPolygon(null);
    setFormRegionArea(null);
    setFormClearRegionTime(null);
    setFormDrawEnabled(false);
    setFormSubmitting(false);
  }, []);

  const clearTaskState = useCallback(() => {
    console.log("clearing task state");
    setTaskUid(null);
    setTaskLoading(false);
    setTaskFirstLoaded(false);
    setTaskFirstFlyTo(false);
    setTaskStatus(DEFAULT_TASK_STATUS);
    setTaskStatusMessage(DEFAULT_TASK_STATUS_MESSAGE);
    setTaskStatusLongMessage("");
    setTaskType("");
    setTaskDate(null);
    setTaskEmail("");
    setTaskRegionPolygon(null);
    setTaskRegionArea(null);
    setTaskStatistics(null);
    setTaskImageryHref(null);
    setTaskImageryTilesHref(null);
    setTaskClassificationHref(null);
    setTaskClassificationTilesHref(null);
  }, []);

  const value = {
    clearFormState,
    clearTaskState,
    formYear,
    setFormYear,
    formMonth,
    setFormMonth,
    formEmail,
    setFormEmail,
    formWaitlistChecked,
    setFormWaitlistChecked,
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
    taskFirstFlyTo,
    setTaskFirstFlyTo,
    taskType,
    setTaskType,
    taskStatus,
    setTaskStatus,
    taskStatusMessage,
    setTaskStatusMessage,
    taskStatusLongMessage,
    setTaskStatusLongMessage,
    taskDate,
    setTaskDate,
    taskEmail,
    setTaskEmail,
    taskRegionPolygon,
    setTaskRegionPolygon,
    taskRegionArea,
    setTaskRegionArea,
    taskStatistics,
    setTaskStatistics,
    taskImageryHref,
    setTaskImageryHref,
    taskImageryTilesHref,
    setTaskImageryTilesHref,
    taskClassificationHref,
    setTaskClassificationHref,
    taskClassificationTilesHref,
    setTaskClassificationTilesHref,
  };

  return (
    <DemoStateContext.Provider value={value}>
      {children}
    </DemoStateContext.Provider>
  );
};
