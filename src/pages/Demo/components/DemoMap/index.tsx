/* eslint import/no-webpack-loader-syntax: off */
import React, {
  useRef,
  MutableRefObject,
  useCallback,
  useEffect,
  useState,
} from "react";
import mapboxgl, { Control, LngLat, Map } from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import { Box, Button } from "@chakra-ui/react";
import { polygon } from "@turf/helpers";
import area from "@turf/area";
import centroid from "@turf/centroid";
import { FiEye, FiEyeOff } from "react-icons/fi";

import useLocalStorage from "../../../../hooks/useLocalStorage";
import useDemo from "../../hooks/useDemo";
import drawStyles from "./drawStyles";

const StaticMode = require("@mapbox/mapbox-gl-draw-static-mode");
const DrawRectangle = require("mapbox-gl-draw-rectangle-restrict-area").default;

// constants
const MAX_ZOOM = 22;

// @ts-ignore
mapboxgl.workerClass =
  require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;
mapboxgl.accessToken = MAPBOX_TOKEN || "";

interface Props {
  isMobile: boolean;
  isSidebarExpanded: boolean;
}

const CLASSIFICATION_SOURCE = "classification-source";
const CLASSIFICATION_LAYER = "classification-layer";

const DRONE_SOURCE = "drone-source";
const DRONE_LAYER = "drone-layer";

const IMAGERY_SOURCE = "imagery-source";
const IMAGERY_LAYER = "imagery-layer";

const DemoMap: React.FC<Props> = ({ isMobile, isSidebarExpanded }) => {
  const [showImageryTiles, setShowImageryTiles] = useState(true);
  const [showClassificationTiles, setShowClassificationTiles] = useState(false);
  const prevImageryTilesHref = useRef<string | null>(null);
  const prevClassificationTilesHref = useRef<string | null>(null);
  const regionLayerId = useRef<string>("");
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<Map>(null) as MutableRefObject<Map>;
  const draw = useRef<MapboxDraw>(null) as MutableRefObject<MapboxDraw>;
  const geocoder = useRef<Control>(null) as MutableRefObject<Control>;
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
    taskClassificationTilesHref,
    taskImageryTilesHref,
    taskStatus,
    taskSlug,
  } = useDemo();

  const addDroneTiles = useCallback(() => {
    // drone
    map.current.addSource("drone-source", {
      scheme: "tms",
      type: "raster",
      tiles: [
        "https://data.smartcarte.earth/orthomosaics/kinyonzo_hippos_tiles/{z}/{x}/{y}.png",
      ],
      tileSize: 256,
    });

    map.current.addLayer(
      {
        id: "drone-layer",
        type: "raster",
        source: "drone-source",
        paint: {
          "raster-opacity": 1.0,
        },
      },
      "tunnel-minor-case"
    );
  }, []);

  const addImageryTiles = useCallback((tilesHref: string) => {
    // imagery
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

  const addClassificationTiles = useCallback((tilesHref: string) => {
    // classification
    map.current.addSource(CLASSIFICATION_SOURCE, {
      scheme: "tms",
      type: "raster",
      tiles: [tilesHref],
      tileSize: 256,
    });

    map.current.addLayer(
      {
        id: CLASSIFICATION_LAYER,
        type: "raster",
        source: CLASSIFICATION_SOURCE,
        paint: {
          "raster-opacity": 0.5,
        },
      },
      "tunnel-minor-case"
    );

    // hidden by default at first
    map.current.setLayoutProperty(CLASSIFICATION_LAYER, "visibility", "none");
  }, []);

  const removeDroneTiles = useCallback(() => {
    if (map.current.getLayer(DRONE_LAYER)) map.current.removeLayer(DRONE_LAYER);
    if (map.current.getSource(DRONE_SOURCE))
      map.current.removeSource(DRONE_SOURCE);
  }, []);

  const removeImageryTiles = useCallback(() => {
    if (map.current.getLayer(IMAGERY_LAYER))
      map.current.removeLayer(IMAGERY_LAYER);

    if (map.current.getSource(IMAGERY_SOURCE))
      map.current.removeSource(IMAGERY_SOURCE);
  }, []);

  const removeClassificationTiles = useCallback(() => {
    if (map.current.getLayer(CLASSIFICATION_LAYER))
      map.current.removeLayer(CLASSIFICATION_LAYER);

    if (map.current.getSource(CLASSIFICATION_SOURCE))
      map.current.removeSource(CLASSIFICATION_SOURCE);
  }, []);

  // add imagery tiles
  useEffect(() => {
    if (map.current) {
      if (
        taskImageryTilesHref &&
        prevImageryTilesHref.current !== taskImageryTilesHref
      ) {
        removeImageryTiles();
        if (taskImageryTilesHref) addImageryTiles(taskImageryTilesHref);
        prevImageryTilesHref.current = taskImageryTilesHref;
      }
    }
  }, [taskImageryTilesHref, addImageryTiles, removeImageryTiles]);

  // add drone tiles
  useEffect(() => {
    if (map.current) {
      if (taskSlug?.startsWith("virunga")) {
        console.log("adding drone tiles");
        removeDroneTiles();
        addDroneTiles();
      }
    }
  }, [taskSlug, addDroneTiles, removeDroneTiles]);

  // add classification tiles
  useEffect(() => {
    if (map.current) {
      if (
        taskClassificationTilesHref &&
        prevClassificationTilesHref.current !== taskClassificationTilesHref
      ) {
        removeClassificationTiles();
        if (taskClassificationTilesHref)
          addClassificationTiles(taskClassificationTilesHref);
        prevClassificationTilesHref.current = taskClassificationTilesHref;
      }
    }
  }, [
    taskClassificationTilesHref,
    addClassificationTiles,
    removeClassificationTiles,
  ]);

  /*** set up map ***/
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
      maxZoom: MAX_ZOOM,
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

  /*** add and remove geocoder ***/
  useEffect(() => {
    if (!map.current) return;

    if (!geocoder.current) {
      geocoder.current = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        marker: false,
        zoom: MAX_ZOOM,
        collapsed: true,
      }) as unknown as Control;
    }

    const showGeocoder =
      taskStatus === "loading" && !(isMobile && isSidebarExpanded);

    if (showGeocoder) {
      if (!map.current.hasControl(geocoder.current)) {
        map.current.addControl(geocoder.current, "top-left");
      }
    } else {
      if (map.current.hasControl(geocoder.current))
        map.current.removeControl(geocoder.current);
    }
  }, [taskStatus, isMobile, isSidebarExpanded]);

  /*** set up drawing ***/
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

  /*** clear drawing ***/
  useEffect(() => {
    if (formClearRegionTime) draw.current.deleteAll();
  }, [formClearRegionTime]);

  /*** draw region or remove drawing and tiles ***/
  useEffect(() => {
    if (taskRegionPolygon) {
      if (regionLayerId.current === "") {
        const drawIds = draw.current.add(taskRegionPolygon);
        regionLayerId.current = drawIds[0];
        const regionArea = area(taskRegionPolygon);
        setTaskRegionArea(Math.round(regionArea / 1_000_000));
      }
    } else {
      removeImageryTiles();
      removeDroneTiles();
      removeClassificationTiles();
      draw.current.deleteAll();
    }
  }, [
    taskRegionPolygon,
    setTaskRegionArea,
    removeImageryTiles,
    removeDroneTiles,
    removeClassificationTiles,
  ]);

  /*** fly to centroid only once ***/
  useEffect(() => {
    if (taskStatus && taskRegionPolygon && !taskFirstFlyTo) {
      const regionCentroid = centroid(taskRegionPolygon);
      const coords = regionCentroid.geometry.coordinates;
      const center = new LngLat(coords[0], coords[1]);
      map.current.flyTo({
        center: center,
        // zoom: 9,
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

  const toggleShowImageryTiles = () => {
    const tilesVisibility =
      !showImageryTiles && taskImageryTilesHref ? "visible" : "none";
    map.current.setLayoutProperty(IMAGERY_LAYER, "visibility", tilesVisibility);
    setShowImageryTiles(!showImageryTiles);
  };

  const toggleShowClassificationTiles = () => {
    const tilesVisibility =
      !showClassificationTiles && taskClassificationTilesHref
        ? "visible"
        : "none";
    map.current.setLayoutProperty(
      CLASSIFICATION_LAYER,
      "visibility",
      tilesVisibility
    );
    setShowClassificationTiles(!showClassificationTiles);
  };

  const isEyeInvisible = isMobile && isSidebarExpanded;

  return (
    <>
      {taskClassificationTilesHref && (
        <Button
          zIndex={888}
          display={isEyeInvisible ? "none" : "inherit"}
          position="absolute"
          top="10px"
          left="10px"
          variant="solid"
          colorScheme="whiteAlpha"
          leftIcon={showClassificationTiles ? <FiEye /> : <FiEyeOff />}
          onClick={toggleShowClassificationTiles}
        >
          Land Cover
        </Button>
      )}
      {taskImageryTilesHref && (
        <Button
          zIndex={888}
          display={isEyeInvisible ? "none" : "inherit"}
          position="absolute"
          top="60px"
          left="10px"
          variant="solid"
          colorScheme="whiteAlpha"
          leftIcon={showImageryTiles ? <FiEye /> : <FiEyeOff />}
          onClick={toggleShowImageryTiles}
        >
          Imagery
        </Button>
      )}
      <Box ref={mapContainer} h="100%" w="100%" position="relative"></Box>
    </>
  );
};

export default DemoMap;
