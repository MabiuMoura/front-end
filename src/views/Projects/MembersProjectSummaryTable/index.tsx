// MembersProjectSummaryTable.tsx
import { createColumnHelper } from "@tanstack/react-table";
import { useState, useEffect } from "react";
import { UsersProjectSummary } from "../../../shared/constants/interfaces";
import TableRoot from "../../../components/Table";
import { TableContainer } from "./styles";
import { projectsEndpoint } from "../../../services/endpoints";
import { ProfilePictureById } from "../../../components/ProfilePictureId";


const columnHelper = createColumnHelper<UsersProjectSummary>();

const columns = [
  columnHelper.accessor("user.name", {
    header: () => "Membro",
    cell: (info) => {
      const user = info.row.original.user; 
      return (
        <div style={{ display: "flex", alignItems: "center", gap: "20px", marginLeft: "10px" }}>
          <ProfilePictureById
            photoId={user.profile_picture_id}
            name={user.name}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
          <span>{user.name}</span>
        </div>
      );
    },
    meta: { sortable: false },
  }),
  columnHelper.accessor("projects", {
    header: () => "Projetos em Execução",
    cell: (info) => {
      const projects = info.getValue();
      if (!projects.length) return "-";
      return (
        <div>
          {projects.map((project, index) => (
            <div 
              key={index} 
              style={{ 
                marginTop: "10px",
                marginBottom: "10px"
              }}
            >
              {project.name}
            </div>
          ))}
        </div>
      );
    },
    meta: { sortable: false },
  }),
  columnHelper.accessor("projects", {
    header: () => "Data de Término",
    cell: (info) => {
      const projects = info.getValue();
      if (!projects.length) return "-";
      return (
        <div>
          {projects.map((project, index) => (
            <div 
              key={index}
              style={{ 
                marginTop: "10px",
                marginBottom: "10px"
              }}
            >
              {new Date(project.endDate).toLocaleDateString("pt-BR")}
            </div>
          ))}
        </div>
      );
    },
    meta: { sortable: false },
  }),
  columnHelper.accessor("totalGrantAmount", {
    header: () => "Total Mensal Recebido",
    cell: (info) => {
      const amount = info.getValue();
      return amount.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    },
    meta: { style: { minWidth: "250px" } },
  }),
];

const MembersProjectSummaryTable = () => {
  const [data, setData] = useState<UsersProjectSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await projectsEndpoint.getAllUsersProjectSummary();
        setData(response);
      } catch (err) {
        setError("Erro ao carregar os dados.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <TableContainer>
      <TableRoot columns={columns} data={data} />
    </TableContainer>
  );
};

export default MembersProjectSummaryTable;