import { createColumnHelper } from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ModalGeneral } from "../../../../components/Modals/ModalGeneral";
import SearchFilterRoot from "../../../../components/SearchFilters/SearchFilterTables";
import TableRoot from "../../../../components/Table";
import {
  Article,
  Asset,
  Base,
  ProjectTable,
  UsersProjectSummary,
} from "../../../../shared/constants/interfaces";
import AddArticleModal from "../Modals/AddArticleModal";
import AddBaseModal from "../Modals/AddBaseModal";
import {
  BackIcon,
  BackPage,
  Container,
  FullScreenContainer,
  Name,
  PageContainer,
} from "./styles";
import { research } from "../../../../services/endpoints";
import { toast } from "react-toastify";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { RoutePath } from "../../../../shared/constants/enums";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { FaLink } from "react-icons/fa";
import Authors from "../Authors";

const Table: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isBasesRoute = location.pathname === RoutePath.BASES;
  const [articles, setArticles] = useState<Article[]>([]);
  const [bases, setBases] = useState<Base[]>([]);
  const [filteredData, setFilteredData] = useState<
    (Base | Article | ProjectTable | Asset | UsersProjectSummary)[]
  >(isBasesRoute ? bases : articles);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [sortField, setSortField] = useState<string>("created_at");
  const [sortDirection, setSortDirection] = useState<"ASC" | "DESC">("ASC")

  useEffect(() => {
    const fetchBases = async () => {
      try {
        const response = await research.getBases({
          take: pageSize,
          skip: currentPage * pageSize,
          [`order[${sortField}]`]: sortDirection,
          ...(searchQuery && { "search[name]": searchQuery }),
        });
        setBases(response.items);
        setFilteredData(response.items);
        setTotalCount(response.totalCount);
        
      } catch (error) {
        toast.error(`Erro ao carregar bases`);
      } finally {
        setIsLoading(false);
      }
    };

    const fetchArticles = async () => {
      try {
        const response = await research.getArticles({
          take: pageSize,
          skip: currentPage * pageSize,
          [`order[${sortField}]`]: sortDirection,
          ...(searchQuery && { "search[title]": searchQuery }),
        });
        const formattedArticles = response.items.map((article: Article) => ({
          ...article,
          created_at: format(new Date(article.created_at!), "dd/MM/yyyy", {
            locale: ptBR,
          }),
        }));
        setArticles(formattedArticles);
        setFilteredData(formattedArticles);
        setTotalCount(response.totalCount);
        console.log("response", response);
      } catch (error) {
        toast.error(`Erro ao carregar artigos`);
      } finally {
        setIsLoading(false);
      }
    };

    if (isBasesRoute) {
      fetchBases();
    } else {
      fetchArticles();
    }
  }, [isBasesRoute, currentPage, pageSize, sortField, sortDirection, searchQuery]);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const addArticle = async (newArticle: Article, pdfUrl: string) => {
    try {
      setIsLoading(true);
      const articleWithAbstract = {
        ...newArticle,
        abstract: newArticle.abstract || "vazio",
      };
      let responseArticle = await research.createArticle(articleWithAbstract);

      if (pdfUrl) {
        const fileToUpload = await fetch(pdfUrl)
          .then((res) => res.blob())
          .then((blob) => {
            const fileName = `document.${blob.type.split("/")[1]}`;
            return new File([blob], fileName, { type: blob.type });
          });
         const response = await research.uploadPdfPaper(
          responseArticle.id,
          fileToUpload
        );
        responseArticle = {
          ...responseArticle,
          pdf_mongo_id: response.mongo_id,
        };

      }

      const updatedArticles = [...articles, responseArticle];
      setArticles(updatedArticles);
      setFilteredData(updatedArticles);
      toast.success("Artigo adicionada com sucesso!");
    } catch (error) {
      toast.error(`Erro ao adicionar artigo: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const addBase = async (newBase: Base) => {
    try {
      setIsLoading(true);
      const response = await research.createBase(newBase);
      const updatedBases = [...bases, response];
      setBases(updatedBases);
      setFilteredData(updatedBases);
      toast.success("Base adicionada com sucesso!");
    } catch (error) {
      toast.error(`Erro ao adicionar base: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const ReturnPage = () => {
    navigate(-1);
  };

  const getTitle = () => {
    if (isBasesRoute) {
      return "Bases";
    } else if (location.pathname === "/research/artigos") {
      return "Artigos";
    }
    return "";
  };

  const columnHelperBases = createColumnHelper<Base>();
  const columnHelperArtigos = createColumnHelper<Article>();

  const basesColumns = [
    columnHelperBases.accessor("name", {
      header: () => "Nome",
      cell: (info) => info.getValue(),
      meta: { sortable: true }
    }),
    columnHelperBases.accessor("description", {
      header: () => "Descrição",
      cell: (info) => info.renderValue(),
      meta: { sortable: true }
    }),
    columnHelperBases.accessor("access_link", {
      header: () => "Link de Acesso",
      cell: (info) => {
        const link = info.getValue();
        return link ? (
          <a href={link} target="_blank" rel="noopener noreferrer">
            <FaLink color="White" />
          </a>
        ) : (
          "Sem link"
        );
      },
    }),
    columnHelperBases.accessor("options", {
      header: () => "",
      cell: (info) => info.renderValue(),
    }),
  ];

  const artigosColumns = [
    columnHelperArtigos.accessor("title", {
      header: () => "Título",
      cell: (info) => info.renderValue(),
      meta: { sortable: true }
    }),
    columnHelperArtigos.accessor("publicationYear", {
      header: () => "Ano de Publicação",
      cell: (info) => info.renderValue(),
      meta: { sortable: true }
    }),
    columnHelperArtigos.accessor("DOI", {
      header: () => "DOI",
      cell: (info) => info.renderValue(),
      meta: { sortable: true }
    }),

    columnHelperArtigos.accessor("access_link", {
      header: () => "Link de Acesso",
      cell: (info) => {
        const link = info.getValue();
        return link ? (
          <a href={link} target="_blank" rel="noopener noreferrer">
            <FaLink color="White"/>
          </a>
        ) : (
          "Sem link"
        );
      },
    }),
    columnHelperArtigos.accessor("authors", {
      header: () => "Autores",
      cell: (info) => {
        const authors = info.getValue();
        return  ( <Authors authors={authors} /> )
      },
    }),
    columnHelperArtigos.accessor("options", {
      header: () => "",
      cell: (info) => info.renderValue(),
    }),
  ];

  const handleSearch = (query: string): Promise<void> => {
    setSearchQuery(query);
    setCurrentPage(0);
    return Promise.resolve(); 
  };


  const handleSort = (field: string, direction: "ASC" | "DESC") => {
    setSortField(field); 
    setSortDirection(direction); 
    setCurrentPage(0); 
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(0);
  };

  return (
    <PageContainer>
      {isLoading ? (
        <FullScreenContainer>
          <Skeleton
            height={30}
            width={200}
            style={{ marginBottom: "20px" }}
            baseColor="#1d3557"
            highlightColor="#457b9d"
            enableAnimation={false} 
          />

          <Skeleton
            height={40}
            count={5}
            style={{ marginBottom: "3%", marginLeft: "5%", marginTop: "1%" }}
            baseColor="#1d3557"
            highlightColor="#457b9d"
            enableAnimation={false} 
          />
        </FullScreenContainer>
      ) : (
        <>
          <BackPage>
            <BackIcon onClick={ReturnPage} />
            <Name strong>{getTitle()}</Name>
          </BackPage>
          <Container>
            <SearchFilterRoot
              onSearch={handleSearch}
              data={isBasesRoute ? bases : articles}
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
            />
            <ModalGeneral
              title={isBasesRoute ? "Adicionar Base" : "Adicionar Artigo"}
              show={isModalOpen}
              onClose={closeModal}
              width="500px"
            >
              {isBasesRoute ? (
                <AddBaseModal onClose={closeModal} addBase={addBase} />
              ) : (
                <AddArticleModal
                  onClose={closeModal}
                  addArticle={addArticle}
                  articles={articles}
                />
              )}
            </ModalGeneral>

            {isBasesRoute ? (
              <TableRoot
                data={filteredData as Base[]}
                columns={basesColumns}
                setBases={setBases}
                setFilteredData={setFilteredData}
                totalCount={totalCount}
                currentPage={currentPage}
                pageSize={pageSize}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
                isPaginationEnabled={true} 
                onSort={handleSort}
              />
            ) : (
              <TableRoot
                data={filteredData as Article[]}
                columns={artigosColumns}
                setArticles={setArticles}
                setFilteredData={setFilteredData}
                totalCount={totalCount}
                currentPage={currentPage}
                pageSize={pageSize}
                onPageChange={handlePageChange}
                onPageSizeChange={handlePageSizeChange}
                isPaginationEnabled={true} 
                onSort={handleSort}
              />
            )}
          </Container>
        </>
      )}
    </PageContainer>
  );
};

export default Table;
