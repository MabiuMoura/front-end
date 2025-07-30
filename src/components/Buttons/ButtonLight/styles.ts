import styled from "styled-components";
import { device } from "../../../shared/configs/device.config";

export const Button = styled.button<{ size?: string; disabled?: boolean }>`
  background-color: ${({ theme, disabled }) =>
    disabled
      ? theme.colors.primary_colors.blue800
      : theme.colors.primary_colors.light};
  width: ${({ size }) => size || "fit-content"};
  height: fit-content;
  padding: 10px 16px;
  border-radius: 7px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  border: 0px;
  font-family: ${({ theme }) => theme.fonts.inter};
  font-weight: 500;
  font-size: 12px;
  color: ${({ theme, disabled }) =>
    disabled
      ? theme.colors.primary_colors.gray
      : theme.colors.primary_colors.blue};
  border: 1px solid ${(props) => props.color};

  span {
    padding-right: 5px;
  }

  &:hover {
    background-color: ${(props) =>
      props.disabled ? props.color : props.color};
  }

  @media (max-width: ${device.tablet}) {
    font-size: 9px;
  }
`;
