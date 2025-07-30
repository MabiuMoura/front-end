import React, { ButtonHTMLAttributes } from "react";
import { ButtonsContainer, Button } from "./styles";
import { useTheme } from "styled-components";

interface ButtonsModalsPerfilProps extends ButtonHTMLAttributes<HTMLButtonElement>{
  onCancel: () => void;
  onConfirm: () => void;
  onBack?: () => void;
  confirmText?: string;
  showBack?: boolean;
  backGroundColor?: string;
  buttonOneTitle?: string;
  buttonSecondTitle?: string;
  width?: string;
}

const ButtonsModalsPerfil: React.FC<ButtonsModalsPerfilProps> = ({
  onCancel,
  onConfirm,
  onBack,
  showBack = false,
  backGroundColor,
  buttonOneTitle,
  buttonSecondTitle,
  width,
}) => {
  const theme = useTheme();

  return (
    <ButtonsContainer>
      {showBack && (
        <Button
          backGroundColor={backGroundColor}
          color={theme.colors.secondary_colors.neonBlue}
          onClick={onBack}
        >
          VOLTAR
        </Button>
      )}

      <Button
        backGroundColor={backGroundColor}
        color={theme.colors.secondary_colors.red}
        onClick={onCancel}
        width={width}
      >
        {buttonOneTitle ?? "CANCELAR"}
      </Button>

      <Button
        backGroundColor={backGroundColor}
        color={theme.colors.secondary_colors.green}
        onClick={onConfirm}
        width={width}
      >
        {buttonSecondTitle ?? "CONFIRMAR"}
      </Button>
    </ButtonsContainer>
  );
};

export default ButtonsModalsPerfil;
