import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",           // switch to "dark" if you prefer
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#9c27b0",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: "none" },
      },
    },
  },
});

export default theme;
