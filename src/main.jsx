import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import navSlice from "./Feature/navFeatures.js"
import navFeatures from "./Feature/navFeatures.js";

const store = configureStore({
  reducer: {
    navFeature: navFeatures,
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider>
    <Provider store={store}>
      {/* <React.StrictMode> */}
      <App />
      {/* </React.StrictMode> */}
    </Provider>
  </ChakraProvider>
);
