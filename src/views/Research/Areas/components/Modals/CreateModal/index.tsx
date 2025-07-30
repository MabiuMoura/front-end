import { Controller, useForm } from "react-hook-form";
import { Column, ModalContent } from "./styles";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateArea } from "../../../../../../shared/constants/interfaces";
import { createAreaSchema } from "../../../../../../shared/constants/schemas";
import InputModalCreate from "./inputModal";
import { useEffect } from "react";

interface CreateModalProps {
  onValidationComplete: (submitFn: () => void, isValid: boolean) => void;
  onSubmitData: (data: CreateArea) => void;
  formData: CreateArea;
}

const CreateModal: React.FC<CreateModalProps> = ({
  onValidationComplete,
  onSubmitData,
  formData,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<CreateArea>({
    resolver: zodResolver(createAreaSchema),
    defaultValues: {
      title: formData.title,
      description: formData.description,
    },
    mode: "onChange",
  });

  useEffect(() => {
    onValidationComplete(handleSubmit(onSubmit), isValid);
  }, [isValid]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  const onSubmit = (data: CreateArea) => {
    onSubmitData(data);
  };

  return (
    <ModalContent>
      <Column>
        <form onSubmit={handleSubmit(onSubmit)} onKeyDown={handleKeyDown}>
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <InputModalCreate
                label="Título"
                {...field}
                error={errors.title?.message}
                width="100%"
                height="2.5rem"
                marginBottom="20px"
              />
            )}
          />
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <InputModalCreate
                label="Descrição"
                {...field}
                error={errors.description?.message}
                width="100%"
                height="5rem"
              />
            )}
          />
        </form>
      </Column>
    </ModalContent>
  );
};

export default CreateModal;
