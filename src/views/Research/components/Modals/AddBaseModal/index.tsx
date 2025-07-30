import { useEffect, useState } from "react";
import { AddArticleContainer, InputWrapper } from "./styles";
import InputModalTable from "../../InputModalTable";
import { Base } from "../../../../../shared/constants/interfaces";
import ButtonsModalsPerfil from "../../../../../components/Buttons/ButtonsModalsPerfil";
import { addBaseSchema } from "../../../../../shared/constants/schemas";
import { z } from "zod";

interface AddBaseModalProps {
  onClose: () => void;
  addBase: (base: Base) => void;
  baseEdit?: Base;
}

const AddBaseModal: React.FC<AddBaseModalProps> = ({
  onClose,
  addBase,
  baseEdit,
}) => {
  const [descricao, setDescricao] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (baseEdit) {
      setDescricao(baseEdit.description);
      setLink(baseEdit.access_link);
      setTitle(baseEdit.name);
    }
  }, [baseEdit]);

  const handleConfirm = () => {
    const formData = { title, description: descricao, link };

    try {
      addBaseSchema.parse(formData);

      const newBase: Base = {
        ...(baseEdit ? { id: baseEdit.id } : {}),
        name: title,
        description: descricao,
        access_link: link,
      };

      addBase(newBase);
      onClose();
    } catch (error) {
      if (error instanceof z.ZodError) {
        setError(error.errors[0]?.message || "Erro de validação.");
      }
    }
  };

  return (
    <AddArticleContainer>
      <InputWrapper>
        <InputModalTable
          label="Título"
          placeHolder="Digite o título "
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
        <InputModalTable
          label="Descrição"
          height="5rem"
          placeHolder="Digite a descrição"
          type="textarea"
          value={descricao}
          onChange={(value) => {
            setDescricao(value);
            setError(null);
          }}
          error={error && error.includes("Descrição") ? error : undefined}
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
          error={error && error.includes("Link") ? error : undefined}
        />
      </InputWrapper>
      <ButtonsModalsPerfil
        onCancel={onClose}
        onConfirm={handleConfirm}
        confirmText="Confirmar"
      />
    </AddArticleContainer>
  );
};

export default AddBaseModal;
