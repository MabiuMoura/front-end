import { createColumnHelper } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { CiCircleCheck } from "react-icons/ci";
import { GrRefresh } from "react-icons/gr";
import { LuCircleSlash2, LuRefreshCcwDot } from "react-icons/lu";
import { ModalGeneral } from "../../components/Modals/ModalGeneral";
import SearchFilterRoot from "../../components/SearchFilters/SearchFilterTables";
import TableRoot from "../../components/Table";
import { projectsEndpoint } from "../../services/endpoints";
import { ProjectTable } from "../../shared/constants/interfaces";
import AddProjectModal from "./components/Modal";
import { PageContainer, TableContainer } from "./styles";
import styled from "styled-components";
import ButtonDark from "../../components/Buttons/ButtonDark";
import MembersProjectSummaryTable from "./MembersProjectSummaryTable";

const TabContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 40px;
`;

const HelloWorldContainer = styled.div`
  margin-top: 20px;
  font-size: 24px;
  color: #fff;
`;

const ProjectsPage = () => {
  const [projects, setProjects] = useState<ProjectTable[]>([])
  const [filteredData, setFilteredData] = useState<ProjectTable[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [totalCount, setTotalCount] = useState<number>(0);

  const [sortField, setSortField] = useState<string>("created_at");
  const [sortDirection, setSortDirection] = useState<"ASC" | "DESC">("DESC");
  const [activeTab, setActiveTab] = useState<"projects" | "members">("projects");

  const fetchProjects = async () => {
    try {
      setIsLoading(true);
      const response = await projectsEndpoint.getProjects({
        take: pageSize,
        skip: currentPage * pageSize,
        [`order[${sortField}]`]: sortDirection,
        ...(searchQuery && { "search[name]": searchQuery }),
      });
      setTotalCount(response.totalCount);
      const formattedProjects = response.items.map(project => ({
        id: project.id,
        Name: project.name,
        Status: project.status ?? '', 
        Members: project.totalMembersCount ?? 0
      }));
      setProjects(formattedProjects);
      setFilteredData(formattedProjects);
    } catch (error) {
      console.error("Erro ao buscar projetos:", error);
      setError("Não foi possível carregar os projetos");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [currentPage, pageSize, sortField, sortDirection, searchQuery]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const filterData = (data: ProjectTable[], query: string) => {
    if (!query) return data;
    return data.filter((item) =>
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  const handleSearch = (query: string): Promise<void> => {
    setSearchQuery(query);
    setCurrentPage(0);
    return Promise.resolve(); 
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(0); 
  };

  const handleSort = (field: string, direction: "ASC" | "DESC") => {
    const mappedField = {
      Name: "name",
      Members: "totalMembersCount",
      Status: "status",
    }[field] || field; // Traduz os nomes das colunas para os campos da API
    setSortField(mappedField);
    setSortDirection(direction);
    setCurrentPage(0); // Reseta para a primeira página ao ordenar
  };

  const updateProjectStatus = (projectId: string, newStatus: string) => {
    const updatedProjects = projects.map((project) =>
      project.id === projectId ? { ...project, Status: newStatus } : project
    );
    setProjects(updatedProjects);
    setFilteredData(searchQuery ? filterData(updatedProjects, searchQuery) : updatedProjects);
  };

  const handleSubmitProject = async (data: any) => {
    try {
      setIsLoading(true);
      await fetchProjects();
      closeModal();
    } catch (error) {
      console.error("Erro ao criar projeto:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const columnHelperProjects = createColumnHelper<ProjectTable>();

  const projectsColumns = [
    columnHelperProjects.accessor("Name", {
      header: () => "Nome",
      cell: (info) => info.getValue(),
      meta: { sortable: true },
    }),
    columnHelperProjects.accessor("Members", {
      header: () => "Número de Membros",
      cell: (info) => info.renderValue(),
      meta: { sortable: true },
    }),
    columnHelperProjects.accessor("Status", {
      header: () => "Status",
      cell: (info) => {
        const value = info.getValue();
        return (
          <>
            {value === "finalizado" ? (
              <>
                Encerrado <CiCircleCheck style={{ color: "#03F146", marginLeft: "8px", fontSize: "15px" }} />
              </>
            ) : value === "cancelado" ? (
              <>
                Cancelado <LuCircleSlash2 style={{ color: "#E44747", marginLeft: "8px", fontSize: "15px" }} />
              </>
            ) : value === "em_progresso" ? (
              <>
                Em Andamento <LuRefreshCcwDot style={{ color: "#B9ADFF", marginLeft: "8px", fontSize: "15px" }} />
              </>
            ) : value === "a_iniciar" ? (
              <>
                A Iniciar <GrRefresh style={{ color: "#C4E14D", marginLeft: "8px", fontSize: "15px", transform: "scaleX(-1) rotate(180deg)", }} />
              </>
            ) : (
              value
            )}
          </>
        );
      },
      meta: { sortable: true },
    }),
    columnHelperProjects.accessor("options", {
      header: () => "",
      cell: (info) => info.renderValue(),
    }),
  ];

  return (
    <PageContainer>
      <TabContainer>
        <ButtonDark
          light={activeTab === "projects"}
          onClick={() => setActiveTab("projects")}
        >
          Sumário de Projetos
        </ButtonDark>
        <ButtonDark
          light={activeTab === "members"} 
          onClick={() => setActiveTab("members")}
        >
          Sumário de Membros por Projeto
        </ButtonDark>
      </TabContainer>
      <SearchFilterRoot onSearch={handleSearch} data={projects} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}></SearchFilterRoot>
      {activeTab === "projects" ? (
        <>
          <TableContainer>
            <TableRoot
              columns={projectsColumns}
              data={filteredData as ProjectTable[]}
              totalCount={searchQuery ? filteredData.length : totalCount}
              currentPage={currentPage}
              pageSize={pageSize}
              onPageChange={handlePageChange}
              onPageSizeChange={handlePageSizeChange}
              isPaginationEnabled={true}
              onSort={handleSort}
              updateProjectStatus={updateProjectStatus}
            />
          </TableContainer>
          <ModalGeneral
            title="Adicionar Projeto"
            show={isModalOpen}
            onClose={closeModal}
            modalId="main-project-modal"
          >
            <AddProjectModal onClose={closeModal} onSubmit={handleSubmitProject} />
          </ModalGeneral>
        </>
      ) : (
        <MembersProjectSummaryTable/>
      )}
    </PageContainer>
  )
}

export default ProjectsPage