import styled from "styled-components";
import { device } from "../../../shared/configs/device.config";
interface ButtonProps {
  backgroundColor?: string;
}

export const Button = styled.button<ButtonProps>`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  background-color: ${({ backgroundColor, theme }) =>
    backgroundColor || theme.colors.background_colors.backgroundBlue};
  width: fit-content;
  height: fit-content;
  padding: 7.5px 7.5px;
  border-radius: 7px;
  cursor: pointer;
  border: 0px;
  font-family: ${({ theme }) => theme.fonts.inter};
  font-weight: 300;
  font-size: 14px;
  color: #9a9ea5;
  border: 1px solid ${(props) => props.color};
  span {
    padding-right: 5px;
  }
  &:hover {
    background-color: ${(props) => props.color};
  }

  @media (min-width: ${device.tablet}) and (max-width: ${device.laptop}) {
    padding: 8.5px 8.5px;
  }

  @media (min-width: ${device.mobile}) and (max-width: ${device.tablet}) {
    padding: 6.5px 6.5px;
  }

  @media (min-width: ${device.mobileSmall}) and (max-width: ${device.mobile}) {
    padding: 7.5px 7.5px;
  }

  @media (max-width: ${device.mobileSmall}) {
    padding: 7.5px 7.5px;
  }
`;
