import { useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { GrDocumentConfig } from "react-icons/gr";
import { HiOutlineUserGroup } from "react-icons/hi";
import { IoChatbubblesOutline, IoLaptopOutline } from "react-icons/io5";
import { MdOutlineDashboard } from "react-icons/md";
import { PiMicroscopeLight } from "react-icons/pi";
import { useLocation, useNavigate } from "react-router-dom";
import { RoutePath } from "../../../shared/constants/enums";
import { GroupStyles, Line, SectionSideBar } from "./styles";


export interface ModuleSidebar {
  module: string;
  to: string;
  icon: JSX.Element;
}

interface SideBarProps {
  isVisible: boolean; 
  isScreenSmall: boolean;
}

const SideBar: React.FC<SideBarProps> = ({ isVisible, isScreenSmall }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [modules] = useState<ModuleSidebar[]>([
    {
      module: "Perfil",
      to: RoutePath.USER,
      icon: <AiOutlineHome size={30} strokeWidth={1.2} />,
    },
    {
      module: "Dashboard",
      to: RoutePath.DASHBOARD,
      icon: <MdOutlineDashboard size={30} />,
    },
    {
      module: "Pesquisa",
      to: RoutePath.RESEARCH,
      icon: <PiMicroscopeLight size={30} strokeWidth={1.2} />,
    },
    {
      module: "Projetos",
      to: RoutePath.PROJECTS,
      icon: <GrDocumentConfig size={30} strokeWidth={1.2} />,
    },
    {
      module: "Membros",
      to: RoutePath.MEMBERS,
      icon: <HiOutlineUserGroup size={30} strokeWidth={1.2} />,
    },
    {
      module: "Máquinas",
      to: RoutePath.PATRIMONY,
      icon: <IoLaptopOutline size={30} strokeWidth={1.2} />,
    },
  ]);

  if (isScreenSmall && !isVisible) {
    return null;
  }


  return (
    <SectionSideBar>
      {modules.map((module, index) => (
        <div key={index}>
          {index === 3 && <Line />}
          <GroupStyles
            onClick={() => navigate(module.to)}
            active={location.pathname === module.to}
          >
            {module.icon}
            <h3 className="text-side">{module.module}</h3>
          </GroupStyles>
        </div>
      ))}
      <div style={{ flexGrow: 0.8 }}></div>
      <Line/>
      <div>
        <GroupStyles
          onClick={() => window.open("https://www.google.com", "_blank")}
          active={false}
        >
          <IoChatbubblesOutline size={30} strokeWidth={1.2} />
          <h3 className="text-side">Chat</h3>
        </GroupStyles>
      </div>
    </SectionSideBar>
  );
};

export default SideBar;
