import { User } from "../../../../shared/constants/interfaces";
import {
  DescriptionMemberContainer,
  MemberCardBody,
  MemberCardContainer,
  DeleteIcon,
  Title,
  DescriptionHeader,
  DescriptionFooter,
  TextName,
  TextStack,
  MemberSince,
  MemberPhotoContainer,
  SeeMoreContent,
} from "./styles";
import { useState } from "react";
import { ProfilePicture } from "../../../../components/ProfilePictureUserId";
import { users } from "../../../../services/endpoints";
import { toast } from "react-toastify";
import ConfirmDeleteModal from "../ConfirmDeleteModal";
import { ModalGeneral } from "../../../../components/Modals/ModalGeneral";

interface MemberCardProps {
  Member: User;
  onMemberDeleted: () => void;
  handleShowMoreClick?: () => void;

}

export const MemberCard: React.FC<MemberCardProps> = ({
  Member,
  onMemberDeleted,
  handleShowMoreClick,
}) => {
  const [isConfirmModalOpen, setIsConfirmModalOpen] =
    useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const memberFirstName = Member.name.trim().split(" ")[0] || Member.name;

  const handleDeleteClick = () => {
    setIsConfirmModalOpen(true);
  };

  const handleVerMaisClick = () => {
    handleShowMoreClick?.();
    console.log("Ver Mais clicado para o membro:", Member.name);
  };

  const handleConfirmDelete = async () => {
    setIsConfirmModalOpen(false);
    setIsDeleting(true);
    try {
      await users.deleteUser(Member.id);
      toast.success("Membro apagado com sucesso!");
      onMemberDeleted();
    } catch (error: any) {
      console.error("Erro ao apagar membro:", error);
      toast.error("Erro ao apagar membro.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancelDelete = () => {
    setIsConfirmModalOpen(false);
  };

  return (
    <>
      <MemberCardContainer>
        <MemberPhotoContainer>
          <ProfilePicture userId={Member.id} name={Member.name} />
        </MemberPhotoContainer>
        <MemberCardBody>
          <Title>{memberFirstName}</Title>
          <DescriptionMemberContainer>
            <DescriptionHeader>
              <TextName>{Member.name}</TextName>
              {/* Renderiza a expertise somente se ela estiver cadastrada */}
              {Member.expertise && (
                <TextStack>#{Member.expertise}</TextStack>
              )}
              {/* Renderiza a data somente se ela estiver cadastrada */}
              {Member.memberSince && (
                <MemberSince>
                  Membro desde:{" "}
                  {new Date(Member.memberSince).toLocaleString("pt-BR", {
                    month: "long",
                    year: "numeric",
                  })}
                </MemberSince>
              )}
            </DescriptionHeader>
            <DescriptionFooter>
              <div onClick={handleVerMaisClick} style={{ cursor: "pointer" }}>
                <SeeMoreContent>Ver Mais</SeeMoreContent>
              </div>
              <DeleteIcon onClick={handleDeleteClick} />
            </DescriptionFooter>
          </DescriptionMemberContainer>
        </MemberCardBody>
      </MemberCardContainer>
      <ModalGeneral
        title="Confirmar Exclusão"
        show={isConfirmModalOpen}
        onClose={handleCancelDelete}
        width="22rem"
      >
        <ConfirmDeleteModal
          show={isConfirmModalOpen}
          onClose={handleCancelDelete}
          onConfirm={handleConfirmDelete}
          memberName={Member.name}
        />
      </ModalGeneral>
    </>
  );
};
