/* eslint import/no-webpack-loader-syntax: off */
import React, {
  useRef,
  MutableRefObject,
  useCallback,
  useEffect,
  useState,
} from "react";
import mapboxgl, { LngLat, Map } from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import { Box, IconButton } from "@chakra-ui/react";
import { polygon } from "@turf/helpers";
import area from "@turf/area";
import centroid from "@turf/centroid";
import { FiEye, FiEyeOff } from "react-icons/fi";

import useLocalStorage from "../../../../hooks/useLocalStorage";
import useDemo from "../../hooks/useDemo";
import drawStyles from "./drawStyles";

const StaticMode = require("@mapbox/mapbox-gl-draw-static-mode");
const DrawRectangle = require("mapbox-gl-draw-rectangle-restrict-area").default;

// @ts-ignore
mapboxgl.workerClass =
  require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;
mapboxgl.accessToken = MAPBOX_TOKEN || "";

interface Props {
  isMobile: boolean;
  isSidebarExpanded: boolean;
}

const IMAGERY_SOURCE = "imagery-source";
const IMAGERY_LAYER = "imagery-layer";

const DemoMap: React.FC<Props> = ({ isMobile, isSidebarExpanded }) => {
  const [showTiles, setShowTiles] = useState(true);
  const prevImageryTilesHref = useRef<string | null>(null);
  const regionLayerId = useRef<string>("");
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<Map>(null) as MutableRefObject<Map>;
  const draw = useRef<MapboxDraw>(null) as MutableRefObject<MapboxDraw>;
  const [lat, setLat] = useLocalStorage("lat", -0.72);
  const [lng, setLng] = useLocalStorage("lng", 29.38);
  const [zoom, setZoom] = useLocalStorage("zoom", 4);

  const {
    formDrawEnabled,
    setFormDrawEnabled,
    setFormRegionArea,
    formRegionPolygon,
    setFormRegionPolygon,
    formClearRegionTime,
    taskFirstFlyTo,
    setTaskFirstFlyTo,
    taskRegionPolygon,
    setTaskRegionArea,
    taskImageryTilesHref,
    taskStatus,
  } = useDemo();

  const addMapTiles = useCallback((tilesHref: string) => {
    map.current.addSource(IMAGERY_SOURCE, {
      scheme: "tms",
      type: "raster",
      tiles: [tilesHref],
      tileSize: 256,
    });

    map.current.addLayer(
      {
        id: IMAGERY_LAYER,
        type: "raster",
        source: IMAGERY_SOURCE,
        paint: {
          "raster-opacity": 1.0,
        },
      },
      "tunnel-minor-case"
    );
  }, []);

  const removeMapTiles = useCallback(() => {
    if (map.current.getLayer(IMAGERY_LAYER))
      map.current.removeLayer(IMAGERY_LAYER);

    if (map.current.getSource(IMAGERY_SOURCE))
      map.current.removeSource(IMAGERY_SOURCE);
  }, []);

  useEffect(() => {
    if (map.current) {
      if (
        taskImageryTilesHref &&
        prevImageryTilesHref.current !== taskImageryTilesHref
      ) {
        console.log("updating map tiles");
        removeMapTiles();
        if (taskImageryTilesHref) addMapTiles(taskImageryTilesHref);
        prevImageryTilesHref.current = taskImageryTilesHref;
      }
    }
  }, [taskImageryTilesHref, addMapTiles, removeMapTiles]);

  useEffect(() => {
    if (map.current || !mapContainer.current) return;
    map.current = new mapboxgl.Map({
      attributionControl: false,
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/satellite-streets-v12",
      center: [lng, lat],
      projection: { name: "globe" },
      zoom: zoom,
      minZoom: 2.4,
      maxZoom: 14,
      dragRotate: false,
      pitchWithRotate: false,
    });

    map.current.on("load", () => {});

    map.current.on("moveend", () => {
      const center = map.current.getCenter();
      setZoom(map.current.getZoom());
      setLat(center.lat);
      setLng(center.lng);
    });

    map.current.dragRotate.disable();
    map.current.touchPitch.disable();
    map.current.touchZoomRotate.disableRotation();

    const modes: any = MapboxDraw.modes;
    modes.draw_rectangle = DrawRectangle;
    modes.static = StaticMode;

    draw.current = new MapboxDraw({
      userProperties: true,
      displayControlsDefault: false,
      styles: drawStyles,
      modes: modes,
    });

    map.current.addControl(draw.current, "top-left");
    draw.current.changeMode("static");

    map.current.on("draw.create", function (feature) {
      const polygonObj = polygon(feature.features[0].geometry.coordinates);
      setFormRegionPolygon(polygonObj);
      setFormDrawEnabled(false);
    });

    // add geoJson if it exists from previous session
    if (formRegionPolygon) {
      draw.current.add(formRegionPolygon);
    }
  });

  useEffect(() => {
    if (formDrawEnabled) {
      draw.current.changeMode("draw_rectangle", {
        areaLimit: 5000 * 1_000_000, // 5000 km
        escapeKeyStopsDrawing: true,
        allowCreateExceeded: false,
        exceedCallsOnEachMove: false,
        exceedCallback: (area: number) => {},
        areaChangedCallback: (area: number) => {
          setFormRegionArea(Math.round(area / 1_000_000));
        },
      });

      // drawing complete or escape key pressed
      map.current.on("draw.modechange", function ({ mode }) {
        if (mode === "simple_select") setFormDrawEnabled(false);
      });
    } else {
      draw.current.changeMode("static");
      // if escape key pressed then clear the region area
      if (!formRegionPolygon) setFormRegionArea(null);
    }
  }, [
    formDrawEnabled,
    setFormDrawEnabled,
    setFormRegionArea,
    formRegionPolygon,
  ]);

  // clear drawings
  useEffect(() => {
    if (formClearRegionTime) draw.current.deleteAll();
  }, [formClearRegionTime]);

  // draw task region polygon or remove polygon and tiles
  useEffect(() => {
    if (taskRegionPolygon) {
      if (regionLayerId.current === "") {
        const drawIds = draw.current.add(taskRegionPolygon);
        console.log("drawId", drawIds[0]);
        regionLayerId.current = drawIds[0];
        const regionArea = area(taskRegionPolygon);
        setTaskRegionArea(Math.round(regionArea / 1_000_000));
      }
    } else {
      removeMapTiles();
      draw.current.deleteAll();
    }
  }, [taskRegionPolygon, setTaskRegionArea, removeMapTiles]);

  // fly to centroid of region only once
  useEffect(() => {
    if (taskStatus && taskRegionPolygon && !taskFirstFlyTo) {
      const regionCentroid = centroid(taskRegionPolygon);
      const coords = regionCentroid.geometry.coordinates;
      const center = new LngLat(coords[0], coords[1]);
      map.current.flyTo({
        center: center,
        zoom: 9,
      });

      setTaskFirstFlyTo(true);
    }
  }, [
    taskStatus,
    taskRegionPolygon,
    setTaskRegionArea,
    taskFirstFlyTo,
    setTaskFirstFlyTo,
  ]);

  const toggleShowTiles = () => {
    const tilesVisibility =
      !showTiles && taskImageryTilesHref ? "visible" : "none";
    map.current.setLayoutProperty(IMAGERY_LAYER, "visibility", tilesVisibility);
    setShowTiles(!showTiles);
  };

  const isEyeInvisible = isMobile && isSidebarExpanded;

  return (
    <>
      {taskImageryTilesHref && (
        <IconButton
          zIndex={888}
          display={isEyeInvisible ? "none" : "inherit"}
          position="absolute"
          top="50px"
          left="10px"
          bg="offWhite"
          color="demoDark"
          fontSize="1.7em"
          aria-label="Toggle map tiles"
          icon={showTiles ? <FiEye /> : <FiEyeOff />}
          size="lg"
          onClick={toggleShowTiles}
        />
      )}
      <Box ref={mapContainer} h="100%" w="100%" position="relative"></Box>
    </>
  );
};

export default DemoMap;
