import { Container, EditContainer, IconEdit, IconQuestion } from "./styles";

interface CardRootProps {
  title: string;
  edit?: boolean;
  question?: boolean;
  children?: React.ReactNode;
  alingment?: string;
  openEditModal?: () => void;
}

const CardRoot = ({
  title,
  children,
  edit = true,
  question = false,
  alingment,
  openEditModal,
}: CardRootProps) => {
  return (
    <Container alignment={alingment}>
      <EditContainer>
        <span>{title}</span>
        {edit == true && question == false && (
          <IconEdit onClick={openEditModal} size={18} color="#64748B" />
        )}
        {question == true && edit == false && (
          <IconQuestion onClick={openEditModal} size={18} color="#64748B" />
        )}
      </EditContainer>
      {children}
    </Container>
  );
};

export default CardRoot;
