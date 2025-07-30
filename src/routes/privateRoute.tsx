import { FC, ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthUser } from "../context/authContext";
import { RoutePath } from "../shared/constants/enums";
import { Loader } from "../components/Loader";

interface PrivateRouteProps {
  children: ReactNode;
  requiresFirstLogin?: boolean;
}

const PrivateRoute: FC<PrivateRouteProps> = ({ children, requiresFirstLogin }) => {
  const { user, isLoading } = useAuthUser();
  const location = useLocation();
  const state = location.state as { isFirstLogin?: boolean };

  if (isLoading) {
    return <div style={{width:"100vw",height: "100vh", display: "flex", justifyContent:"center", alignItems:"center"}}><Loader /></div>;
  }

  if (!user) {
    return <Navigate to={RoutePath.LOGIN} replace state={{ from: location }} />;
  }

  if (requiresFirstLogin && !state?.isFirstLogin) {
    return <Navigate to={RoutePath.USER} replace />;
  }

  if (state?.isFirstLogin && location.pathname !== RoutePath.REGISTER) {
    return <Navigate to={RoutePath.REGISTER} replace state={{ isFirstLogin: true }} />;
  }

  return <>{children}</>;
};

export default PrivateRoute;