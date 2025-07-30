import React, { ButtonHTMLAttributes } from "react";

import { useTheme } from "styled-components";
import { Button, ButtonsContainer } from "./styles";

interface ButtonsProjectModalProps extends ButtonHTMLAttributes<HTMLButtonElement>{
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

const ButtonsProjectModal: React.FC<ButtonsProjectModalProps> = ({
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

  const handleConfirm = (e: React.MouseEvent) => {
    e.preventDefault(); // Previne o comportamento padrão
    onConfirm();
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.preventDefault(); // Previne o comportamento padrão
    onCancel();
  };

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault(); // Previne o comportamento padrão
    onBack?.();
  };

  return (
    <ButtonsContainer>
      {showBack && (
        <Button
          type="button" // Explicita que não é um submit
          backGroundColor={backGroundColor}
          color={theme.colors.secondary_colors.neonBlue}
          onClick={handleBack}
        >
          VOLTAR
        </Button>
      )}

      <Button
        type="button" // Explicita que não é um submit
        backGroundColor={backGroundColor}
        color={theme.colors.secondary_colors.red}
        onClick={handleCancel}
        width={width}
      >
        {buttonOneTitle ?? "CANCELAR"}
      </Button>

      <Button
        type="button" // Explicita que não é um submit
        backGroundColor={backGroundColor}
        color={theme.colors.secondary_colors.green}
        onClick={handleConfirm}
        width={width}
      >
        {buttonSecondTitle ?? "CONFIRMAR"}
      </Button>
    </ButtonsContainer>
  );
};

export default ButtonsProjectModal;