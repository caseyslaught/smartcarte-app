import React, { MutableRefObject, useEffect, useRef, useState } from "react";
//import Map, { AttributionControl, MapRef } from "react-map-gl";
import mapboxgl, { Map } from "mapbox-gl"; // or "const mapboxgl = require('mapbox-gl');"
import { Box } from "@chakra-ui/react";

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;
mapboxgl.accessToken = MAPBOX_TOKEN || "";

interface Props {}

const initialView = {
  lng: 28,
  lat: 10,
  zoom: 1.8,
};

const Globe: React.FC<Props> = () => {
  const [userInteracting, setUserInteracting] = useState(false);
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<Map>(null) as MutableRefObject<Map>;

  // this not working super well...
  function rotateGlobe() {
    if (map.current && !userInteracting) {
      console.log("here");
      const center = map.current.getCenter();
      center.lng -= 2;
      map.current.easeTo({
        center,
        duration: 1000,
        easing: (n) => n,
      });
    }
  }

  useEffect(() => {
    console.log("userInteracting", userInteracting);
  }, [userInteracting]);

  // initialize Map
  useEffect(() => {
    if (map.current || !mapContainer.current) return;
    map.current = new mapboxgl.Map({
      attributionControl: false,
      container: mapContainer.current,
      interactive: false,
      style: "mapbox://styles/mapbox/satellite-v9",
      center: [initialView.lng, initialView.lat],
      projection: { name: "globe" },
      zoom: initialView.zoom,
    });
    map.current.on("load", () => {
      map.current.scrollZoom.disable();
      map.current.setFog({
        color: "rgba(59, 137, 196, 0.8)",
        // @ts-ignore
        "high-color": "rgba(106, 187, 222, .3)",
        "horizon-blend": 0.01,
        // @ts-ignore
        "space-color": "rgba(0, 0, 0, 0)",
        "star-intensity": 0,
      });
      rotateGlobe();
    });

    /*
    map.current.on("mousedown", () => {
      setUserInteracting(true);
    });
    map.current.on("mouseup", () => {
      setUserInteracting(false);
      rotateGlobe();
    });
    map.current.on("dragend", () => {
      setUserInteracting(false);
      rotateGlobe();
    });
    map.current.on("pitchend", () => {
      setUserInteracting(false);
      rotateGlobe();
    });
    map.current.on("rotateend", () => {
      setUserInteracting(false);
      rotateGlobe();
    });
    */
    map.current.on("moveend", () => {
      rotateGlobe();
    });
  });

  return <Box ref={mapContainer} h="700px" w="700px" overflow="visible"></Box>;
};

export default Globe;
