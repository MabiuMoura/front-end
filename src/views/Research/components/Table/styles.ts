import { MdArrowBackIosNew } from "react-icons/md";
import styled from "styled-components";
import { device } from "../../../../shared/configs/device.config";

export const PageContainer = styled.div`
  display: flex;
  gap: 40px;
  justify-items: center;
  align-items: flex-start;
  flex-direction: column;
  padding-top: 1%;
  height: 100%;
  width: 100%;
`;

export const BackPage = styled.span`
  font-weight: 700;
  font-size: large;
  display: flex;
  justify-items: center;
  align-items: center;
  padding: 0 1%;
`;

export const BackIcon = styled(MdArrowBackIosNew)`
  cursor: pointer;
  margin-right: 1%;
  @media (min-width: ${device.desktop}) {
    font-size: 19px;
  }

  @media (min-width: ${device.desktop_hd}) and (max-width: ${device.desktop}) {
    font-size: 19px;
  }

  @media (min-width: ${device.laptop}) and (max-width: ${device.desktop_hd}) {
    font-size: 17px;
  }

  @media (min-width: ${device.tablet}) and (max-width: ${device.laptop}) {
    font-size: 17px;
  }

  @media (min-width: ${device.mobile}) and (max-width: ${device.tablet}) {
    font-size: 17px;
    margin-right: 0.5%;
  }

  @media (min-width: ${device.mobileSmall}) and (max-width: ${device.mobile}) {
    font-size: 17px;
    margin-right: 0.5%;
  }

  @media (max-width: ${device.mobileSmall}) {
    font-size: 15px;
    margin-right: 0.5%;
  }
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 40px;
  padding: 0 3%;
`;

export const Name = styled.p<{ strong?: boolean }>`
  font-weight: ${({ strong }) => (strong ? "600" : "300")};
  margin-right: 3px;
  margin-left: 15px;
  font-size: 16px;
  @media (min-width: ${device.mobile}) and (max-width: ${device.tablet}) {
    font-weight: ${({ strong }) => (strong ? "500" : "300")};
  }
  @media (min-width: ${device.mobileSmall}) and (max-width: ${device.mobile}) {
    font-weight: ${({ strong }) => (strong ? "500" : "300")};
  }

  @media (max-width: ${device.mobileSmall}) {
  }
`;
export const FullScreenContainer = styled.div`
  height: 100vh; /* Ocupa toda a altura da tela */
  width: 80vw;
  justify-content: center; /* Centraliza horizontalmente */
  align-items: end; /* Centraliza verticalmente */
  flex-direction: column; /* Organiza os itens na vertical */
`;
