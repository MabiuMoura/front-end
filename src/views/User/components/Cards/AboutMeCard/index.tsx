import CardRoot from "../../../../../components/Card";
import { ModalGeneral } from "../../../../../components/Modals/ModalGeneral";
import AboutMeModal from "../../Modals/AboutMeModal";
import {
  AboutContainer,
  LinksContainer,
  LinkItem,
  GithubIcon,
  LinkedinIcon,
} from "./styles";
import { useState } from "react";

interface AboutMeCardProps {
  userId: string | undefined;
  aboutMe: string | null | undefined;
  linkedIn: string | null | undefined;
  github: string | null | undefined;
  onProfileUpdate?: () => void;
  edit?: boolean;
}

const AboutMeCard: React.FC<AboutMeCardProps> = ({
  aboutMe,
  linkedIn,
  github,
  userId,
  onProfileUpdate,
  edit,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openEditModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <CardRoot edit={edit} title="Sobre mim" openEditModal={openEditModal}>
        <AboutContainer>
          <p>{aboutMe ?? "Nenhuma informação adicionada"}</p>
          <LinksContainer>
            {github && (
              <LinkItem>
                <a href={github} target="_blank" rel="noopener noreferrer">
                  <GithubIcon />
                  {github}
                </a>
              </LinkItem>
            )}

            {linkedIn && (
              <LinkItem>
                <a href={linkedIn} target="_blank" rel="noopener noreferrer">
                  <LinkedinIcon />
                  {linkedIn}
                </a>
              </LinkItem>
            )}
          </LinksContainer>
        </AboutContainer>
      </CardRoot>
      <ModalGeneral title="Sobre Mim" show={isModalOpen} onClose={closeModal}>
        <AboutMeModal
          onProfileUpdate={onProfileUpdate}
          onClose={closeModal}
          userId={userId}
          aboutMe={aboutMe}
          github={github}
          linkedIn={linkedIn}
        />
      </ModalGeneral>
    </>
  );
};

export default AboutMeCard;
