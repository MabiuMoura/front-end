import React from "react";
import { Button } from "./styles";

interface ButtonDarkProps {
  plus?: boolean;
  light?: boolean;
  danger?: boolean;
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  active?: boolean;
  customColor?: string;
}

const ButtonDark: React.FC<ButtonDarkProps> = ({
  plus,
  light,
  danger,
  onClick,
  children,
  disabled,
  active = false,
  customColor,
}) => {
  return (
    <Button
      onClick={() => onClick()}
      disabled={disabled}
      danger={danger}
      light={light}
      active={active}
      customColor={customColor}
    >
      {plus ? <span>+</span> : null}
      {children}
    </Button>
  );
};

export default ButtonDark;
