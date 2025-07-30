import {
  Card,
  CardBody,
  CardImage,
  Text,
  Span,
  Div,
  Void,
  Edit,
  EditIcon,
  ImgText,
  Line,
  Delete,
  DeleteIcon,
  DropDownWrapper,
} from "./styles";
import Dropdown from "../DropDown";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  CreateArea,
  Resources,
} from "../../../../../shared/constants/interfaces";
import { research } from "../../../../../services/endpoints";
import { ModalGeneral } from "../../../../../components/Modals/ModalGeneral";
import DeleteModal from "../Modals/DeleteModal";
import { OrbitProgress, ThreeDot } from "react-loading-indicators";
import { Column } from "../../styles";
import { ButtonContainer } from "../Modals/CreateModal/styles";
import ButtonsModalsPerfil from "../../../../../components/Buttons/ButtonsModalsPerfil";
import CreateModal from "../Modals/CreateModal";
import ImageUploader from "../Modals/FileUploader/image";
import PdfUploader from "../Modals/FileUploader/pdf";
import { toast } from "react-toastify";
import { CreateAreaValues } from "../../../../../shared/constants/defaultValues";
import defaultIcon from "../../../../../assets/search.svg";
import { getImageType } from "../../../../../shared/helpers/getFIleExtension";

interface CardAreasProps {
  area: Resources;
  isOpen: boolean;
  setOpenDropdown: (id: string | null) => void;
  onDelete: (deletedAreaId: string, iconArea: string) => void;
  onEdit: () => void;
  formData?: CreateArea;
  iconArea: string;
}

const CardAreas: React.FC<CardAreasProps> = ({
  area,
  isOpen,
  setOpenDropdown,
  onDelete,
  formData,
  onEdit,
  iconArea,
}) => {
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const [icon, setIcon] = useState<string>("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [pdfUrl, setPdfeUrl] = useState<string | null>(null);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [submitFn, setSubmitFn] = useState<() => void>(() => () => {});
  const [newformData, setNewformData] = useState<CreateArea>(CreateAreaValues);

  const handleDropdownClick = () => {
    setOpenDropdown(isOpen ? null : area.id);
  };

  useEffect(() => {
    const fetchIcon = async () => {
      try {
        //const blob = await research.getIconStatic(area.icon);
        //const response = URL.createObjectURL(blob);
        setIcon(iconArea);
      } catch (error) {
        //setIcon(defaultIcon);
      }
    };
    fetchIcon();
  }, [iconArea]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        if (isOpen) {
          setOpenDropdown(null);
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, setOpenDropdown]);

  const OnClickArea = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.preventDefault();
    console.log("Área antes de navegar:", area);
    navigate(`/research/areas/${area.id}`, {
      state: { area: area, icon: icon },
    });
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const openEditModal = () => {
    setIsEditModalOpen(true);
    setNewformData(formData!);
    console.log("@@@@@@@@@@@@@@@@", icon)
    setImageUrl(icon);
    setPdfeUrl(area.id);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setCurrentStep(1);
    setLoading(false);
  };

  const handleDelete = async () => {
    try {
      await research.removeArea(area.id);
      closeDeleteModal();
      onDelete(area.id, iconArea);
      toast.success("Área exlcuída com sucesso");
    } catch (error) {
      console.error("Erro ao excluir área:", error);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
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
          name: newformData!.title,
          description: newformData!.description,
        };
        const response = await research.updateArea(area.id, data);
        console.log("@@@@@@22", imageUrl, area.id, pdfUrl);
        if (imageUrl && imageUrl != defaultIcon && imageUrl != iconArea) {
          console.log(imageUrl, iconArea)
          const fileToUpload = await fetch(imageUrl)
            .then((res) => res.blob())
            .then((blob) => {
              const mimeType = getImageType(blob.type);
              const fileName = `icon.${mimeType}`;
              return new File([blob], fileName, { type: blob.type });
            });
            console.log("Imagem", fileToUpload)
          const responseIcon = await research.uploadIcon(area.id, fileToUpload);
          console.log("Ícone enviado com sucesso", responseIcon);
        }

        if (pdfUrl) {
          console.log("pdf", pdfUrl);
          const fileToUpload = await fetch(pdfUrl)
            .then((res) => res.blob())
            .then((blob) => {
              console.log(blob.type)
              const fileName = `document.${blob.type.split("/")[1]}`;
              return new File([blob], fileName, { type: blob.type });
            });

          const responsePdf = await research.uploadPdf(area.id, fileToUpload);
          console.log("PDF enviado com sucesso", responsePdf);
        }
        console.log(response);
        toast.success("Curso Editado com Sucesso");
        //setData((prevData) => [...prevData, response]);
        setLoading(false);
      } catch (error) {
        toast.error(`Erro ao editar o curso: ${error}`);
      }
      console.log("Fluxo concluído!");
      onEdit();
      closeEditModal();
    }
  };
  const handleValidationComplete = (submit: () => void, isValid: boolean) => {
    setIsFormValid(isValid);
    setSubmitFn(() => submit);
  };

  const handleSubmitData = (formDataNew: CreateArea) => {
    setNewformData(formDataNew);
  };
  const handleImageUpload = (url: string | null) => {
    setImageUrl(url);
  };

  const handlePdfUpload = (url: string | null) => {
    setPdfeUrl(url);
  };

  const renderModalContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <CreateModal
            onValidationComplete={handleValidationComplete}
            onSubmitData={handleSubmitData}
            formData={newformData}
          />
        );
      case 2:
        return (
          <ImageUploader
            onFileUpload={handleImageUpload}
            initialFile={imageUrl!}
          />
        );
      case 3:
        return (
          <PdfUploader onFileUpload={handlePdfUpload} initialFile={area.id} />
        );
      default:
        return null;
    }
  };
  return (
    <Card>
      {icon ? (
        <CardImage content={iconArea} />
      ) : (
        <OrbitProgress
          color="#D3D3D3"
          size="medium"
          text=""
          textColor=""
          style={{ width: "10px", height: "10px" }}
        />
      )}
      <CardBody onClick={OnClickArea}>
        <Text>{area.name}</Text>
        <Div>
          <Void></Void>
          <Span>Ver mais &gt;</Span>
          <Dropdown
            ref={dropdownRef}
            isOpen={isOpen}
            handleDropdownClick={handleDropdownClick}
          >
            <DropDownWrapper
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <Edit onClick={openEditModal}>
                <EditIcon />
                <ImgText>Editar</ImgText>
              </Edit>
              <Line />
              <ModalGeneral
                title="Editar Área"
                show={isEditModalOpen}
                onClose={closeEditModal}
                width="40.5rem"
              >
                <Column>
                  {loading ? (
                    <ThreeDot
                      color="#64748B"
                      size="medium"
                      text=""
                      textColor=""
                    />
                  ) : (
                    renderModalContent()
                  )}
                  {!loading ? (
                    <ButtonContainer>
                      <ButtonsModalsPerfil
                        onCancel={currentStep == 1 ? closeEditModal : prevStep}
                        onConfirm={nextStep}
                        confirmText="Excluir"
                        showBack={false}
                        backGroundColor="transparent"
                        buttonOneTitle={
                          currentStep == 1 ? "CANCELAR" : "VOLTAR"
                        }
                        buttonSecondTitle={
                          currentStep == 3 ? "CONCLUIR" : "PRÓXIMO"
                        }
                        width="18%"
                      />
                    </ButtonContainer>
                  ) : null}
                </Column>
              </ModalGeneral>
              <Delete onClick={openDeleteModal}>
                <DeleteIcon />
                <ImgText>Excluir</ImgText>
              </Delete>
            </DropDownWrapper>
          </Dropdown>
        </Div>
      </CardBody>
      <ModalGeneral
        title="Excluir Área"
        show={isDeleteModalOpen}
        onClose={closeDeleteModal}
        width="32.5rem"
      >
        <DeleteModal
          onConfirm={handleDelete}
          onCancel={closeDeleteModal}
          area={area}
        />
      </ModalGeneral>
    </Card>
  );
};

export default CardAreas;
