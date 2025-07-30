import React, { useState } from "react";

import { toast } from "react-toastify";
import styled from "styled-components";
import { projectsEndpoint } from "../../../../../services/endpoints";
import ButtonLight from "../../../../../components/Buttons/ButtonLight";
import Select from "../../../../../components/Selects/Select";
import { ProjectTable } from "../../../../../shared/constants/interfaces";
import ButtonsModalsPerfil from "../../../../../components/Buttons/ButtonsModalsPerfil";

const ModalContent = styled.div`
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`;

const statusLabels = {
  "a_iniciar": "A Iniciar",
  "em_progresso": "Em Andamento",
  "finalizado": "Encerrado",
  "cancelado": "Cancelado"
};

const labelToOption = Object.entries(statusLabels).reduce(
    (acc, [key, value]) => {
      acc[value] = key as keyof typeof statusLabels;
      return acc;
    },
    {} as Record<string, keyof typeof statusLabels>
  );

interface UpdateProjectStatusModalProps {
  project: ProjectTable;
  onClose: () => void;
  refreshData?: (newStatus?: string) => void;
}

const UpdateProjectStatusModal: React.FC<UpdateProjectStatusModalProps> = ({ 
  project, 
  onClose, 
  refreshData 
}) => {
  const [status, setStatus] = useState<string>(project?.Status || "");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleStatusChange = (selectedLabel: string) => {
    const selectedStatus = labelToOption[selectedLabel];
    setStatus(selectedStatus || ""); 
  };

  const handleSubmit = async () => {
    if (!status) {
      toast.error("Por favor, selecione um status");
      return;
    }

    try {
      setIsLoading(true);
      await projectsEndpoint.updateProject(project.id, {
        status: status
      });
      toast.success("Status do projeto atualizado com sucesso!");
      if (refreshData) refreshData(status);
      onClose();
    } catch (error) {
      console.error("Erro ao atualizar status do projeto:", error);
      toast.error("Não foi possível atualizar o status do projeto");
    } finally {
      setIsLoading(false);
    }
  };

  const displayOptions = Object.values(statusLabels);

  return (
    <ModalContent>
      <Select
        label=""
        options={displayOptions} 
        value={statusLabels[status as keyof typeof statusLabels] || ""} 
        onOptionSelect={handleStatusChange}
        placeholder="Selecione um status"
      />
    <ButtonContainer>
      <ButtonsModalsPerfil 
        onCancel={onClose} 
        onConfirm={handleSubmit}
        buttonOneTitle="Cancelar"
        buttonSecondTitle={isLoading ? "Atualizando..." : "Atualizar"}
        />
      </ButtonContainer>
    </ModalContent>
  );
};

export default UpdateProjectStatusModal;