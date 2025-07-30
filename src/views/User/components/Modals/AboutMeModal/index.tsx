import { useEffect, useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import ButtonsModalsPerfil from "../../../../../components/Buttons/ButtonsModalsPerfil";
import SocialMidia from "./SocialMidia";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as S from "./styles";
import { toast } from "react-toastify";
import { aboutMeSchema } from "../../../../../shared/constants/schemas";
import { AboutMeFormValues } from "../../../../../shared/constants/interfaces";
import { users } from "../../../../../services/endpoints";

interface AboutMeModalProps {
  onClose: () => void;
  userId: string | undefined;
  aboutMe: string | null | undefined;
  linkedIn: string | null | undefined;
  github: string | null | undefined;
  onProfileUpdate?: () => void;
}


const AboutMeModal: React.FC<AboutMeModalProps> = ({
  onClose,
  userId,
  aboutMe,
  linkedIn,
  github,
  onProfileUpdate
}) => {
  const [isScreenSmall, setIsScreenSmall] = useState(window.innerWidth <= 430);

  const { handleSubmit, control, formState: { errors } } = useForm<AboutMeFormValues>({
    resolver: zodResolver(aboutMeSchema),
    defaultValues: {
      aboutText: aboutMe || "",
      githubLink: github || "",  
      linkedinLink: linkedIn || "" 
    },
  });

  const handleResize = () => {
    setIsScreenSmall(window.innerWidth <= 430);
  };
  
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();
    
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>, onChange: (value: string) => void) => {
    onChange(e.target.value);
  };

  const onSubmit = async (data: AboutMeFormValues) => {
    try {
      const updateUserData = {
        about_me: data.aboutText,
        linkedIn: data.linkedinLink,
        github: data.githubLink
      }
      await users.updateUser(userId!, updateUserData);
      toast.success("Descrição atualizada com sucesso!")
      onProfileUpdate?.();
      onClose();
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Erro ao modificar Descrição");
    }
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <S.Container onSubmit={handleSubmit(onSubmit)}>
    <Controller
      name="aboutText"
      control={control}
      render={({ field }) => (
        <S.AreaContainer>
          <S.ContentContainer 
            {...field} 
            value={field.value} 
            onChange={(e) => handleChange(e, field.onChange)} 
          />
          <S.ErrorMessage>{errors.aboutText?.message}</S.ErrorMessage>
        </S.AreaContainer>
      )}
    />
      
    <Controller
      name="githubLink"
      control={control}
      render={({ field }) => (
        <SocialMidia
          value={field.value}
          onChange={field.onChange}
          error={errors.githubLink?.message}
        >
          <FaGithub size={25} color="white" />
          {!isScreenSmall && <span>Github</span>}
        </SocialMidia>
      )}
    />

    <Controller
      name="linkedinLink"
      control={control}
      render={({ field }) => (
        <SocialMidia
          value={field.value}
          onChange={field.onChange}
          error={errors.linkedinLink?.message}
        >
          <FaLinkedin size={25} color="white" />
          {!isScreenSmall && <span>Linkedin</span>}
        </SocialMidia>
      )}
    />
      <ButtonsModalsPerfil onCancel={handleCancel} onConfirm={handleSubmit(onSubmit)} />
    </S.Container>
  );
};

export default AboutMeModal;
