import styled from "styled-components";
import { device } from "../../../../../shared/configs/device.config";

export const AddArticleContainer = styled.div`
  display: grid;
  gap: 30px; 
  padding-top: 20px;
  grid-template-columns: repeat(1, 1fr);

  @media (max-width: 472px) {
    display: flex;
    flex-direction: column;
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;

  & > * {
    flex: 1;
  }
  
  @media (max-width: ${device.tablet}) {
    width: 10rem;

    &:nth-child(3) {
      grid-column: span 2; 
      width: 100%; 
    } 
  }

  @media (max-width: 472px) {
    width: 100%;
    flex-direction: column;
  }
`;

export const ErrorMessage = styled.span`
  color: ${({theme}) => theme.colors.alert_colors.errorModal};
  font-size: 10px;
  margin-left: 6px;
`;