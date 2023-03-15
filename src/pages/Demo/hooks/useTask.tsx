import { useEffect } from "react";
import { polygon } from "@turf/helpers";
import area from "@turf/area";
import { useNavigate } from "react-router-dom";

import { PublicAPI } from "../../../api";
import useDemo from "./useDemo";

interface Props {
  taskUid: string | null;
}

const useTask = ({ taskUid }: Props) => {
  const navigate = useNavigate();
  const {
    setTaskUid,
    setTaskLoading,
    setTaskFirstLoaded,
    setTaskType,
    setTaskDate,
    setTaskEmail,
    setTaskStatus,
    setTaskStatusMessage,
    setTaskStatusLongMessage,
    setTaskRegionArea,
    setTaskRegionPolygon,
    setTaskStatistics,
    setTaskImageryHref,
    setTaskImageryTilesHref,
    setTaskClassificationHref,
    setTaskClassificationTilesHref,
  } = useDemo();

  useEffect(() => {
    const fetchTask = async () => {
      console.log("fetching task");

      try {
        setTaskLoading(true);
        const res = await PublicAPI.get(
          "tasks/get_demo_classification_task/" + taskUid
        );

        if (res.status === 200) {
          const task = res.data;
          setTaskType(task.type);
          setTaskEmail(task.email);
          setTaskStatus(task.status);
          setTaskStatusMessage(task.status_message);
          setTaskStatusLongMessage(task.status_long_message);
          setTaskDate(new Date(task.date));
          setTaskImageryHref(task.imagery_tif_href);
          setTaskImageryTilesHref(task.imagery_tiles_href);
          setTaskClassificationHref(task.landcover_tif_href);
          setTaskClassificationTilesHref(task.landcover_tiles_href);

          const regionGeojsonObj = JSON.parse(task.region_geojson);
          const regionPolygon = polygon(regionGeojsonObj.geometry.coordinates);
          const regionArea = Math.round(area(regionPolygon) / 1000000);
          setTaskRegionPolygon(regionPolygon);
          setTaskRegionArea(regionArea);

          if (task.statistics_json !== "") {
            const taskStatisticsObj = JSON.parse(task.statistics_json);
            setTaskStatistics(taskStatisticsObj);
          }

          setTaskFirstLoaded(true);
        }
      } catch (error: any) {
        console.log(error);
        if (error.code === "ERR_NETWORK") {
          console.log("network error");
        } else if (error.code === "ERR_BAD_REQUEST") {
          console.log("task not found");
          setTaskUid(null); // reset important task state
          setTaskRegionPolygon(null);
          navigate("/demo", { replace: true });
        } else if (error.response?.status === 500) {
          console.log("server error");
        }
      } finally {
        setTaskLoading(false);
      }
    };

    if (taskUid) {
      fetchTask();
      const intervalId = setInterval(() => {
        fetchTask();
      }, 10000);

      return () => {
        console.log("clearing interval");
        clearInterval(intervalId);
      };
    }
  }, [
    taskUid,
    setTaskUid,
    setTaskLoading,
    setTaskFirstLoaded,
    setTaskStatus,
    setTaskStatusMessage,
    setTaskStatusLongMessage,
    setTaskEmail,
    setTaskRegionArea,
    setTaskRegionPolygon,
    setTaskDate,
    setTaskType,
    setTaskStatistics,
    setTaskImageryHref,
    setTaskImageryTilesHref,
    setTaskClassificationHref,
    setTaskClassificationTilesHref,
    navigate,
  ]);

  return [];
};

export default useTask;
