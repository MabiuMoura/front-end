import CardRoot from "../../../../../components/Card";
import {
  ResearchProfile,
  paper,
} from "../../../../../shared/constants/interfaces";
import * as S from "./styles";

interface ResearchesCardProps {
  research_profile: ResearchProfile | undefined;
  edit?: boolean;
}

const ResearchesCard: React.FC<ResearchesCardProps> = ({
  research_profile,
  edit,
}) => {
  const handleDivClick = (paper: paper) => {
    window.open(paper.access_link, "_blank", "noopener,noreferrer");
  };

  return (
    <CardRoot title="Pesquisas" edit={edit}>
      <S.CardContainer>
        {research_profile?.papers[0]
          ? research_profile?.papers.map((paper) => (
              <S.CardItem>
                <S.IconContainer isLink={false}>
                  <S.ArticleIcon />
                  (Artigo)
                </S.IconContainer>

                <S.TitleContainer>{paper.title}</S.TitleContainer>

                <S.IconContainer
                  onClick={() => handleDivClick(paper)}
                  isLink={true}
                >
                  <S.LinkIcon />
                  Link
                </S.IconContainer>
              </S.CardItem>
            ))
          : "Sem pesquisas relacionadas."}
      </S.CardContainer>
    </CardRoot>
  );
};

export default ResearchesCard;
