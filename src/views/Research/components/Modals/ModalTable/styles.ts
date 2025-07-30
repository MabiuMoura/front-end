import styled from "styled-components";
import { device } from "../../../../../shared/configs/device.config";

export const StyledModalBody = styled.div` 
  padding: 1rem 1rem 0.5rem 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: ${device.tablet}) {
    padding: 0.6rem 0.6rem 0.3rem 0.6rem;
  }
`;

export const StyledModalOverlay = styled.div`
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
  z-index:1000;
  @media (max-width: ${device.tablet}) {
    width: 100%;
  }
`;

export const StyledModalWrapper = styled.div`
`;

export const StyledModal = styled.div<{ width?: string }>`
  position: relative;
  background: #1E293B;
  width: ${(props) => props.width || '30rem'};
  border-radius: 1rem;
  border: 2px solid #475569;
  padding: 1rem;

  @media (max-width: ${device.laptop}) {
    width: calc(${(props) => props.width || '30rem'} * 0.80);
  }

  @media (max-width: ${device.tablet}) {
    width: calc(${(props) => props.width || '30rem'} * 0.60);
  }

  @media (max-width: 472px) {
    padding: 1.5rem;
    width: calc(${(props) => props.width || '30rem'} * 0.50);
    max-height: 70vh; 
    overflow-y: auto;
  }

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
  justify-content: center;
  font-size: 1.8rem;
  letter-spacing:2px;
  font-family: ${(props) => props.theme.fonts.inter};
  color: ${({ theme }) => theme.colors.neutral_colors.white};
  font-weight: 700;
  padding-left: 1rem;
  padding-top: 2rem;
  gap: 10px;
  padding-bottom: 1rem;
  @media (max-width: ${device.tablet}) {
      font-size: 1.5rem;
    }
  @media screen and (max-width: 472px) {
    font-size: 1.2rem;
    padding: 0 1.5rem;
  }
`;

export const StyledModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 0 1.5rem;
`;