// src/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // Customize your primary color
    },
    secondary: {
      main: "#dc004e", // Customize your secondary color
    },
    success: {
      main: "#2e7d32",
    },
  },
  typography: {
    h4: {
      fontWeight: 600,
    },
    // Customize other typography variants as needed
  },
  // Add more theme customizations as needed
});

export default theme;
