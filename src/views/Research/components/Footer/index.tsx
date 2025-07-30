import { ResourceCounts } from "../../../../shared/constants/interfaces";
import { Line, DatasContainer, Number, Name, Div } from "./styles";

interface FooterResearchProps {
  data: ResourceCounts[];
}
const FooterResearch: React.FC<FooterResearchProps> = ({ data }) => {
  return (
    <>
      <Line></Line>
      <DatasContainer>
        {data.map((card, index) => (
          <Div key={index}>
            <Number>{card.number}</Number>
            <Name>{card.name}</Name>
          </Div>
        ))}
      </DatasContainer>
    </>
  );
};

export default FooterResearch;
