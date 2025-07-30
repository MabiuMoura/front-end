import React, { useRef, useState } from "react";
import { FaCamera } from "react-icons/fa";
import CardRoot from "../../../../../components/Card";
import { ModalGeneral } from "../../../../../components/Modals/ModalGeneral";
import { users } from "../../../../../services/endpoints";
import EditUserModal from "../../Modals/UserModal";
import {
  MemberSinceContainer,
  PhotoOverlay,
  PhotoText,
  TagsContainer,
  TextMedium,
  TextSmall,
  UserPhotoContainer,
} from "./styles";

import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { ProfilePicture } from "../../../../../components/ProfilePictureUserId";
import { useProfilePicture } from "../../../../../context/profilePictureContext";

interface UserCardProps {
  userID?: string;
  name?: string;
  nickname?: string;
  memberSince?: string | null;
  expertise?: string | null;
  profilePictureId?: string | null;
  onPhotoChange?: (file: File) => void;
  onProfileUpdate?: () => void;
  edit?: boolean;
}

const UserCard: React.FC<UserCardProps> = ({
  userID,
  name = "User",
  nickname,
  memberSince,
  expertise,
  onProfileUpdate,
  edit,
}) => {
  const { triggerRefresh } = useProfilePicture();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formattedMemberSince = memberSince
    ? new Date(memberSince).toLocaleDateString("pt-BR", { timeZone: "UTC" })
    : null;

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file && userID) {
      try {
        setIsUploadingPhoto(true);
        const response = await users.profilePicturePost(userID, file);

        const userCookie = Cookies.get("user");
        if (userCookie) {
          const userData = JSON.parse(userCookie);
          userData.avatar = response.data.profile_picture_id;
          Cookies.set("user", JSON.stringify(userData));
        }

        if (onProfileUpdate) {
          onProfileUpdate();
        }
        toast.success("Foto de perfil modificada com sucesso!");
        triggerRefresh();
      } catch (error) {
        console.error("Erro ao fazer upload da foto:", error);
      } finally {
        setIsUploadingPhoto(false);
      }
    }
  };

  const openEditModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <CardRoot edit={edit} title="" openEditModal={openEditModal}>
        <UserPhotoContainer>
          <ProfilePicture userId={userID} name={name} />
          {edit != false ? (
            <PhotoOverlay
              onClick={handlePhotoClick}
              style={{ pointerEvents: isUploadingPhoto ? "none" : "auto" }}
            >
              <FaCamera size={24} />
              <PhotoText>
                {isUploadingPhoto ? "Enviando..." : "Mudar foto de perfil"}
              </PhotoText>
            </PhotoOverlay>
          ) : null}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            style={{ display: "none" }}
            disabled={isUploadingPhoto}
          />
        </UserPhotoContainer>
        <TagsContainer>
          <span style={{ color: "white", fontSize: 18 }}>{name}</span>
          <TextMedium>{nickname}</TextMedium>
          {expertise != null ? <TextSmall>#{expertise}</TextSmall> : null}
        </TagsContainer>
        {memberSince != null ? (
          <MemberSinceContainer>
            Membro desde {formattedMemberSince}
          </MemberSinceContainer>
        ) : null}
      </CardRoot>
      <ModalGeneral
        title="Meu Perfil"
        show={isModalOpen}
        onClose={closeModal}
        width="32.5rem"
      >
        <EditUserModal
          onClose={closeModal}
          onProfileUpdate={onProfileUpdate}
          userId={userID}
          initialData={{
            name: name,
            expertise: expertise,
            memberSince: memberSince,
          }}
        />
      </ModalGeneral>
    </>
  );
};

export default UserCard;
