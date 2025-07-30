import styled from "styled-components";
import { device } from "../../../../shared/configs/device.config";

export const RegisterMembersContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px; 
  padding-top: 20px;

  div:last-child {
    grid-column: span 2;
  }

  @media (max-width: 472px) {
     display: flex;
     flex-direction: column;
    }
`;

export const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap:20px;
    
    @media (max-width: ${device.tablet}) {
      width: 11rem;
    }

    @media (max-width: ${device.tablet}) {
      width: 10rem;
    }

    @media (max-width: 472px) {
      width: 100%;
    }

    
    `;

export const ErrorMessage = styled.span`
  color: ${({theme}) => theme.colors.alert_colors.errorModal};
  font-size: 10px;
  margin-left: 6px;
`; 