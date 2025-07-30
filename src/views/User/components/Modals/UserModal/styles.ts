import styled from "styled-components";
import { device } from "../../../../../shared/configs/device.config";

export const EditUserModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding-top: 20px;
`;

export const InputWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;

  & > div:first-child {
    grid-column: span 2;
  }

  @media (max-width: ${device.tablet}) {
    grid-template-columns: 1fr;
    
    & > div {
      width: 100%;
    }
  }

  @media (max-width: 472px) {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
`;

export const ErrorMessage = styled.span`
  color: ${({theme}) => theme.colors.alert_colors.errorModal};
  font-size: 10px;
  margin-left: 6px;
`;