import ButtonsModalsPerfil from "../../../../../../components/Buttons/ButtonsModalsPerfil";
import { ModalContent, Message, ButtonContainer } from "./styles";

interface DeleteModalProps {
  onConfirm: () => void;
  onCancel: () => void;
  area: { name: string; id: string };
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  onConfirm,
  onCancel,
  area,
}) => {
  return (
    <ModalContent>
      <Message>
        Você tem certeza que deseja excluir a área <strong>{area.name}</strong>?
        Esta ação não pode ser desfeita.
      </Message>
      <ButtonContainer>
        <ButtonsModalsPerfil
          onCancel={onCancel}
          onConfirm={onConfirm}
          confirmText="Excluir"
          showBack={false}
        />
      </ButtonContainer>
    </ModalContent>
  );
};

export default DeleteModal;
