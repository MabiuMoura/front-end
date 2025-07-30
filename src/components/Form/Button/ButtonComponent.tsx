import { MouseEventHandler } from "react";
import styled from "styled-components";
import { device } from "../../../shared/configs/device.config";

interface ButtonProps {
  type?: "button" | "reset" | "submit" | undefined;
  children: any;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  isDisabled?: boolean;
  backgroundColor: string;
  color: string;
  borderColor?: string;
  id?: string;
  className?: string;
  maxHeight?: string;
}

export function ButtonComponent({
  type,
  onClick,
  isDisabled,
  backgroundColor,
  color,
  borderColor,
  children,
  maxHeight,
  ...props
}: ButtonProps) {
  return (
    <SButton
      type={type || "button"}
      onClick={onClick}
      disabled={isDisabled}
      color={color}
      {...props}
    >
      {children}
    </SButton>
  );
}

export const SButton = styled.button`
  width: 30rem;
  height: 3rem;
  background-color: ${(props) => props.theme.colors.primary_colors.gray50};
  color: ${(props) => props.theme.colors.secondary_colors.dark};
  font-family: ${(props) => props.theme.fonts.poppins};
  font-size: 16px;
  font-weight: 600;
  border-radius: 9px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: ${(props) => props.theme.colors.primary_colors.gray100};
  }

  @media (max-width: ${device.tablet}) {
    width: 60vw;
  }

  @media (max-width: 543px) {
    width: 53vw;
    height: 2rem;
    font-size: 12px;
  }

  @media (max-width:${device.mobileSmall}) {
    width: 12rem;
    height: 2rem;
    font-size: 10px;
  }

`;
