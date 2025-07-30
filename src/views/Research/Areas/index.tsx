import { useEffect, useState } from "react";
import ButtonLight from "../../../components/Buttons/ButtonLight";
import BackPage from "./components/BackPage";
import CardAreas from "./components/CardAreas/index";
import { BasesPage, Column, DivAddArea, DivAreaContainer } from "./styles";
import { research } from "../../../services/endpoints";
import { CreateArea, Resources } from "../../../shared/constants/interfaces";
import { ModalGeneral } from "../../../components/Modals/ModalGeneral";
import CreateModal from "./components/Modals/CreateModal";
import { ButtonContainer } from "./components/Modals/CreateModal/styles";
import ButtonsModalsPerfil from "../../../components/Buttons/ButtonsModalsPerfil";
import { CreateAreaValues } from "../../../shared/constants/defaultValues";
import { toast } from "react-toastify";
import PdfUploader from "./components/Modals/FileUploader/pdf";
import ImageUploader from "./components/Modals/FileUploader/image";
import { ThreeDot } from "react-loading-indicators";
import defaultIcon from "../../../assets/search.svg";
import Skeleton from "react-loading-skeleton";

const Areas: React.FC = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [data, setData] = useState<Resources[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [pdfUrl, setPdfeUrl] = useState<string | null>(null);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [submitFn, setSubmitFn] = useState<() => void>(() => () => {});
  const [formData, setFormData] = useState<CreateArea>(CreateAreaValues);
  const [loading, setLoading] = useState<boolean>(false);
  const [edited, setEdited] = useState<boolean>(false);
  const [iconList, setIconList] = useState<string[]>([""]);

  const openCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const closeModal = () => {
    setIsCreateModalOpen(false);
    setFormData({} as CreateArea);
    setImageUrl("");
    setPdfeUrl("");
    setCurrentStep(1);
  };

  const nextStep = async () => {
    if (currentStep === 1) {
      submitFn();
      if (isFormValid) {
        setCurrentStep(2);
      }
    } else if (currentStep < 3) {
      setCurrentStep((prev) => prev + 1);
    } else {
      try {
        setLoading(true);
        const data = {
          name: formData.title,
          description: formData.description,
        };
        const response = await research.createArea(data);
        if (imageUrl) {
          const fileToUpload = await fetch(imageUrl)
            .then((res) => res.blob())
            .then((blob) => {
              const mimeType = blob.type;
              const fileName = `icon.${mimeType.split("/")[1]}`;
              return new File([blob], fileName, { type: mimeType });
            });
          const responseIcon = await research.uploadIcon(
            response.id,
            fileToUpload
          );
          console.log("Ícone enviado com sucesso", responseIcon);
        }

        if (pdfUrl) {
          const fileToUpload = await fetch(pdfUrl)
            .then((res) => res.blob())
            .then((blob) => {
              const fileName = `document.${blob.type.split("/")[1]}`; // Define o nome do arquivo como document.pdf
              return new File([blob], fileName, { type: blob.type }); // Cria um arquivo a partir do Blob
            });

          const responsePdf = await research.uploadPdf(
            response.id,
            fileToUpload
          );
          console.log("PDF enviado com sucesso", responsePdf);
        }
        console.log(response);
        toast.success("Área criada com sucesso!");
        setData((prevData) => [...prevData, response]);
      } catch (error) {
        toast.error(`Erro ao criar área: ${error}`);
      } finally {
        setLoading(false);
        console.log("Fluxo concluído!");
        closeModal();
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const handleValidationComplete = (submit: () => void, isValid: boolean) => {
    setIsFormValid(isValid);
    setSubmitFn(() => submit);
  };

  const handleSubmitData = (formData: CreateArea) => {
    setFormData(formData);
  };

  useEffect(() => {
    const fetchResource = async () => {
      try {
        const response = await research.getResources();
        const icons = await Promise.all(
          response.items.map(async (area: Resources) => {
            let blob;
            try {
              blob = await research.getIconStatic(area.icon);
            } catch (error) {
              console.warn(
                `Ícone ${area.icon} não encontrado, usando defaultIcon`
              );
              blob = null;
            }
            return blob ? URL.createObjectURL(blob) : defaultIcon;
          })
        );

        setIconList(icons);
        setData(response.items);
      } catch (error) {
        console.error("Erro ao buscar recursos:", error);
        //setIconList([defaultIcon]); // Se houver erro na requisição dos recursos, usa o defaultIcon
      }
      setEdited(false);
    };

    fetchResource();
  }, [loading, edited]);

  // useEffect(() => {
  //   const fetchIcon = async () => {
  //     try {
  //       console.log("Data recebida:", data);
  //       const icons = await Promise.all(
  //         data.map(async (area) => {
  //           console.log("Processando ícone de:", area.icon);
  //           const blob = await research.getIconStatic(area.icon);
  //           console.log("----", blob); // Se não aparecer, o erro está antes disso.
  //           return URL.createObjectURL(blob);
  //         })
  //       );

  //       setIconList(icons);
  //       console.log("@@@@@", icons);
  //     } catch (error) {
  //       console.error("Erro ao buscar ícones:", error);
  //       setIconList([defaultIcon]);
  //     }
  //   };

  //   fetchIcon();
  // }, [data]);

  const handleImageUpload = (url: string | null) => {
    setImageUrl(url);
  };

  const handlePdfUpload = (url: string | null) => {
    setPdfeUrl(url);
  };

  const handleDeleteArea = (editArea: string, iconArea: string) => {
    setData((prevData) => prevData.filter((area) => area.id !== editArea));
    setIconList((prevData) => prevData.filter((icon) => icon !== iconArea));
  };

  const handleUpdateArea = () => {
    setEdited(true);
  };

  const renderModalContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <CreateModal
            onValidationComplete={handleValidationComplete}
            onSubmitData={handleSubmitData}
            formData={formData}
          />
        );
      case 2:
        return <ImageUploader onFileUpload={handleImageUpload} />;
      case 3:
        return <PdfUploader onFileUpload={handlePdfUpload} />;
      default:
        return null;
    }
  };

  return (
    <BasesPage>
      <BackPage firstName="Áreas de Pesquisa"></BackPage>

      <DivAreaContainer>
        {edited
          ? data.map(() => (
              <Skeleton
                height={330}
                width={250}
                baseColor="#0f172a"
                highlightColor="#1E293B"
                enableAnimation={false}
              />
            ))
          : data.map((area, index) => (
              <CardAreas
                key={area.id}
                iconArea={iconList[index]}
                area={area}
                isOpen={openDropdown === area.id}
                setOpenDropdown={setOpenDropdown}
                onDelete={handleDeleteArea}
                onEdit={handleUpdateArea}
                formData={{ title: area.name, description: area.description }}
              />
            ))}
      </DivAreaContainer>

      <DivAddArea>
        <ButtonLight
          text="Adicionar Área de Pesquisa"
          plus={true}
          onClick={openCreateModal}
        />
      </DivAddArea>
      <ModalGeneral
        title={
          !loading ? "Adicionar Área de Pesquisa" : "Adicionando área, aguarde"
        }
        show={isCreateModalOpen}
        onClose={closeModal}
        width="40.5rem"
      >
        <Column>
          {loading ? (
            <ThreeDot color="#64748B" size="medium" text="" textColor="" />
          ) : (
            renderModalContent()
          )}
          {!loading ? (
            <ButtonContainer>
              <ButtonsModalsPerfil
                onCancel={currentStep == 1 ? closeModal : prevStep}
                onConfirm={nextStep}
                confirmText="Excluir"
                showBack={false}
                backGroundColor="transparent"
                buttonOneTitle={currentStep == 1 ? "CANCELAR" : "VOLTAR"}
                buttonSecondTitle={currentStep == 3 ? "CONCLUIR" : "PRÓXIMO"}
                width="18%"
              />
            </ButtonContainer>
          ) : null}
        </Column>
      </ModalGeneral>
    </BasesPage>
  );
};

export default Areas;
