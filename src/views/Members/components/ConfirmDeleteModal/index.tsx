import ButtonsModalsPerfil from "../../../../components/Buttons/ButtonsModalsPerfil";
import * as S from "./styles";

interface ConfirmDeleteModalProps {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
  memberName: string;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({ show, onClose, onConfirm, memberName }) => {
  if (!show) return null;

  return (
      <S.DeleteMembersContainer>
        <S.Message>
          Tem certeza de que deseja remover o (a) membro (a) <strong>{memberName}</strong>?
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