import React, { useState } from "react";
import CardRoot from "../../../../../components/Card";
import { ModalGeneral } from "../../../../../components/Modals/ModalGeneral";
import {
  BackgroundWrapper,
  DescriptionText,
  InfoContainer,
  InsigniaItem,
  InsigniaList,
} from "./styles";
import { Insignia } from "../../../../../shared/constants/interfaces";
import { IconFetch } from "./IconFetch";
import EditInsigniaModal from "../AccessControlCard/Modals/EditInsigniaModal";
import { useAuthUser } from "../../../../../context/authContext";

interface InsigniaCardProps {
  insignias: Insignia[];
  edit?: boolean;
  question?: boolean;
  userId?: string;
}

const InsigniaCard: React.FC<InsigniaCardProps> = ({
  insignias: initialInsignias,
  edit = false,
  question = true,
  userId,
}) => {
  const { roles } = useAuthUser();

  const role = roles?.[0]?.name; //MOCK DA ROLE PARA TESTE

  const descriptionText =
    "As insígnias são títulos especiais que você pode conquistar como reconhecimento por suas conquistas e desempenho. Colecione essas insígnias e mostre suas conquistas!";

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [insignias, setInsignias] = useState<Insignia[]>(initialInsignias);

  const openEditModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleInsigniasUpdate = (updatedInsignias: Insignia[]) => {
    setInsignias(updatedInsignias);
  };

  return (
    <>
      <CardRoot
        edit={edit}
        question={question}
        title="Insígnias"
        openEditModal={openEditModal}
      >
        <InfoContainer>
          {insignias.length > 0 ? (
            <InsigniaList>
              {insignias.map((insignia) => (
                <InsigniaItem key={insignia.id} title={insignia.name}>
                  <BackgroundWrapper>
                    <IconFetch
                      iconId={insignia.icon}
                      name={insignia.name}
                      style={{
                        width: "40px",
                        height: "40px",
                        objectFit: "cover",
                        borderRadius: "50%",
                        zIndex: 2,
                        position: "relative",
                      }}
                    />
                  </BackgroundWrapper>
                </InsigniaItem>
              ))}
            </InsigniaList>
          ) : (
            <p
              style={{
                fontSize: "0.8em",
                color: "#64748b",
                textAlign: "left",
                marginTop: "-20px",
              }}
            >
              Nenhuma insígnia conquistada ainda.
            </p>
          )}
        </InfoContainer>
      </CardRoot>
      <ModalGeneral
        title="Insígnias"
        show={isModalOpen}
        onClose={closeModal}
        explanation={false}
      >
        {role == "RH_LAPISCO_ADMIN" ? (
          <EditInsigniaModal
            insignias={insignias}
            id={userId!}
            closeModal={closeModal}
            insigniasUpdate={handleInsigniasUpdate}
          />
        ) : (
          <DescriptionText>{descriptionText}</DescriptionText>
        )}
      </ModalGeneral>
    </>
  );
};

export default InsigniaCard;
