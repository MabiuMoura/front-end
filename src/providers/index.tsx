import React from "react";
// import { PersistGate } from "redux-persist/integration/react";
import { ThemeProvider } from "styled-components";
import defaultTheme from "../styles/themes/default";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "../context/authContext";
import { ProfilePictureProvider } from "../context/profilePictureContext";

const { VITE_APP_AUTH_PROVIDER_CLIENTID } = import.meta.env;

const Providers: React.ReactNode[] = [
  <ThemeProvider key={"themeProvider"} theme={defaultTheme} />,
  <AuthProvider key={"authProvider"} children={undefined}/>,
  <GoogleOAuthProvider clientId={VITE_APP_AUTH_PROVIDER_CLIENTID} children={undefined} />,
  <ProfilePictureProvider key={"profilePictureProvider"} children={undefined} />
];

export default Providers;
