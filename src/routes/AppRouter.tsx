import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CircularProgress, Box } from "@mui/material";
import Page404 from "../pages/error/Page404.tsx"; // 404 page

/* ----------------------------------------------------------------------------
 *  Lazy‑loaded pages (code‑splitting)
 * ------------------------------------------------------------------------- */
// const Dashboard      = lazy(() => import("@/pages/Dashboard"));
// const ClientsList    = lazy(() => import("@/features/clients/ClientsList"));
// const ClientForm     = lazy(() => import("@/features/clients/ClientForm"));
// const UsersList      = lazy(() => import("@/features/users/UsersList"));
// const UserForm       = lazy(() => import("@/features/users/UserForm"));
// const NotFound       = lazy(() => import("@/pages/NotFound"));

/* ----------------------------------------------------------------------------
 *  Layout wrappers
 * ------------------------------------------------------------------------- */
// const AppLayout      = lazy(() => import("@/components/layout/AppLayout"));

/* ----------------------------------------------------------------------------
 *  Auth guard (simple example)
 * ------------------------------------------------------------------------- */
interface GuardProps { children: React.ReactElement }
const PrivateRoute: React.FC<GuardProps> = ({ children }) => {
  const isLoggedIn = !!localStorage.getItem("token"); // <‑‑ replace with real auth hook
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

/* -------------------------------------------------------------------------- */
const Loading: React.FC = () => (
  <Box sx={{ display: "flex", justifyContent: "center", mt: 8 }}>
    <CircularProgress />
  </Box>
);

/* ----------------------------------------------------------------------------
 *  Main router component
 * ------------------------------------------------------------------------- */
const AppRouter: React.FC = () => (
  <BrowserRouter>
    <Suspense fallback={<Loading />}> {/* fallback shown for every lazy chunk */}
      <Routes>
        {/* Public routes ---------------------------------------------------- */}
        {/* <Route path="/login" element={lazyWrap(() => import("@/pages/Login"))} /> */}

          {/* 404 inside authenticated shell */}
          <Route path="*" element={<Page404 />} />
      </Routes>
    </Suspense>
  </BrowserRouter>
);

export default AppRouter;

/* ─────────────────────────────────────────────────────────────────────────── */
/** Helper to lazy‑load a single component w/out repetition */
function lazyWrap(factory: () => Promise<{ default: React.ComponentType<any> }>) {
  const Page = lazy(factory);
  return <Page />;
}
