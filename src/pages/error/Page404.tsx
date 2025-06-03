// src/pages/error/Page404.tsx
import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Link as RouterLink } from "react-router-dom";

const Page404: React.FC = () => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: theme.palette.background.default,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={4}
          alignItems="center"
          justifyContent="center"
          sx={{ textAlign: isSmall ? "center" : "left" }}
        >
          <Grid item xs={12} md={6}>
            <Typography
              variant="h1"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 700,
                fontSize: { xs: "4rem", md: "5rem" },
                lineHeight: 1,
                color: theme.palette.text.primary,
              }}
            >
              404
            </Typography>
            <Typography
              variant="h4"
              component="h2"
              gutterBottom
              sx={{
                fontWeight: 500,
                color: theme.palette.text.secondary,
                mb: 2,
              }}
            >
              Oops! Page not found.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: theme.palette.text.secondary,
                mb: 4,
                maxWidth: 480,
              }}
            >
              The page you’re looking for might have been removed, had its name
              changed, or is temporarily unavailable. Please check the URL or
              return to the homepage.
            </Typography>
            <Button
              variant="contained"
              size="large"
              component={RouterLink}
              to="/"
              sx={{
                px: 4,
                py: 1.5,
                fontSize: "1rem",
              }}
            >
              Go to Homepage
            </Button>
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              justifyContent: isSmall ? "center" : "flex-end",
            }}
          >
            <ErrorOutlineIcon
              color="error"
              sx={{
                fontSize: { xs: 200, md: 300 },
                opacity: 0.2,
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Page404;
