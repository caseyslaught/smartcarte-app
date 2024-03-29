import { useEffect } from "react";
import { polygon } from "@turf/helpers";
import area from "@turf/area";
import { useNavigate } from "react-router-dom";

import { PublicAPI } from "../../../api";
import useDemo from "./useDemo";

interface Props {
  taskUid: string | null;
  paramTaskUid: string | undefined;
}

const useTask = ({ taskUid, paramTaskUid }: Props) => {
  const navigate = useNavigate();
  const {
    clearTaskState,
    setTaskUid,
    setTaskLoading,
    setTaskFirstLoaded,
    setTaskType,
    setTaskSlug,
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
    setTaskRgbHref,
  } = useDemo();

  /*
  useEffect(() => {
    if (!taskUid) {
      clearTaskState();
    }
  }, [taskUid, clearTaskState]);
  */

  useEffect(() => {
    const fetchTask = async () => {
      console.log("fetching task", taskUid);

      try {
        setTaskLoading(true);
        const res = await PublicAPI.get(
          "tasks/get_demo_classification_task/" + taskUid
        );

        if (res.status === 200) {
          const task = res.data;
          setTaskType(task.type);
          setTaskSlug(task.slug);
          setTaskEmail(task.email);
          setTaskStatus(task.status);
          setTaskStatusMessage(task.status_message);
          setTaskStatusLongMessage(task.status_long_message);
          setTaskDate(new Date(task.date));
          setTaskImageryHref(task.imagery_tif_href);
          setTaskImageryTilesHref(task.imagery_tiles_href);
          setTaskClassificationHref(task.landcover_tif_href);
          setTaskClassificationTilesHref(task.landcover_tiles_href);
          setTaskRgbHref(task.rgb_tif_href);
          setTaskStatistics(task.statistics_json);

          const regionPolygon = polygon(
            task.region_geojson.geometry.coordinates
          );
          const regionArea = Math.round(area(regionPolygon) / 1000000);
          setTaskRegionPolygon(regionPolygon);
          setTaskRegionArea(regionArea);
          setTaskFirstLoaded(true);
        }
      } catch (error: any) {
        console.log(error);
        if (error.code === "ERR_NETWORK") {
          console.log("network error");
        } else if (error.code === "ERR_BAD_REQUEST") {
          console.log("task not found");
          clearTaskState();
          navigate("/demo", { replace: true });
        } else if (error.response?.status === 500) {
          console.log("server error");
        }
      } finally {
        setTaskLoading(false);
      }
    };

    // need paramTaskUid for case where navigating from /demo/:taskUid to /demo
    if (taskUid && paramTaskUid) {
      fetchTask();
      const intervalId = setInterval(() => {
        fetchTask();
      }, 10000);

      return () => {
        console.log("clearing interval");
        clearTaskState();
        clearInterval(intervalId);
      };
    } else {
      clearTaskState();
    }
  }, [
    clearTaskState,
    taskUid,
    paramTaskUid,
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
    setTaskSlug,
    setTaskStatistics,
    setTaskImageryHref,
    setTaskImageryTilesHref,
    setTaskClassificationHref,
    setTaskClassificationTilesHref,
    setTaskRgbHref,
    navigate,
  ]);

  return [];
};

export default useTask;
