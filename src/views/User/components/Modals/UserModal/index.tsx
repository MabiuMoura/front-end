import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ButtonsModalsPerfil from "../../../../../components/Buttons/ButtonsModalsPerfil";
import InputModal from "../../../../../components/Inputs/InputModals";
import SelectDate from "../../../../../components/Selects/SelectDate";
import Select from "../../../../../components/Selects/Select";
import { MyProfileFormValues } from "../../../../../shared/constants/interfaces";
import { myProfileSchema } from "../../../../../shared/constants/schemas";
import { users } from "../../../../../services/endpoints";
import * as S from "./styles";

interface EditUserProps {
  onClose: () => void;
  onProfileUpdate?: () => void;
  userId: string | undefined;
  initialData: {
    name: string;
    expertise: string | null | undefined; 
    memberSince: string | null | undefined;
  };
}

const EditUserModal: React.FC<EditUserProps> = ({
  onClose,
  onProfileUpdate,
  userId,
  initialData,
}) => {
  const initialFormValues = {
    name: initialData.name,
    especialist: initialData.expertise || "",
    memberSince: initialData.memberSince ? new Date(initialData.memberSince) : null,
  };

  const { handleSubmit, control, formState: { errors } } = useForm<MyProfileFormValues>({
    resolver: zodResolver(myProfileSchema),
    defaultValues: initialFormValues,
  });

  const [expertiseOptions, setExpertiseOptions] = useState<{ label: string; value: string }[]>([]);

  useEffect(() => {
    async function fetchExpertiseOptions() {
      try {
        const response = await users.getExpertiseOptions(); 
        const options = response.map((exp: string) => ({
          label: exp,
          value: exp,
        }));
        setExpertiseOptions(options);
      } catch (error) {
        console.error("Erro ao buscar especialidades:", error);
        toast.error("Erro ao carregar especialidades");
      }
    }
    fetchExpertiseOptions();
  }, []);

  const handleCancel = () => {
    onClose();
  };

  const getChangedValues = (formData: MyProfileFormValues) => {
    const changes: Partial<{
      name: string;
      expertise: string | null;
      memberSince: string | null;
    }> = {};

    if (formData.name !== initialFormValues.name) {
      changes.name = formData.name;
    }

    if (formData.especialist !== initialFormValues.especialist) {
      changes.expertise = formData.especialist || null;
    }

    const newMemberSince = formData.memberSince?.toISOString() || null;
    const oldMemberSince = initialFormValues.memberSince?.toISOString() || null;
    if (newMemberSince !== oldMemberSince) {
      changes.memberSince = newMemberSince;
    }

    return Object.keys(changes).length > 0 ? changes : null;
  };

  const onSubmit = async (data: MyProfileFormValues) => {
    try {
      const changedValues = getChangedValues(data);
      
      if (!changedValues || !userId) {
        onClose();
        return;
      }
  
      await users.updateUser(userId, changedValues);
      toast.success("Perfil modificado com sucesso!");
      onProfileUpdate?.();
      onClose();
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Erro ao modificar perfil");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); 
      handleSubmit(onSubmit)();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} onKeyDown={handleKeyDown}>
      <S.EditUserModalContainer>
        <S.InputWrapper>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <InputModal
                label="Nome Completo"
                {...field}
                error={errors.name?.message}
              />
            )}
          />

          <Controller
            name="especialist"
            control={control}
            render={({ field }) => (
              <Select
                label="Especialidade"
                placeholder="Selecione..."
                options={expertiseOptions.map(option => option.label)}
                value={field.value}
                onOptionSelect={(option) => field.onChange(option)}
                error={errors.especialist?.message}
              />
            )}
          />

          <Controller
            name="memberSince"
            control={control}
            render={({ field }) => (
              <SelectDate
                label="Membro desde?"
                selectedDate={field.value}
                onDateChange={field.onChange}
                error={errors.memberSince?.message}
              />
            )}
          />
        </S.InputWrapper>
        <ButtonsModalsPerfil onCancel={handleCancel} onConfirm={handleSubmit(onSubmit)} />
      </S.EditUserModalContainer>
    </form>
  );
};

export default EditUserModal;
