import { toast } from "react-toastify";
import CardRoot from "../../../../../components/Card";
import { ModalGeneral } from "../../../../../components/Modals/ModalGeneral";
import { useAuthUser } from "../../../../../context/authContext";
import { acessControl } from "../../../../../services/endpoints";
import { EditAcessControlInterface } from "../../../../../shared/constants/interfaces";
import EditAcessControl from "./Modals/EditAcessControlModal";
import {
  AccessControlContainer,
  ControlItem,
  ControlText,
  ControlIcon,
  Separator,
  DescriptionText,
} from "./styles";
import { useState } from "react";
import { FaCircleCheck, FaCircleXmark } from "react-icons/fa6";

interface AccessControlProps {
  tag: string | null;
  facial: boolean;
  digital: boolean;
  edit?: boolean;
  question?: boolean;
  id?: string;
}

const AccessControlCard: React.FC<AccessControlProps> = ({
  tag,
  facial,
  digital,
  edit = false,
  question = true,
  id,
}) => {
  const [descriptionText] = useState<string>(
    "O controle de Acesso verifica se você possui uma tag cadastrada, se sua impressão digital está registrada e se o reconhecimento facial está habilitado."
  );
  const [currentFacial, setCurrentFacial] = useState<boolean>(facial);
  const [currentDigital, setCurrentDigital] = useState<boolean>(digital);
  const [currenteTag, setCurrenteTag] = useState<string | null>(tag);
  const [isModalOpenQuestion, setIsModalOpenQuestion] =
    useState<boolean>(false);
  const [isModalOpenEdit, setIsModalOpenEdit] = useState<boolean>(false);

  const openEditModalQuestion = () => {
    setIsModalOpenQuestion(true);
  };

  const openEditModalEdit = () => {
    setIsModalOpenEdit(true);
  };

  const closeModal = () => {
    setIsModalOpenQuestion(false);
    setIsModalOpenEdit(false);
  };

  const handleSubmit = async (data: EditAcessControlInterface) => {
    try {
      await acessControl.updateAcessControl(id, data);
      toast.success("Acesso atualizado com sucesso");

      setCurrentFacial(data.isFacialRegistered!);
      setCurrentDigital(data.isFingerprintRegistered!);
      setCurrenteTag(data.tagId!);
    } catch (error) {
      toast.error(`Erro ao atualizar o controle de acesso ${error}`);
    } finally {
      closeModal();
    }
  };

  return (
    <>
      <CardRoot
        edit={edit}
        question={question}
        title="Controle de Acesso"
        openEditModal={edit == true ? openEditModalEdit : openEditModalQuestion}
      >
        <AccessControlContainer>
          <ControlItem>
            <ControlText>Tag</ControlText>
            <ControlIcon>
              {currenteTag ? (
                <FaCircleCheck style={{ color: "#84CC16" }} />
              ) : (
                <FaCircleXmark style={{ color: "#EF4444" }} />
              )}
            </ControlIcon>
          </ControlItem>
          <Separator />
          <ControlItem>
            <ControlText>Facial</ControlText>
            <ControlIcon>
              {currentFacial ? (
                <FaCircleCheck style={{ color: "#84CC16" }} />
              ) : (
                <FaCircleXmark style={{ color: "#EF4444" }} />
              )}
            </ControlIcon>
          </ControlItem>
          <Separator />
          <ControlItem>
            <ControlText>Digital</ControlText>
            <ControlIcon>
              {currentDigital ? (
                <FaCircleCheck style={{ color: "#84CC16" }} />
              ) : (
                <FaCircleXmark style={{ color: "#EF4444" }} />
              )}
            </ControlIcon>
          </ControlItem>
        </AccessControlContainer>
      </CardRoot>

      <ModalGeneral
        title="Controle de Acesso"
        show={isModalOpenQuestion}
        onClose={closeModal}
        explanation={true}
      >
        <DescriptionText>{descriptionText}</DescriptionText>
      </ModalGeneral>

      <ModalGeneral
        title="Editar Controle de Acesso"
        show={isModalOpenEdit}
        onClose={closeModal}
      >
        <EditAcessControl
          onSubmitData={handleSubmit}
          onClose={closeModal}
          digital={currentDigital}
          facial={currentFacial}
          tagId={currenteTag}
        />
      </ModalGeneral>
    </>
  );
};

export default AccessControlCard;
