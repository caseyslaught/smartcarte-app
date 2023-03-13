import { useEffect } from "react";
import { polygon } from "@turf/helpers";
import area from "@turf/area";

import { PublicAPI } from "../../../api";
import useDemo from "./useDemo";

interface Props {
  taskUid: string | null;
}

const useTask = ({ taskUid }: Props) => {
  const {
    setTaskLoading,
    setTaskFirstLoaded,
    setTaskType,
    setTaskDate,
    setTaskEmail,
    setTaskStatus,
    setTaskStatusMessage,
    setTaskRegionArea,
    setTaskRegionPolygon,
  } = useDemo();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        setTaskLoading(true);
        setTaskStatus("loading");
        setTaskStatusMessage("Loading task");
        const res = await PublicAPI.get(
          "tasks/get_demo_classification_task/" + taskUid
        );

        if (res.status === 200) {
          // taskStatus === null means form, otherwise task
          // TODO: make sure setting task status
          const task = res.data;
          console.log(task); // email, status

          setTaskType(task.type);
          setTaskEmail(task.email);
          setTaskStatus(task.status);
          setTaskStatusMessage(task.status_message);
          setTaskDate(new Date(task.date));

          const regionGeojsonObj = JSON.parse(task.region_geojson);
          const regionPolygon = polygon(regionGeojsonObj.geometry.coordinates);
          setTaskRegionPolygon(regionPolygon);

          const regionArea = Math.round(area(regionPolygon) / 1000000);
          setTaskRegionArea(regionArea);
        }
      } catch (error: any) {
        console.log(error);
        if (error.code === "ERR_NETWORK") {
          console.log("network error");
        } else if (error.code === "ERR_BAD_REQUEST") {
          console.log("task not found");
        } else if (error.response.status === 500) {
          console.log("server error");
        }
      } finally {
        setTaskLoading(false);
        setTaskFirstLoaded(true);
      }
    };

    if (taskUid) fetchTask();
  }, [
    taskUid,
    setTaskLoading,
    setTaskFirstLoaded,
    setTaskStatus,
    setTaskStatusMessage,
    setTaskEmail,
    setTaskRegionArea,
    setTaskRegionPolygon,
    setTaskDate,
    setTaskType,
  ]);

  return [];
};

export default useTask;
