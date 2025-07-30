import React, { useEffect, useState } from "react";
import { matchPath, Outlet, useLocation } from "react-router-dom";
import Navbar from "./NavBar";
import SideBar from "./SideBar";
import { AppShellStyled, MainContentStyled } from "./styles";
import { RoutePath } from "../../shared/constants/enums";
import { useAuthUser } from "../../context/authContext";
import { MeAuth } from "../../shared/constants/interfaces";

const LayoutNavSideBar: React.FC = () => {
  const { me } = useAuthUser();
  const location = useLocation();
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [isScreenSmall, setIsScreenSmall] = useState(window.innerWidth <= 425);
  const [userData, setUserData] = useState<MeAuth | null>(null);

  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  const handleResize = () => {
    setIsScreenSmall(window.innerWidth <= 768);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await me();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [me]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getRouteName = (pathname: string): string => {
    if (matchPath(RoutePath.RESEARCH_AREA_PAGES, pathname)) {
      return "Áreas de Pesquisa";
    }

    if (matchPath(RoutePath.PROJECT_DETAIL, pathname)) {
      return "Projetos";
    }

    if (matchPath(RoutePath.MEMBERS_VIEW_PAGE, pathname)) {
      return "Membros";
    }
    switch (pathname) {
      case RoutePath.USER:
        return "Perfil";
      case RoutePath.DASHBOARD:
        return "Dashboard";
      case RoutePath.RESEARCH:
        return "Pesquisa";
      case RoutePath.PROJECTS:
        return "Projetos";
      case RoutePath.MEMBERS:
        return "Membros";
      case RoutePath.PATRIMONY:
        return "Patrimônios";
      case RoutePath.RESEARCH_AREA:
        return "Áreas de Pesquisa";
      case RoutePath.RESEARCH_AREA_PAGES:
        return "Áreas de Pesquisa";
      case RoutePath.BASES:
        return "Bases";
      case RoutePath.ARTICLES:
        return "Artigos";
      default:
        return "Perfil";
    }
  };

  const currentRouteName = getRouteName(location.pathname);

  return (
    <AppShellStyled>
      <Navbar
        currentRoute={currentRouteName}
        toggleSidebar={toggleSidebar}
        userID={userData?.id}
        name={userData?.name}
      />
      <SideBar
        isVisible={isSidebarVisible}
        isScreenSmall={isScreenSmall}
      ></SideBar>
      <MainContentStyled>
        <Outlet />
      </MainContentStyled>
    </AppShellStyled>
  );
};

export default LayoutNavSideBar;
