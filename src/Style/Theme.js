// src/styles/theme.js
import { createTheme } from "@mui/material/styles";
import colors from "./colors"; 

const theme = createTheme({
  palette: {
    background: {
      default: colors.background,
    },
  },
  typography: {
  },

});

export default theme;
