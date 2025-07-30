
import ButtonsModalsPerfil from "../../../../../components/Buttons/ButtonsModalsPerfil";
import * as S from "./styles";

interface ConfirmDeleteModalProps {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
  projectName: string;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({ show, onClose, onConfirm, projectName }) => {
  if (!show) return null;

  return (
      <S.DeleteMembersContainer>
        <S.Message>
          Tem certeza de que deseja excluir o projeto <strong>{projectName}</strong>?
        </S.Message>
        <ButtonsModalsPerfil 
        onCancel={onClose} 
        onConfirm={onConfirm}
        buttonOneTitle="Cancelar"
        buttonSecondTitle="Confirmar"
        />
      </S.DeleteMembersContainer>
  );
};

export default ConfirmDeleteModal