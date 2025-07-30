import { useEffect, useState } from "react";
import ButtonDark from "../../../../../components/Buttons/ButtonDark";
import { CardColumn, Column, Row } from "./styles";
import DocumentCard from "./components/DocumentCard";
import { FiFileText } from "react-icons/fi";
import SearchFilterMembers from "../../../../../components/SearchFilters/SearchFilterMembers";
import { projectDocuments } from "../../../../../services/endpoints";
import { ProjectDocument } from "../../../../../shared/constants/interfaces";

type RequestsReceivedModalProps = {
  idprojectMembers: string;
  projectName: string;
};

const RequestsReceivedModal: React.FC<RequestsReceivedModalProps> = ({
  idprojectMembers,
  projectName,
}) => {
  const [activeTab, setActiveTab] = useState("Pendente");
  const [isModalFilterOpen, setIsModalFilterOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>("AZ");
  const [documents, setDocuments] = useState<ProjectDocument[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleRequestsReceived = (tab: string) => {
    setActiveTab(tab);
  };

  const handleDownload = () => {
    alert("Iniciando download...");
  };

  const handleSortChange = (order: string) => {
    setSelectedOption(order);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!idprojectMembers) {
        setError("ID do projeto não fornecido");
        return;
      }
      try {
        const data = await projectDocuments.get({
          "where[projectMember.id]": idprojectMembers,
        });

        if (data.items && data.items.length > 0) {
          setDocuments(data.items);
        } else {
          setError("Nenhum documento encontrado");
        }
      } catch {
        setError("Erro ao carregar documentos");
      }
    };

    fetchData();
  }, [idprojectMembers]);

  if (error || !idprojectMembers) return "Sem solicitações";

  // 👉 Separando por status
  const statusMap = {
    Pendente: "PENDING",
    "Em Revisão": "INREVIEW",
    Aprovado: "APPROVED",
    Recusado: "REFUSED",
  } as const;

  const filteredDocuments = documents.filter(
    (doc) => doc.status === statusMap[activeTab as keyof typeof statusMap]
  );

  return (
    <Column>
      <Row>
        {["Pendente", "Em Revisão", "Aprovado", "Recusado"].map((tab) => (
          <ButtonDark
            key={tab}
            onClick={() => handleRequestsReceived(tab)}
            danger={false}
            plus={false}
            active={activeTab === tab}
            customColor={"transparent"}
          >
            {tab}
          </ButtonDark>
        ))}

        <div>
          <SearchFilterMembers
            isModalOpen={isModalFilterOpen}
            setIsModalOpen={setIsModalFilterOpen}
            selectedOption={selectedOption}
            onSortChange={handleSortChange}
            backgroundColorButton="transparent"
          />
        </div>
      </Row>

      <div>
        <CardColumn>
          {filteredDocuments.length > 0 ? (
            filteredDocuments.map((doc, index) => (
              <DocumentCard
                key={doc.id || index}
                title={doc.name}
                label={projectName}
                description={doc.description}
                onDownload={handleDownload}
                icon={FiFileText}
              />
            ))
          ) : (
            <p>Nenhum documento encontrado para este status.</p>
          )}
        </CardColumn>
      </div>
    </Column>
  );
};

export default RequestsReceivedModal;
