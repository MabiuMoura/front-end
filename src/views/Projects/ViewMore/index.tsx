import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { projectsEndpoint } from "../../../services/endpoints";
import {
  ProjectGroups,
  ProjectItems,
  ProjectMembers,
} from "../../../shared/constants/interfaces";
import { BackIcon, Container, Name } from "../components/BackPage/styles";
import {
  ButtonsContainer,
  ContainerBody,
  ContainerViewMore,
  DescriptionBody,
  GroupItem,
  GroupsBody,
  GroupsContainer,
  HeaderContainer,
  MemberItem,
  MembersList,
  Separator,
  Titles,
} from "./styles";
import MemberGroup from "../components/MembersCard";
import ButtonDark from "../../../components/Buttons/ButtonDark";
import { ModalGeneral } from "../../../components/Modals/ModalGeneral";
import ConfirmDeleteModal from "../components/Modal/ConfirmDeleteModal";
import { RoutePath } from "../../../shared/constants/enums";
import { toast } from "react-toastify";
import RequestsReceivedModal from "./modals/RequestsReceivedModal";

const ViewMorePageProject = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<ProjectItems | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeGroup, setActiveGroup] = useState<ProjectGroups | null>(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isReceivedModalOpen, setIsReceviedModalOpen] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) {
        setError("ID do projeto não fornecido");
        setLoading(false);
        return;
      }

      try {
        const data = await projectsEndpoint.getProjects({
          "where[id]": id,
          "relations[]": ["projectMembers"],
        });

        if (data.items && data.items.length > 0) {
          const projectData = data.items[0];
          setProject(projectData);
          if (
            projectData.projectGroups &&
            projectData.projectGroups.length > 0
          ) {
            setActiveGroup(projectData.projectGroups[0]);
          }
        } else {
          setError("Projeto não encontrado");
        }
      } catch (err) {
        setError("Erro ao carregar o projeto");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const handleBack = () => {
    navigate("/projects");
  };

  const handleGroupClick = (group: ProjectGroups) => {
    setActiveGroup(group);
  };

  const handleRequestsReceived = () => {
    setIsReceviedModalOpen(true);
  };

  const handleAddDocuments = () => {
    console.log("Adicionar documentos");
  };

  const handleDelete = () => {
    setIsConfirmModalOpen(true);
  };

  const handleCancelDelete = () => {
    setIsConfirmModalOpen(false);
  };

  const closeModalReceived = () => {
    setIsReceviedModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (!id) {
      console.error("ID do projeto não fornecido para exclusão");
      return;
    }
    try {
      await projectsEndpoint.removeProject(id);
      toast.success(`Projeto ${project?.name} excluído com sucesso!`);
      setIsConfirmModalOpen(false);
      navigate(RoutePath.PROJECTS);
    } catch (err) {
      toast.error("Erro ao excluir o projeto");
      setError("Erro ao excluir o projeto. Tente novamente.");
    }
  };

  if (loading) {
    return (
      <ContainerViewMore>
        <Container>
          <BackIcon onClick={handleBack} />
          <Name strong>Projetos</Name>
        </Container>
        <p>Carregando...</p>
      </ContainerViewMore>
    );
  }

  if (error || !project) {
    return (
      <ContainerViewMore>
        <Container>
          <BackIcon onClick={handleBack} />
          <Name strong>Projetos</Name>
        </Container>
        <ContainerBody>
          <Titles>DESCRIÇÃO</Titles>
          <p>{error || "Projeto não disponível"}</p>
        </ContainerBody>
      </ContainerViewMore>
    );
  }

  return (
    <ContainerViewMore>
      <HeaderContainer>
        <Container>
          <BackIcon onClick={handleBack} />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              whiteSpace: "nowrap",
              paddingLeft: "15px",
            }}
          >
            <Name strong>Projetos</Name>
            <Name strong> / </Name>
            <Name strong style={{ fontWeight: 300 }}>
              {project.name}
            </Name>
          </div>
        </Container>
        <ButtonsContainer>
          <ButtonDark onClick={handleRequestsReceived}>
            Solicitações Recebidas
          </ButtonDark>
          <ButtonDark onClick={handleAddDocuments}>
            Solicitar Documentos
          </ButtonDark>
          <ButtonDark danger onClick={handleDelete}>
            Excluir
          </ButtonDark>
        </ButtonsContainer>
      </HeaderContainer>
      <ContainerBody>
        <DescriptionBody>
          <Titles>DESCRIÇÃO DO PROJETO</Titles>
          <p style={{ fontSize: "15px" }}>{project.description}</p>
        </DescriptionBody>
        <GroupsBody>
          <Titles>GRUPOS E MEMBROS</Titles>
          {project.projectGroups && project.projectGroups.length > 0 ? (
            <>
              <GroupsContainer>
                {project.projectGroups?.map((group, index) => {
                  const totalGroups = project.projectGroups?.length || 0;
                  const itemWidth = `${100 / totalGroups}%`;

                  return (
                    <GroupItem
                      key={group.id || index}
                      isActive={activeGroup?.id === group.id}
                      onClick={() => handleGroupClick(group)}
                      width={itemWidth}
                    >
                      {group.name}
                      {index < (project.projectGroups?.length || 0) - 1 && (
                        <Separator />
                      )}
                    </GroupItem>
                  );
                })}
              </GroupsContainer>
              {activeGroup && (
                <MembersList>
                  {activeGroup.project_members.map((member: ProjectMembers) => (
                    <MemberGroup
                      key={member.id}
                      userId={member.user.id}
                      fullName={member.user.name}
                    />
                  ))}
                </MembersList>
              )}
            </>
          ) : (
            <p style={{ color: "#A0A0A0" }}>Nenhum grupo disponível</p>
          )}
        </GroupsBody>
      </ContainerBody>
      <ModalGeneral
        title="Confirmar Exclusão"
        show={isConfirmModalOpen}
        onClose={handleCancelDelete}
        width="22rem"
        zIndex={3}
      >
        <ConfirmDeleteModal
          show={isConfirmModalOpen}
          onClose={handleCancelDelete}
          onConfirm={handleConfirmDelete}
          projectName={project.name}
        />
      </ModalGeneral>
      <ModalGeneral
        title="Solicitações Recebidas"
        show={isReceivedModalOpen}
        onClose={closeModalReceived}
        explanation={false}
        width="50rem"
      >
        <RequestsReceivedModal
          idprojectMembers={project.projectMembers?.[0]?.id ?? ""}
          projectName={project.name}
        />
      </ModalGeneral>
    </ContainerViewMore>
  );
};

export default ViewMorePageProject;
