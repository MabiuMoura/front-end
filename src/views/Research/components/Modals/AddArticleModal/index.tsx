import React, { useEffect, useRef, useState } from "react";
import { AddArticleContainer, InputWrapper } from "./styles";
import InputModalTable from "../../InputModalTable";
import { Article, Author, ResearchProfile, User } from "../../../../../shared/constants/interfaces";
import ButtonsModalsPerfil from "../../../../../components/Buttons/ButtonsModalsPerfil";
import SelectDate from "../../../../../components/Selects/SelectDate";
import PdfUploader from "../../../Areas/components/Modals/FileUploader/pdf";
import { toast } from "react-toastify";
import { research, researchProfile } from "../../../../../services/endpoints";
import { ThreeDot } from "react-loading-indicators";
import { z } from "zod";
import { addArticleSchema } from "../../../../../shared/constants/schemas";
import MultiSelectInput from "../../../../../components/Selects/MultiSelectInput";

interface AddArticleModalProps {
  onClose: () => void;
  addArticle: (article: Article, pdf: string, id?: string) => void;
  articles?: Article[];
  articleEdit?: Article;
}

const AddArticleModal: React.FC<AddArticleModalProps> = ({
  onClose,
  addArticle,
  articles,
  articleEdit,
}) => {
  const [step, setStep] = useState<number>(1);
  //const [pdf, setPdf] = useState<File | null | string>(null); // TIRA STRINF
  const [date, setDate] = useState<Date | null>(null);
  const [link, setLink] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [doi, setDoi] = useState<string>("");
  const [pdfUrl, setPdfeUrl] = useState<string | null>(null);
  const [loaing, setLoading] = useState(false);
  const [abstract, setAbstract] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const [authors, setAuthors] = useState< ResearchProfile[]>();  // todos research profiles disponiveis
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]); // os research profiles que foram escolhidos

  const [selectAuthorIsOpen, setSelectAuthorIsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const fetchArticle = async () => {
      if (articleEdit) {
        try {
          setLoading(true);
          if (articleEdit.pdf_mongo_id) {
            const blob = await research.getPDFArticle(articleEdit.id!);
            const pdf = URL.createObjectURL(blob);
            setPdfeUrl(pdf);
          }
          setDate(
            articleEdit.publicationYear
              ? new Date(articleEdit.publicationYear)
              : null
          );
          setLink(articleEdit.access_link);
          setTitle(articleEdit.title);
          setDoi(articleEdit.DOI);
          setAbstract(articleEdit.abstract!);

          console.log("Checagem do que tem antes : ", selectedAuthors);
          setSelectedAuthors(articleEdit.authors.map((author) => author.id)) ;
          console.log("autores que foram escolhidos ", articleEdit.authors);

        } catch (error) {
          toast.error(`Erro ao carregar dados: ${error}`);
        } finally {
          setLoading(false);
          console.log("Autores selecionadoooss : ",selectedAuthors)
        }
      }
    };
    fetchArticle();
  }, [articleEdit]);

  const handleConfirm = () => {
    try {
      const formattedDate = date ? date.toISOString().split("T")[0] : "";
      const year = date ? parseInt(formattedDate.split("-")[0], 10) : 0;
      const newArticle: Article = {
        title,
        publicationYear: year,
        DOI: doi,
        access_link: link,
        abstract,
        authors: selectedAuthors.map((id) => ({ id })) as ResearchProfile[], // Para Criar precisa apenas no ID, como é no postman, porem aqui no ts requer que seja Author
      };

      addArticleSchema.parse(newArticle);

      if (articleEdit) {
        console.log("artigo enviado : ",newArticle)
        addArticle(
          newArticle,
          articleEdit.id ? articleEdit.id : "",
          pdfUrl ? pdfUrl : ""
        );
      } else {
        addArticle(newArticle, pdfUrl ? pdfUrl : "");
      }

      onClose();
    } catch (error) {
      if (error instanceof z.ZodError) {
        setError(error.errors[0]?.message || "Erro de validação.");
        toast.error(error.errors[0].message);
      }
    }
  };

  // const handlePdfUpload = (file: File | null) => {
  //   if (file) {
  //     console.log("PDF carregado:", file.name);
  //     setPdf(file);
  //   } else {
  //     console.error("Nenhum PDF carregado.");
  //     setPdf(null);
  //   }
  // };

  const handlePdfUpload = (url: string | null) => {
    setPdfeUrl(url);
  };

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else {
      toast.error("Por favor, carregue um PDF antes de avançar.");
    }
  };

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        setLoading(true);
        const data = await researchProfile.getResearchProfiles({
          "relations[]": ["user", "papers", "research_areas", "research_databases"],
        });
        
        const users = data.items.map((item: any) => item).filter(Boolean);
        setAuthors(users);
      } catch (err: any) {
        console.error("Erro ao buscar perfis de pesquisa:", err);
        setError("Erro ao buscar perfis.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfiles();
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    console.log("CLICOU")
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      setSelectAuthorIsOpen(false);
    }
  };
  
  useEffect(() => {
    if (selectAuthorIsOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
  
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectAuthorIsOpen]);

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    }
  };
  if (loaing)
    return <ThreeDot color="#64748B" size="medium" text="" textColor="" />;
  return (
    <AddArticleContainer>
      {step === 1 && (
        <>
          <PdfUploader onFileUpload={handlePdfUpload} file={pdfUrl!} />
          <ButtonsModalsPerfil
            onCancel={onClose}
            onConfirm={handleNext}
            confirmText="Próximo"
            showBack={false}
          />
        </>
      )}

      {step === 2 && (
        <>
          <InputWrapper>
            <InputModalTable
              label="Título"
              placeHolder="Digite o título do artigo"
              type="text"
              value={title}
              onChange={(value) => {
                setTitle(value);
                setError(null);
              }}
              error={error && error.includes("Título") ? error : undefined}
            />
          </InputWrapper>

          <InputWrapper>
            <SelectDate
              label="Data"
              selectedDate={date}
              onDateChange={(value) => {
                setDate(value);
                setError(null); // Limpa o erro ao alterar o campo
              }}
              error={error && error.includes("Título") ? error : undefined}
            />
            <InputModalTable
              label="DOI"
              placeHolder="Digite o DOI"
              type="text"
              value={doi}
              onChange={(value) => {
                setDoi(value);
                setError(null);
              }}
              error={error && error.includes("DOI") ? error : undefined}
            />
          </InputWrapper>

          <InputWrapper>
            <InputModalTable
              label="Link de Acesso"
              placeHolder="Digite o link de acesso"
              type="text"
              value={link}
              onChange={(value) => {
                setLink(value);
                setError(null);
              }}
              error={error && error.includes("access_link") ? error : undefined}
            />
            <MultiSelectInput
              label = "Autores"
              placeholder = "Selecione os autores"
              options={authors?.map((author) => ({
                label: author.user.name,
                value: author.id 
              })) || []}
              selectedValues={selectedAuthors}
              isOpen={selectAuthorIsOpen}
              containerRef={containerRef}
              setIsOpen={setSelectAuthorIsOpen}
              onSelectionChange={setSelectedAuthors}
            />  
          </InputWrapper>

          <ButtonsModalsPerfil
            onCancel={onClose}
            onConfirm={handleConfirm}
            onBack={handleBack}
            confirmText="Confirmar"
            showBack={true}
          />
        </>
      )}
    </AddArticleContainer>
  );
};

export default AddArticleModal;
