/* eslint import/no-webpack-loader-syntax: off */
import React, { useRef, MutableRefObject, useEffect } from "react";
import mapboxgl, { Map } from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import { Box } from "@chakra-ui/react";
import { polygon } from "@turf/helpers";

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
}

const DemoMap: React.FC<Props> = ({ isMobile }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<Map>(null) as MutableRefObject<Map>;
  const draw = useRef<MapboxDraw>(null) as MutableRefObject<MapboxDraw>;
  const [lat, setLat] = useLocalStorage("lat", -0.72);
  const [lng, setLng] = useLocalStorage("lng", 29.38);
  const [zoom, setZoom] = useLocalStorage("zoom", 12);
  const {
    drawEnabled,
    setDrawEnabled,
    regionGeojson,
    setRegionGeojson,
    setRegionArea,
    clearRegionTime,
  } = useDemo();

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
    });

    map.current.on("load", () => {});

    map.current.on("move", () => {
      const center = map.current.getCenter();
      setZoom(map.current.getZoom());
      setLat(center.lat);
      setLng(center.lng);
    });

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
      setRegionGeojson(polygonObj);
      setDrawEnabled(false);
    });

    console.log("regionGeojson", regionGeojson);

    // add geoJson if it exists from previous session
    if (regionGeojson) {
      console.log("adding geojson", draw.current);
      draw.current.add(regionGeojson);
    }
  });

  useEffect(() => {
    if (drawEnabled) {
      draw.current.changeMode("draw_rectangle", {
        areaLimit: 5000 * 1_000_000, // 5000 km
        escapeKeyStopsDrawing: true,
        allowCreateExceeded: false,
        exceedCallsOnEachMove: false,
        exceedCallback: (area: number) => {},
        areaChangedCallback: (area: number) =>
          setRegionArea(Math.round(area / 1_000_000)),
      });

      // drawing complete or escape key pressed
      map.current.on("draw.modechange", function ({ mode }) {
        if (mode === "simple_select") setDrawEnabled(false);
      });
    } else {
      draw.current.changeMode("static");
      // if escape key pressed then clear the region area
      if (!regionGeojson) setRegionArea(null);
    }
  }, [drawEnabled, regionGeojson, setRegionArea, setDrawEnabled]);

  useEffect(() => {
    if (clearRegionTime) {
      draw.current.deleteAll();
    }
  }, [clearRegionTime]);

  return <Box ref={mapContainer} h="100%" w="100%"></Box>;
};

export default DemoMap;
