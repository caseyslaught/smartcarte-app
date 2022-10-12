import React, { useRef, MutableRefObject, useEffect } from "react";
import mapboxgl, { Map } from "mapbox-gl";
import { Box } from "@chakra-ui/react";

import useLocalStorage from "../../../../hooks/useLocalStorage";

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;
mapboxgl.accessToken = MAPBOX_TOKEN || "";

interface Props {}

const AppMap: React.FC<Props> = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<Map>(null) as MutableRefObject<Map>;
  const [lat, setLat] = useLocalStorage("lat", -0.72);
  const [lng, setLng] = useLocalStorage("lng", 29.38);
  const [zoom, setZoom] = useLocalStorage("zoom", 12);

  useEffect(() => {
    if (map.current || !mapContainer.current) return;
    map.current = new mapboxgl.Map({
      attributionControl: false,
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/satellite-v9",
      center: [lng, lat],
      projection: { name: "globe" },
      zoom: zoom,
    });

    map.current.on("load", () => {});

    map.current.on("move", () => {
      const center = map.current.getCenter();
      setZoom(map.current.getZoom());
      setLat(center.lat);
      setLng(center.lng);
    });
  });

  return <Box ref={mapContainer} h="100%" w="100%"></Box>;
};

export default AppMap;
