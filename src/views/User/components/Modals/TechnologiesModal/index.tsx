import { useState, useEffect } from "react";
import { useTheme } from "styled-components";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";

import SelectInput from "../../../../../components/Selects/SelectInput";
import StarRating from "../../../../../components/StarRating";
import ButtonsModalsPerfil from "../../../../../components/Buttons/ButtonsModalsPerfil";
import { Loader } from "../../../../../components/Loader";

import { stacks, users } from "../../../../../services/endpoints";
import { StackInterface } from "../../../../../shared/constants/interfaces";
import * as S from "./styles";
import { IconFetch } from "../../Cards/TechnologiesCard/IconFetch";

interface TechnologyData {
  name: string;
  rating: number;
  status: string;
  stackId?: string;
  iconId?: string;
  userStackId?: string;
}

interface TechnologiesModalProps {
  onClose: () => void;
  onSave: (technologies: TechnologyData[]) => void;
  existingTechnologies: TechnologyData[];
  userId?: string;
  onUpdate?: () => void;
}

const TechnologiesModal: React.FC<TechnologiesModalProps> = ({
  onClose,
  onSave,
  existingTechnologies,
  userId,
  onUpdate
}) => {
  const [selectedTechnologies, setSelectedTechnologies] = useState<
    TechnologyData[]
  >(existingTechnologies || []);
  const [ratings, setRatings] = useState<{ [key: string]: number }>({});
  const [statusStates, setStatusStates] = useState<{ [key: string]: string }>(
    {}
  );
  const [availableStacks, setAvailableStacks] = useState<StackInterface[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [technologiesToRemove, setTechnologiesToRemove] = useState<string[]>(
    []
  );
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);

  const [technologiesMarkedForRemoval, setTechnologiesMarkedForRemoval] = useState<string[]>([]);
  const theme = useTheme();

  const handleDropdownOpen = () => {
    setOpenDropdown((prev) => (!prev));
};

  useEffect(() => {
    const initialRatings: { [key: string]: number } = {};
    const initialStatus: { [key: string]: string } = {};

    existingTechnologies.forEach((tech) => {
      initialRatings[tech.name] = tech.rating;
      initialStatus[tech.name] = tech.status;
    });

    setSelectedTechnologies(existingTechnologies);
    setRatings(initialRatings);
    setStatusStates(initialStatus);
  }, [existingTechnologies]);

  useEffect(() => {
    const fetchStacks = async () => {
      try {
        const response = await stacks.findStacks();
        setAvailableStacks(response.data.items);
      } catch (error) {
        console.error("Erro ao buscar stacks:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStacks();
  }, []);

  const handleOptionSelect = (option: string) => {
    const selectedTechData = availableStacks.find(
      (tech) => tech.name === option
    );
    if (
      selectedTechData &&
      !selectedTechnologies.find((tech) => tech.name === option)
    ) {
      setSelectedTechnologies([
        ...selectedTechnologies,
        {
          name: option,
          rating: 1,
          status: "",
          stackId: selectedTechData.id,
          iconId: selectedTechData.icon,
        },
      ]);
    }
  };



  const handleRatingSelect = (technology: string, rating: number) => {
    setRatings({ ...ratings, [technology]: rating });
    setSelectedTechnologies(
      selectedTechnologies.map((tech) =>
        tech.name === technology ? { ...tech, rating } : tech
      )
    );
  };

  const handleStatusChange = (technology: string, value: string) => {
    setStatusStates({ ...statusStates, [technology]: value });
    setSelectedTechnologies(
      selectedTechnologies.map((tech) =>
        tech.name === technology ? { ...tech, status: value } : tech
      )
    );
  };

  const convertStatusToStackState = (status: string): string => {
    const statusMap: { [key: string]: string } = {
      Interesse: "interested",
      Estudando: "studying",
      Experiente: "experienced",
    };
    return statusMap[status] || "interested";
  };


  const handleRemoveTechnology = (userStackId: string | undefined, nameStack: string) => {

    if (!userStackId) {
      setSelectedTechnologies(
        selectedTechnologies.filter((tech) => tech.name !== nameStack)
      );
      return;
    }
    setTechnologiesMarkedForRemoval(prev => [...prev, userStackId]);
    setSelectedTechnologies(
      selectedTechnologies.filter((tech) => tech.name !== nameStack)
    );
    toast.info("Clique em confirmar para salvar as alterações");
  };


  const handleConfirm = async () => {
    const hasInvalidTechnology = selectedTechnologies.some(tech => !tech.status);

    if (hasInvalidTechnology) {
      toast.warning("Por favor, informe o status de todas as tecnologias");
      return;
    }

    try {
      setIsLoading(true);

      for (const userStackId of technologiesMarkedForRemoval) {
        await users.deleteUserStacks(userStackId);
      }

      if (userId != null) {
        const updatePayload = {
          update: selectedTechnologies.map((tech) => ({
            stackId: tech.stackId!,
            level: tech.rating,
            stackState: convertStatusToStackState(tech.status),
          })),
          remove: technologiesToRemove.map((stackId) => ({
            stackId,
          })),
        };
        await users.updateManyUserStacks(userId, updatePayload);
      }

      toast.success("Alterações salvas com sucesso");
      if (onUpdate) {
        onUpdate();
      }
      onSave(selectedTechnologies);
      onClose();
    } catch (error) {
      console.error("Erro ao atualizar tecnologias:", error);
      toast.error("Erro ao atualizar tecnologias");
    } finally {
      setIsLoading(false);
    }
  };

  const statuses = ["Interesse", "Estudando", "Experiente"];

  if (isLoading) {
    return (
      <S.Container>
        <Loader />
      </S.Container>
    );
  }

  return (
    <S.Container>
      <SelectInput
        isOpen={openDropdown}
        setIsOpen={handleDropdownOpen}
        label="Trabalho com"
        placeholder="Digite a Tecnologia"
        options={availableStacks.map((tech) => tech.name)}
        onOptionSelect={handleOptionSelect}
      />
      {selectedTechnologies.length > 0 && (
        <S.ContainerTechList>
          {selectedTechnologies.map((selectedTechnology, index) => (
            <S.ContainerTech key={index}>
              <S.DivWrapper>
                <IconFetch
                  stackId={selectedTechnology.iconId}
                  name={selectedTechnology.name}
                  style={{ width: 50, height: 50 }}
                />
                <h4 title={selectedTechnology.name}>
                  {selectedTechnology.name}
                </h4>
              </S.DivWrapper>
              <StarRating
                onRatingSelect={(rating) =>
                  handleRatingSelect(selectedTechnology.name, rating)
                }
                initialRating={selectedTechnology.rating}
              />
              <S.CheckboxContainer>
                {statuses.map((status, idx) => (
                  <label key={idx}>
                    <input
                      type="checkbox"
                      name={`status-${selectedTechnology.name}`}
                      value={status}
                      checked={statusStates[selectedTechnology.name] === status}
                      onChange={() =>
                        handleStatusChange(selectedTechnology.name, status)
                      }
                    />
                    {status}
                  </label>
                ))}
              </S.CheckboxContainer>
              <FaTrash
                cursor="pointer"
                color={theme.colors.primary_colors.lilac}
                onClick={() => handleRemoveTechnology(selectedTechnology?.userStackId, selectedTechnology.name)}
              />
            </S.ContainerTech>
          ))}
        </S.ContainerTechList>
      )}
      <ButtonsModalsPerfil onCancel={onClose} onConfirm={handleConfirm} />
    </S.Container>
  );
};

export default TechnologiesModal;
