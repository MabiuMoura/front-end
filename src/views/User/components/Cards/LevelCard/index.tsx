import CardRoot from "../../../../../components/Card";
import { ProgressContainer, Progress, Emoji, DescriptionText } from "./styles";
import { ModalGeneral } from "../../../../../components/Modals/ModalGeneral";
import { useState } from "react";


const LevelCard: React.FC = () => {
  const [descriptionText] = useState<string>
  ("O nível de perfil indica o quão completo está o seu perfil. Para garantir acesso total às funcionalidades do sistema, você precisa preencher algumas informações importantes. Quanto mais completo o seu perfil, mais seções e recursos estarão disponíveis para você. Complete os dados do seu perfil para desbloquear todas as funcionalidades da plataforma.")
  ;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Estado para o modal

  const openEditModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
    <CardRoot title="Nível de Perfil" edit={false} question={true} openEditModal={openEditModal}>
      <ProgressContainer>
        <Progress />
        <Emoji>😁</Emoji>
      </ProgressContainer>
    </CardRoot>
    <ModalGeneral title="Nível de Perfil" show={isModalOpen} onClose={closeModal} explanation={true}>
      <DescriptionText>{descriptionText}</DescriptionText>
      </ModalGeneral>
  </>

  );
};

export default LevelCard;

