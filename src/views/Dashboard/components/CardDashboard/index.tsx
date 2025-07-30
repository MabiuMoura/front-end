import { Container } from "./styles";

interface CardDashboardProps {
  children?: React.ReactNode;
}

const CardDashboard = ({
  children,
}: CardDashboardProps) => {
  return (
    <Container>
      {children}
    </Container>
  );
};

export default CardDashboard;
