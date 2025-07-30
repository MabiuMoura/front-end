import { DefaultTheme } from "styled-components";

export default {
  title: "default",
  fonts: {
    poppins: "Poppins, sans-serif",
    montserrat: "Montserrat, sans-serif",
    inter: "Inter, sans-serif",
  },

  colors: {
    background_colors: {
      backgroundGray: "#2E2E2E",
      backgroundBlue: "#020617",
    },
    primary_colors: {
      blue: "#0f172a",
      blue800: "#1E293B",
      blue200: "#3a4759",
      blue100: "#1e263c",
      blueGray: "#64748B",
      green: "#06502D",
      gray: "#484848",
      gray50: "#D9D9D9",
      gray100: "#909090",
      gray200: "#475569",
      lilac: "#94A3B8",
      light: "#E2E8F0",
      disabled: "#D3D3D3",
      slate700: "#334155"
    },
    secondary_colors: {
      dark: "#444444",
      red: "#EB7071",
      green: "#65A30D",
      gray100: "b5b5b5",
      gray200: "#8c8c8c",
      gray300: "#666666",
      gray400: "#515151",
      gray500: "#3c3c3c",
      gray_date: "#3c414a",
      earthyRed: "#854444",
      slate700: "#334155",
      neonBlue: "#2CD9FF",
      neonBlue100: "#2CD9FF",
      purple100: "#523179",
      grayLight: "#ababab",
      grayDark: "#575757",
    },
    neutral_colors: {
      black: "#000000",
      white: "#ffffff",
    },
    alert_colors: {
      error: "#909090",
      errorModal: "#CB8042",
    },
  },
} as DefaultTheme;
