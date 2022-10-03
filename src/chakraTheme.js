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
    background: "#303030",
  },
  fontSizes: {},
  layout: {},
  styles: {
    global: (props) => ({
      "html, body": {
        height: "100vh",
        margin: 0,
        padding: 0,
      },
      body: {
        background: props.theme.colors.background,
        color: "white",
        minHeight: "100vh",
        "-ms-overflow-style": "none",
        "scrollbar-width": "none",
      },
      "body::-webkit-scrollbar": {
        display: "none",
      },
      "#root, .App": {
        height: "100%",
      },
    }),
  },
};

export default extendTheme(theme);
