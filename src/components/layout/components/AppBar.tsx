import * as React from "react";
import { alpha, styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ColorModeIconDropdown from ".././ColorModeIconDropdown";
import Sitemark from "./SitemarkIcon";
import { useNavigate } from "react-router-dom";
import { useColorScheme } from "@mui/material/styles";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: "blur(24px)",
  border: "1px solid",
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: theme.vars
    ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
    : alpha(theme.palette.background.default, 0.4),
  boxShadow: (theme.vars || theme).shadows[1],
  padding: "8px 12px",
}));

export default function AppAppBar() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const { mode, setMode } = useColorScheme();

  // const toggleDrawer = (newOpen: boolean) => () => {
  //   setOpen(newOpen);
  // };

  const go = (path: string) => () => {
    navigate(path);
    setOpen(false);
  };

  const toggleDrawer = (newOpen: boolean) => () => setOpen(newOpen);
  const handleThemeToggle = () => setMode(mode === "light" ? "dark" : "light");

  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: "transparent",
        backgroundImage: "none",
        mt: "calc(var(--template-frame-height, 0px) + 28px)",
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          <Box
            sx={{ flexGrow: 1, display: "flex", alignItems: "center", px: 0 }}
          >
            <Sitemark />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <Button
                variant="text"
                color="info"
                size="small"
                onClick={go("/staffing")}
              >
                Staffing
              </Button>
              <Button
                variant="text"
                color="info"
                size="small"
                onClick={go("/clients")}
              >
                Clients
              </Button>
              <Button
                variant="text"
                color="info"
                size="small"
                onClick={go("/employees")}
              >
                Employees
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 1,
              alignItems: "center",
            }}
          >
            <Button color="primary" variant="text" size="small">
              Sign in
            </Button>
            <Button color="primary" variant="contained" size="small">
              Sign up
            </Button>
            <ColorModeIconDropdown />
          </Box>

          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              alignItems: "center",
              gap: 1,
            }}
          >
            <Drawer anchor="top" open={open} onClose={toggleDrawer(false)}>
              <Box sx={{ p: 2, bgcolor: "background.default" }}>
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>
                <MenuItem onClick={go("/staffing")}>Staffing</MenuItem>
                <MenuItem onClick={go("/clients")}>Clients</MenuItem>
                <MenuItem onClick={go("/employees")}>Employees</MenuItem>
                <Divider sx={{ my: 2 }} />
                <MenuItem>
                  <Button fullWidth onClick={go("/signup")}>
                    Sign up
                  </Button>
                </MenuItem>
                <MenuItem>
                  <Button fullWidth onClick={go("/signin")}>
                    Sign in
                  </Button>
                </MenuItem>
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
