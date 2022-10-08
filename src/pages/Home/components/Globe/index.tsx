import React, { MutableRefObject, useEffect, useRef } from "react";
import mapboxgl, { Map } from "mapbox-gl";
import { Box, useMediaQuery } from "@chakra-ui/react";

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;
mapboxgl.accessToken = MAPBOX_TOKEN || "";

interface Props {}

const initialView = {
  lng: 28,
  lat: 10,
  zoom: 1.6,
};

const Globe: React.FC<Props> = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<Map>(null) as MutableRefObject<Map>;
  const [isSmallerThan48em] = useMediaQuery("(max-width: 48em");
  const [isLargerThan80em] = useMediaQuery("(min-width: 80em)");
  const [isLargerThan96em] = useMediaQuery("(min-width: 96em)");

  // this not working super well...
  function rotateGlobe() {
    // && !userInteracting
    if (map.current) {
      const center = map.current.getCenter();
      center.lng -= 2;
      map.current.easeTo({
        center,
        duration: 1000,
        easing: (n) => n,
      });
    }
  }

  // dynamically update zoom
  useEffect(() => {
    if (!map.current) return;

    if (isSmallerThan48em) {
      map.current.easeTo({ zoom: 1.6, duration: 1000 });
    } else if (isLargerThan96em) {
      map.current.easeTo({ zoom: 1.9, duration: 1000 });
    } else if (isLargerThan80em && !isLargerThan96em) {
      map.current.easeTo({ zoom: 1.7, duration: 1000 });
    } else {
      map.current.easeTo({ zoom: 1.6, duration: 1000 });
    }
  }, [isSmallerThan48em, isLargerThan80em, isLargerThan96em]);

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

  const dimensions = ["600px", "600px", "580px", "620px", "680px", "800px"];

  return (
    <Box
      ref={mapContainer}
      h={dimensions}
      w={dimensions}
      overflow="visible"
    ></Box>
  );
};

export default Globe;
