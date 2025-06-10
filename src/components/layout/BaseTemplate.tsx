import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import AppTheme from "./AppTheme";
import AppAppBar from "./components/AppBar";
import MainContent from "./components/MainContent";
import Footer from "./components/Footer";
// import { Outlet } from "react-router-dom";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";

export default function BaseTemplate(props: { disableCustomTheme?: boolean }) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />

      <AppAppBar />
      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: "flex", flexDirection: "column", my: 16, gap: 4 }}
      >
        <MainContent />
        {/* The Outlet component is used for nested routing in React Router v6 */}
        <Outlet />
      </Container>
      <Footer />
    </AppTheme>
  );
}
