import { Outlet, useLocation } from "react-router-dom";
import CardResearch from "./components/Card/index";
import FooterResearch from "./components/Footer";
import { ResearchContainer, CardsContainer, FooterContainer } from "./styles";
import { useEffect, useState } from "react";
import { ResourceCounts } from "../../shared/constants/interfaces";
import { research } from "../../services/endpoints";

const ResearchPage = () => {
  const location = useLocation();

  const isResearchRoot = location.pathname === "/research";
  const [data, setData] = useState<{
    all: ResourceCounts[];
    cards: ResourceCounts[];
  }>({
    all: [],
    cards: [],
  });

  useEffect(() => {
    const fetchResourceCounts = async () => {
      try {
        const response = await research.getResourcesCount();
        const resourceData = [
          {
            number: response.areas ?? 0,
            name: "Áreas de pesquisa",
            description: "Linhas de pesquisa desenvolvidas no laboratório",
            route: "/areas",
          },
          {
            number: response.databases ?? 0,
            name: "Bases",
            description: "Dados usados para fundamento de pesquisa",
            route: "/bases",
          },
          {
            number: response.papers ?? 0,
            name: "Artigos",
            description:
              "Documentos acadêmicos que apresentam pesquisas, métodos utilizados e resultados",
            route: "/artigos",
          },
          {
            number: response.researchers ?? 0,
            name: "Pesquisadores",
            description: "Profissionais envolvidos nas áreas de pesquisa",
            route: "/researchers",
          },
        ];

        const filteredDataForCards = resourceData.filter(
          (item) => item.name !== "Pesquisadores"
        );

        setData({
          all: resourceData,
          cards: filteredDataForCards,
        });
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    };

    fetchResourceCounts();
  }, []);

  return (
    <ResearchContainer>
      {isResearchRoot ? (
        <>
          <CardsContainer>
            {data.cards.map((card, index) => (
              <CardResearch
                key={index}
                title={card.name}
                description={card.description}
                onClickTo={card.route}
              />
            ))}
          </CardsContainer>
          <FooterContainer>
            <FooterResearch data={data.all} />
          </FooterContainer>
        </>
      ) : (
        <Outlet />
      )}
    </ResearchContainer>
  );
};

export default ResearchPage;
