// src/index.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import theme from "./components/layout/theme"
import "./index.css";
import reportWebVitals from "./reportWebVitals";

import "@fontsource/roboto/100.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRouter />
      {/* <BrowserRouter>
        
      </BrowserRouter> */}
    </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();
