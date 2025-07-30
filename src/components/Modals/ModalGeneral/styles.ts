import styled from "styled-components";
import { device } from "../../../shared/configs/device.config";

export const StyledModalBody = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledModalOverlay = styled.div<{ zIndex?: number }>`
  position: fixed;
  top: 65px;
  right: 0;
  width: calc(100% - 88px);
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(2px);
  z-index: ${props => props.zIndex || null};

  @media (max-width: ${device.tablet}) {
    width: 100%;
  }
`;

export const StyledModalWrapper = styled.div``;

export const StyledModal = styled.div<{ width?: string, title?: string }>`
  position: relative;
  background: ${(props) => props.theme.colors.primary_colors.blue};
  width: ${(props) => props.width || '30rem'};
  border-radius: 0.3rem;
  border: 1px solid ${(props) => props.theme.colors.primary_colors.lilac};
  padding: 1rem;

  @media (max-width: ${device.tablet}) {
    width: calc(${(props) => props.width || '30rem'} * 0.85);
  }

  @media (max-width: ${(props) => (props.title === 'Tecnologias' ? '611px' : '472px')}) {
    padding: 1.5rem;
    width: calc(${(props) => props.width || '30rem'} * 0.55);
    max-height: 70vh;
    overflow-y: auto;
  }

  ${(props) =>
    props.title === 'Tecnologias' &&
    `@media (max-width: 398px) {
      padding: 1.5rem;
      width: calc(${props.width || '30rem'} * 0.35);
      max-height: 70vh;
      overflow-y: auto;
    }`}

  &::-webkit-scrollbar {
    width: 4px; 
  }

  &::-webkit-scrollbar-track {
    background: ${(props) => props.theme.colors.primary_colors.blue}; 
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.colors.primary_colors.blue200}; 
    border-radius: 10px; 
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: ${(props) => props.theme.colors.primary_colors.lilac}; 
  }
  
`;

export const StyledModalHeaderWithTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
  font-size: 1.5rem;
  font-family: ${(props) => props.theme.fonts.inter};
  color: ${({ theme }) => theme.colors.neutral_colors.white};
  font-weight: 700;
  padding-left: 1rem;
  padding-top: 1.5rem;
  gap: 10px;
  padding-bottom: 1rem;

  @media (max-width: ${(props) => (props.title === 'Tecnologias' ? '611px' : '472px')}) {
    font-size: 1.3rem;
    padding: 0 1.5rem;
  }

  ${(props) =>
    props.title === 'Tecnologias' &&
    `@media (max-width: 398px) {
      font-size: 1rem;
      padding: 0 1rem;
    }`}

`;

export const StyledModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0 1.5rem;
`;

export const StyledButtonClose = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
`;
