import React from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import "prismjs";

// extend the theme
const theme = extendTheme({
  styles: {
    global: {
      ul: {
        listStylePosition: "inside",
      },
      ol: {
        listStylePosition: "inside",
      },
      table: {
        borderCollapse: "collapse",
      },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
