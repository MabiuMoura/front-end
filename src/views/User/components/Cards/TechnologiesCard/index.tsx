import { useEffect, useState } from "react";
import CardRoot from "../../../../../components/Card";
import { ModalGeneral } from "../../../../../components/Modals/ModalGeneral";
import TechnologiesModal from "../../Modals/TechnologiesModal";
import * as S from "./styles";
import { UserStacksInterface } from "../../../../../shared/constants/interfaces";
import { IconFetch } from "./IconFetch";

interface TechnologyData {
  name: string;
  rating: number;
  status: string;
  stackId?: string;
  iconId?: string;
  userStackId?: string;
}

interface TechnologiesCardProps {
  userId?: string;
  userStacks?: UserStacksInterface[];
  onUpdate?: () => void;
  edit?: boolean;
}

const TechnologiesCard: React.FC<TechnologiesCardProps> = ({
  userId,
  userStacks,
  onUpdate,
  edit,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [technologies, setTechnologies] = useState<TechnologyData[]>([]);

  useEffect(() => {
    if (userStacks) {
      const convertedTechnologies = userStacks.map((userStack) => ({
        name: userStack.stack.name,
        image: "",
        rating: userStack.level,
        stackId: userStack.stack.id,
        iconId: userStack.stack.icon,
        status: convertStackState(userStack.stackState),
        userStackId: userStack.id,
      }));
      setTechnologies(convertedTechnologies);
    }
  }, [userStacks]);

  const convertStackState = (stackState: string): string => {
    const stateMap: { [key: string]: string } = {
      interested: "Interesse",
      studying: "Estudando",
      experienced: "Experiente",
    };
    return stateMap[stackState] || "Interesse";
  };

  const openEditModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveTechnologies = (updatedTechnologies: TechnologyData[]) => {
    setTechnologies(updatedTechnologies);
    closeModal();
  };

  const filterTechnologiesByCheckbox = (checkboxValue: string) => {
    return technologies.filter((tech) => tech.status.includes(checkboxValue));
  };

  const renderTechnologyIcon = (tech: TechnologyData) => (
    <div key={tech.stackId} className="tech-icon-wrapper">
      <IconFetch
        stackId={tech.iconId}
        name={tech.name}
        style={{ width: "40px", height: "40px", objectFit: "contain" }}
      />
    </div>
  );

  return (
    <>
      <CardRoot title="Tecnologias" openEditModal={openEditModal} edit={edit} alingment={technologies.length > 0 ? "center" : "start"}>
        {technologies.length > 0 ? <S.TechGroup>
          <S.TechDiv>
            <h3>Tenho Interesse</h3>
            <S.TechImage>
              {filterTechnologiesByCheckbox("Interesse").map((tech) =>
                renderTechnologyIcon(tech)
              )}
            </S.TechImage>
          </S.TechDiv>

          <S.TechDiv>
            <h3>Estou Estudando</h3>
            <S.TechImage>
              {filterTechnologiesByCheckbox("Estudando").map((tech) =>
                renderTechnologyIcon(tech)
              )}
            </S.TechImage>
          </S.TechDiv>

          <S.TechDiv>
            <h3>Tenho Experiência</h3>
            <S.TechImage>
              {filterTechnologiesByCheckbox("Experiente").map((tech) =>
                renderTechnologyIcon(tech)
              )}
            </S.TechImage>
          </S.TechDiv>
        </S.TechGroup> : "Não possue tecnologias cadastradas"}
      </CardRoot>

      <ModalGeneral
        title="Tecnologias"
        show={isModalOpen}
        onClose={closeModal}
        width="44rem"
      >
        <TechnologiesModal
          onClose={closeModal}
          onSave={handleSaveTechnologies}
          existingTechnologies={technologies}
          userId={userId}
          onUpdate={onUpdate}
        />
      </ModalGeneral>
    </>
  );
};

export default TechnologiesCard;
