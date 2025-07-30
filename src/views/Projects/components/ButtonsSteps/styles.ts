import styled from "styled-components";
import { device } from "../../../../shared/configs/device.config";


export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: end;
  width: 100%;
  height: fit-content;
  gap: 16px;
  /* position: absolute;  
  bottom: 1rem;
  right: 2rem; */
`;

export const Button = styled.button<{
  color?: string;
  backGroundColor?: string;
  width?: string;
}>`
  background-color: ${({ theme, backGroundColor }) =>
    backGroundColor || theme.colors.background_colors.backgroundBlue};
  width: ${({ width }) => width || "fit-content"};
  height: fit-content;
  padding: 10px 16px;
  border-radius: 8px;
  cursor: pointer;
  border: 0px;
  font-family: ${({ theme }) => theme.fonts.inter};
  font-weight: bold;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.neutral_colors.white};
  border: 1px solid ${(props) => props.color};

  &:hover {
    background-color: ${(props) => props.color};
  }

  @media (max-width: ${device.tablet}) {
    font-size: 9px;
  }

  @media (max-width: 398px) {
    font-size: 6px;
  }
`;
