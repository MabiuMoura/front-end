import styled from "styled-components";
import { device } from "../../../shared/configs/device.config";

export const Button = styled.button<{
  danger?: boolean;
  active?: boolean;
  customColor?: string;
  light?: boolean;
}>`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  padding-left: 35px !important;
  padding-right: 35px !important;

  background-color: ${({ theme, danger, active, customColor, light }) =>
    light
    ? theme.colors.primary_colors.light 
    : active
    ? "#39404F" 
    : customColor
    ? customColor 
    : danger
    ? "#e84438"
    : theme.colors.background_colors.backgroundBlue};

  width: fit-content;
  height: fit-content;
  padding: 10px 16px;
  border-radius: 7px;
  cursor: pointer;
  font-family: ${({ theme }) => theme.fonts.inter};
  font-weight: ${({ light }) => (light ? 500 : 300)};
  font-size: 14px;
  color: ${({ theme, danger, light }) =>
    light
      ? theme.colors.primary_colors.blue 
      : danger
      ? "#ffffff"
      : "#9a9ea5"};
  border: ${({ danger }) => (danger ? "none" : "1px solid")};
  span {
    padding-right: 5px;
  }
  &:hover {
    background-color: ${(props) => props.color};
  }

  @media (max-width: ${device.tablet}) {
    font-size: 9px;
  }
`;
