import { extendTheme } from "@chakra-ui/react";

const theme = {
  breakpoints: {
    sm: "30em",
    md: "48em",
    lg: "62em",
    xl: "80em",
  },
  colors: {
    accent: "#C18000",
    background: "#222",
    backgroundLight: "#444",
  },
  fontSizes: {},
  layout: {},
  styles: {
    global: (props) => ({
      "html, body": {
        margin: 0,
        padding: 0,
      },
      body: {
        background: props.theme.colors.background,
        color: "white",
        minHeight: "100vh",
        minWidth: "320px",
        width: "100%",
        "-ms-overflow-style": "none",
        "scrollbar-width": "none",
      },
      "body::-webkit-scrollbar": {
        display: "none",
      },
      "#root, .App": {
        height: "100%",
      },
      ".mapboxgl-ctrl-logo": {
        display: "none !important",
      },
    }),
  },
};

export default extendTheme(theme);
