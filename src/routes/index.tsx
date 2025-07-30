import { FC } from "react";
import { useRoutes } from "react-router-dom";
import { RoutePath } from "../shared/constants/enums";
import LoginPage from "../views/Login";
import UserPage from "../views/User";
import LayoutNavSideBar from "../layouts/layout";
import DashboardPage from "../views/Dashboard";
import ProjectsPage from "../views/Projects";
import MembersPage from "../views/Members";
import PatrimonyPage from "../views/Patrimony";
import ResearchPage from "../views/Research";
import Areas from "../views/Research/Areas";
import Table from "../views/Research/components/Table";
import AreaPage from "../views/Research/Areas/components/AreaPage";
import RegisterPage from "../views/Register";
import PrivateRoute from "./privateRoute";
import ResetPasswordPage from "../views/ResetPassword";
import ViewMorePageProject from "../views/Projects/ViewMore";
import MemberViewPage from "../views/Members/pages/viewMember";

const Routes: FC = () => {
  return useRoutes([
    {
      path: "*",
      element: <LoginPage />,
    },
    {
      path: RoutePath.LOGIN,
      element: <LoginPage />,
    },
    {
      path: RoutePath.REGISTER,
      element: (
          <RegisterPage />
      ),
    },
    {
      path: RoutePath.RESETPASSWORD,
      element: (
          <ResetPasswordPage />
      ),
    },
    {
      path: "/",
      element: (
          <LayoutNavSideBar />
      ),
      children: [
        {
          path: RoutePath.USER,
          element: <UserPage />,
        },
        {
          path: RoutePath.DASHBOARD,
          element: <DashboardPage />,
        },
        {
          path: RoutePath.RESEARCH,
          element: <ResearchPage />,
          children: [
            {
              path: RoutePath.RESEARCH_AREA,
              element: <Areas />,
            },
            {
              path: RoutePath.RESEARCH_AREA_PAGES,
              element: <AreaPage />,
            },
            {
              path: RoutePath.BASES,
              element: <Table />,
            },
            {
              path: RoutePath.ARTICLES,
              element: <Table />,
            },
          ],
        },
        {
          path: RoutePath.PROJECTS,
          element: <ProjectsPage />,
        },
        {
          path: RoutePath.PROJECT_DETAIL,
          element: <ViewMorePageProject />,
        },
        {
          path: RoutePath.MEMBERS,
          element: <MembersPage />,
        },
        {
          path: RoutePath.MEMBERS_VIEW_PAGE,
          element: < MemberViewPage/>
        },
        {
          path: RoutePath.PATRIMONY,
          element: <PatrimonyPage />,
        },
      ],
    },
  ]);
};

export default Routes;
