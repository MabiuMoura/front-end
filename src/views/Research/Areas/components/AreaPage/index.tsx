import { useLocation } from "react-router-dom";
import BackPage from "../BackPage";
import {
  AreaPageContainer,
  Body,
  ContainerDescription,
  ContainerResearchers,
  Description,
  Header,
  HeaderIcon,
  HeaderImage,
  HeaderTitle,
  Title,
} from "./styles";
import Researcher from "../Researcher/index.tsx";
import ButtonLight from "../../../../../components/Buttons/ButtonLight/index.tsx";
import {
  ResearchProfileArea,
  Resources,
  MeAuth,
} from "../../../../../shared/constants/interfaces";
import { useEffect, useState, useCallback } from "react";
import { research } from "../../../../../services/endpoints";
import { toast } from "react-toastify";
import { useAuthUser } from "../../../../../context/authContext";

const AreaPage: React.FC = () => {
  const location = useLocation();
  const area: Resources = location.state?.area;
  const icon: string = location.state?.icon;

  const [iconUser, setIconUser] = useState<string[]>([]);
  const [researchProfiles, setResearchProfiles] = useState<
    ResearchProfileArea[]
  >([]);
  const [isLinked, setIsLinked] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<MeAuth | null>(null);
  const { me } = useAuthUser();

  const fetchUserData = useCallback(async () => {
    try {
      const data: MeAuth = await me();
      setCurrentUser(data);
    } catch (error) {
      console.error("Erro ao buscar dados do usuário:", error);
      toast.error("Erro ao buscar dados do usuário.");
    }
  }, [me]);

  const checkUserLinkStatus = useCallback(async () => {
    if (currentUser) {
      try {
        const result = await research.isUserLinked(area.id, currentUser.id);
        setIsLinked(result.isLinked);
      } catch (error) {
        console.error("Erro ao verificar vínculo:", error);
        toast.error("Erro ao verificar vínculo.");
      }
    }
  }, [currentUser, area.id]);

  const fetchResearchProfiles = useCallback(async () => {
    try {
      const response = await research.getResourcesById(area.id, [
        "research_profiles.user",
      ]);
      const researchers: ResearchProfileArea[] =
        response.items[0].research_profiles;
      setResearchProfiles(researchers);

      const researcherIds: string[] =
        researchers.map((researcher) => researcher.user.id) ?? [];
      const requests = researcherIds.map((id) => research.getIconUser(id));
      const blobs = await Promise.allSettled(requests);
      const icons = blobs.map((result) =>
        result.status === "fulfilled" ? URL.createObjectURL(result.value) : ""
      );
      setIconUser(icons);
    } catch (error) {
      console.error("Erro ao buscar os pesquisadores:", error);
    }
  }, [area.id]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  useEffect(() => {
    if (currentUser) {
      checkUserLinkStatus();
    }
  }, [currentUser, checkUserLinkStatus]);

  useEffect(() => {
    fetchResearchProfiles();
  }, [area, fetchResearchProfiles]);

  const downloadPDF = async (area: Resources) => {
    try {
      const blob = await research.getPDF(area.id);
      const pdf = URL.createObjectURL(blob);
      if (pdf) {
        const link = document.createElement("a");
        link.href = pdf;
        link.setAttribute("download", `${area.name}.pdf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        toast.error("PDF não encontrado.");
      }
    } catch (error) {
      console.error("Erro ao baixar PDF:", error);
      toast.error("Erro ao baixar PDF.");
    }
  };

  const handleLinkToggle = async () => {
    if (!currentUser) {
      toast.error("Usuário não identificado.");
      return;
    }
    if (isUpdating) return;

    setIsUpdating(true);
    try {
      if (isLinked) {
        await research.unlinkUserFromArea(area.id, currentUser.id);
        toast.success("Desvinculado com sucesso!");
      } else {
        await research.linkUserToArea(area.id, currentUser.id);
        toast.success("Vinculado com sucesso!");
      }
      await Promise.all([checkUserLinkStatus(), fetchResearchProfiles()]);
    } catch (error) {
      console.error("Erro ao atualizar vínculo:", error);
      toast.error("Erro ao atualizar vínculo.");
    } finally {
      setIsUpdating(false);
    }
  };

  if (!currentUser) {
    return <div>Carregando...</div>;
  }

  return (
    <AreaPageContainer>
      <BackPage firstName="Áreas de Pesquisa /" secondName={area?.name || ""} />
      <Header>
        <HeaderImage content={icon} />
        <HeaderTitle>{area?.name}</HeaderTitle>
        <HeaderIcon />
      </Header>
      <Body>
        <Title>DESCRIÇÃO</Title>
        <ContainerDescription>
          <Description>{area.description}</Description>
          <ButtonLight
            text="Baixar PDF"
            onClick={() => downloadPDF(area)}
            disabled={!area.pdf_mongo_id}
          />
        </ContainerDescription>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginLeft: "50px",
            marginBottom: "10px",
          }}
        >
          <Title>PESQUISADORES</Title>
          <ButtonLight
            text={isLinked ? "Desvincular-se" : "Vincular-se"}
            onClick={handleLinkToggle}
            disabled={isUpdating}
            style={{
              background: isLinked ? "#C34036" : undefined,
              color: isLinked ? "#F9FAFB" : undefined,
              borderColor: isLinked ? "#C34036" : undefined,
              ...(isUpdating ? { opacity: 0.6, cursor: "not-allowed" } : {}),
            }}
          />
        </div>
        <ContainerResearchers>
          {researchProfiles.map((researcher, index) => (
            <Researcher
              key={index}
              researcherIMG={iconUser[index]}
              researcherName={researcher.user.name}
            />
          ))}
        </ContainerResearchers>
      </Body>
    </AreaPageContainer>
  );
};

export default AreaPage;
