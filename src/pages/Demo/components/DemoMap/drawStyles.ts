const drawStyles = [
  // ACTIVE (being drawn)
  // polygon fill
  {
    id: "gl-draw-polygon-fill-active",
    type: "fill",
    filter: ["all", ["==", "$type", "Polygon"], ["!=", "mode", "static"]],
    paint: {
      "fill-color": [
        "case",
        ["!", ["to-boolean", ["get", "user_size_exceed"]]],
        "#6ECAFF",
        "#de3400",
      ],

      "fill-opacity": 0.2,
    },
  },

  // polygon outline stroke
  {
    id: "gl-draw-polygon-stroke-active",
    type: "line",
    filter: ["all", ["==", "$type", "Polygon"], ["!=", "mode", "static"]],
    layout: {
      "line-cap": "round",
      "line-join": "round",
    },
    paint: {
      "line-color": [
        "case",
        ["!", ["to-boolean", ["get", "user_size_exceed"]]],
        "#146CE1",
        "#de3400",
      ],
      "line-dasharray": [0.2, 2],
      "line-width": 2,
    },
  },

  // INACTIVE (static, already drawn)

  // polygon fill
  {
    id: "gl-draw-polygon-fill-static",
    type: "fill",
    filter: ["all", ["==", "$type", "Polygon"], ["==", "mode", "static"]],
    paint: {
      "fill-color": "#146CE1",
      "fill-opacity": 0.0,
    },
  },
  // polygon outline
  {
    id: "gl-draw-polygon-stroke-static",
    type: "line",
    filter: ["all", ["==", "$type", "Polygon"], ["==", "mode", "static"]],
    layout: {
      "line-cap": "round",
      "line-join": "round",
    },
    paint: {
      "line-color": "#146CE1",
      "line-width": 2,
    },
  },
];

export default drawStyles;
