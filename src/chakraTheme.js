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
    background: "#222222",
    backgroundLight: "#444444",
    offWhite: "#F3F3F3",
    demoDark: "#4A4A4A",
  },
  fontSizes: {},
  layout: {},
  styles: {
    global: (props) => ({
      html: {
        height: "100%",
      },
      "html, body": {
        margin: 0,
        padding: 0,
      },
      body: {
        background: props.theme.colors.background,
        color: "white",
        height: "100%",
        minHeight: "100vh",
        minWidth: "320px",
        width: "100%",
        MsOverflowStyle: "none",
        scrollbarWidth: "none",
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
