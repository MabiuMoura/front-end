import styled from "styled-components";
import { device } from "../../../../../shared/configs/device.config";

export const AddAssetContainer = styled.form`
  display: grid;
  gap: 10px; 
  padding-top: 20px;
  width: 100%;

  @media (max-width: 472px) {
    display: flex;
    flex-direction: column;
  }
    @media (max-width: ${device.laptop}) {
      font-size:1.3rem;
    }

   @media (max-width: ${device.tablet}) {
      font-size:1rem;
    }

`

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

export const InputsContainer = styled.div`
    display: flex;
    flex-direction:row;
    gap: 25px;
    `;

export const InputColumn = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 50%;
`;