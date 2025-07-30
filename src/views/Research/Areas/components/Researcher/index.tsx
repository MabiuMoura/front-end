import { ContainerResearcher, ResearcherIMG, ResearcherName } from "./styles";

interface props {
  researcherIMG?: string;
  researcherName?: string;
}

const Researcher: React.FC<props> = ({ researcherIMG, researcherName }) => {
  return (
    <ContainerResearcher>
      <ResearcherIMG imageUrl={researcherIMG}></ResearcherIMG>
      <ResearcherName>{researcherName?.toUpperCase()}</ResearcherName>
    </ContainerResearcher>
  );
};

export default Researcher;
