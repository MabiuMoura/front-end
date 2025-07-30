import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ButtonsModalsPerfil from "../../../../components/Buttons/ButtonsModalsPerfil";
import InputModal from "../../../../components/Inputs/InputModals";
import Select from "../../../../components/Selects/Select";
import SelectDate from "../../../../components/Selects/SelectDate";
import { users } from "../../../../services/endpoints";
import { RegisterMemberValues } from "../../../../shared/constants/defaultValues";
import { CreateMember } from "../../../../shared/constants/interfaces";
import { registerMemberSchema } from "../../../../shared/constants/schemas";
import * as S from "./styles";

interface RegisterMembersProps {
  onClose: () => void;
  onMemberAdded?: () => void;
}

const RegisterMembersModal: React.FC<RegisterMembersProps> = ({ onClose, onMemberAdded }) => {

  const { handleSubmit, control, formState: { errors } } = useForm<CreateMember>({
    resolver: zodResolver(registerMemberSchema),
    defaultValues: RegisterMemberValues,
  });

  const handleCancel = () => {
    console.log("Cancelar")
    onClose();
  }

  const onSubmit = async (data: CreateMember) => {
    try {
      let formattedBirthday: Date | null = null;
      
      if (data.birthday) {
        formattedBirthday = typeof data.birthday === 'string' 
          ? new Date(data.birthday)
          : data.birthday;
      }

      const formattedData: CreateMember = {
        ...data,
        birthday: formattedBirthday
      };
  
      await users.createUser(formattedData);
      toast.success("Membro criado com sucesso!");

      if (onMemberAdded) {
        onMemberAdded();
      }

      onClose();
    } catch (error: any) {
      console.error("Erro ao criar membro:", error);
    
      if (error?.response?.data?.message === "[RH] CPF already registered.") {
        toast.error("CPF já cadastrado. Por favor, verifique os dados e tente novamente.");
      } else {
        toast.error("Erro ao criar membro. Por favor, tente novamente.");
      }
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
      <S.RegisterMembersContainer>
        <S.InputWrapper>
          <Controller
            name="fullname"
            control={control}
            render={({ field }) => (
              <InputModal
                label="Nome Completo"
                {...field}
                error={errors.fullname?.message}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <InputModal
                label="E-mail"
                {...field}
                error={errors.email?.message}
              />
            )}
          />
          <Controller
            name="cpf"
            control={control}
            render={({ field }) => (
              <InputModal
                label="CPF"
                {...field}
                error={errors.cpf?.message}
                mask="cpf"
              />
            )}
          />
        </S.InputWrapper>
        <S.InputWrapper>
          <Controller
            name="birthday"
            control={control}
            render={({ field }) => (
              <SelectDate
                label="Data de Nascimento"
                selectedDate={field.value}
                onDateChange={field.onChange}
                error={errors.birthday?.message}
              />
            )}
          />
          <Controller
            name="confirm_email"
            control={control}
            render={({ field }) => (
              <InputModal
                label="Confirmar e-mail"
                {...field}
                error={errors.confirm_email?.message}
              />
            )}
          />
          <Controller
            name="is_admin"
            control={control}
            render={({ field }) => (
              <Select
                label="É um admin?"
                placeholder="Selecione"
                options={["Sim", "Não"]}
                value={field.value ? "Sim" : "Não"}
                onOptionSelect={(option) => field.onChange(option === "Sim")}
              />
            )}
          />
        </S.InputWrapper>
        <ButtonsModalsPerfil onCancel={handleCancel} onConfirm={handleSubmit(onSubmit)} />
      </S.RegisterMembersContainer>
    </form>
  );
};

export default RegisterMembersModal