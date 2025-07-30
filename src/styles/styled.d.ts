import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    title: string;

    fonts: {
      poppins: string;
      montserrat: string;
      inter: string;
    };

    colors: {
      background_colors: {
        backgroundGray: string;
        backgroundBlue: string;
      };
      primary_colors: {
        blue: string;
        blue800: string;
        blue200: string;
        blue100: string;
        blueGray: string;
        green: string;
        gray: string;
        gray50: string;
        gray100: string;
        gray200: string;
        lilac: string;
        light: string;
        disabled: string;
        slate700: string;
      };
      secondary_colors: {
        dark: string;
        red: string;
        green: string;
        gray100: string;
        gray200: string;
        gray300: string;
        gray400: string;
        gray500: string;
        gray_date: string;
        earthyRed: string;
        slate700: string;
        neonBlue: string;
        neonBlue100: string;
        purple100: string;
        grayLight: string;
        grayDark: string;
      };
      neutral_colors: {
        black: string;
        white: string;
      };
      alert_colors: {
        error: string;
        errorModal: string;
      };
    };
  }
}
