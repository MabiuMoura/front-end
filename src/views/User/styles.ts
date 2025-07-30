import styled from "styled-components";
import { device } from "../../shared/configs/device.config";

export const Container = styled.div`
  display: flex;
  gap: 20px;
  padding: 0px 45px;
  padding-top: 1%;
  
  @media (max-width: ${device.tablet}) {
    padding: 0px 0px;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 20px;
    width: 100%;
    flex-grow: 0.7;
  }

  @media (min-width: ${device.mobileSmall}) and (max-width: 500px) {
    padding: 0px 0px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-grow: 0.5;
  }

  
`;

export const FirstColumn = styled.div`
  flex: 0.3;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const SecondColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
