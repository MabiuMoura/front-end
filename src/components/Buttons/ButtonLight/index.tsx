import React, { ButtonHTMLAttributes } from "react";
import { Button } from "./styles";

interface ButtonLightProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  plus?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  size?: string;
}

const ButtonLight: React.FC<ButtonLightProps> = ({
  text,
  plus,
  onClick,
  size,
  disabled,
  ...props
}) => {
  return (
    <Button {...props} onClick={onClick} size={size} disabled={disabled}>
      {plus ? <span>+</span> : null}
      {text}
    </Button>
  );
};

export default ButtonLight;
